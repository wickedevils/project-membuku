import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CommunityCard } from './components/CommunityCard';
import { CommunityDetailModal } from './components/CommunityDetailModal';
import { RegisterCommunityModal } from './components/RegisterCommunityModal';
import { EventTeaserSection } from './components/EventTeaserSection';
import { ForumSection } from './components/ForumSection';
import { ReaderProfileExport } from './components/ReaderProfileExport';
import { ReadingWorkout } from './components/ReadingWorkout';
import { AdminMasterControl } from './components/AdminMasterControl';
import { UserRegisterModal } from './components/UserRegisterModal';
import { AuthRequiredModal } from './components/AuthRequiredModal';
import { Footer } from './components/Footer';

import { INITIAL_COMMUNITIES, MOCK_EVENTS } from './data/mockData';
import { Community, CommunityFilter, RegisterCommunityForm, EventItem, SiteThemeSettings, DEFAULT_THEME_SETTINGS, UserAccount, LocationType, BookGenre } from './types';
import { SlidersHorizontal, Layers, Sparkles, BookOpen, AlertCircle, ShieldAlert, MapPin, Search, BookMarked, Radio } from 'lucide-react';

const CITIES: (LocationType | 'Semua Kota')[] = [
  'Semua Kota',
  'Jakarta',
  'Bandung',
  'Yogyakarta',
  'Surabaya',
  'Medan',
  'Bali',
  'Malang',
  'Semarang',
  'Makassar',
  'Online (Seluruh Indonesia)'
];

const GENRES: (BookGenre | 'Semua Genre')[] = [
  'Semua Genre',
  'Fiksi & Novel',
  'Non-Fiksi & Essai',
  'Sastra & Klasik',
  'Self-Development & Psikologi',
  'Bisnis & Finansial',
  'Sci-Fi & Fantasi',
  'Puisi & Antologi',
  'Sejarah & Filsafat',
  'Biografi & Memoir',
  'Komik & Graphic Novel'
];

export default function App() {
  // Navigation & View Tabs ('home' = clean 4 bubbles main page)
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Current Logged-in User State (null = anonymous user)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isUserRegisterModalOpen, setIsUserRegisterModalOpen] = useState<boolean>(false);
  const [userAuthModalMode, setUserAuthModalMode] = useState<'register' | 'login'>('register');
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; actionName: string }>({
    isOpen: false,
    actionName: '',
  });

  const handleOpenUserAuthModal = (mode: 'register' | 'login' = 'register') => {
    setUserAuthModalMode(mode);
    setIsUserRegisterModalOpen(true);
  };

  const handleRequireAuth = (actionName: string) => {
    if (!currentUser) {
      setAuthModalState({ isOpen: true, actionName });
    }
  };

  // Site Theme & Visual Customizer State
  const [themeSettings, setThemeSettings] = useState<SiteThemeSettings>(() => {
    try {
      const saved = localStorage.getItem('membuku_theme_settings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse theme settings', e);
    }
    return DEFAULT_THEME_SETTINGS;
  });

  const handleUpdateThemeSettings = (newSettings: SiteThemeSettings) => {
    setThemeSettings(newSettings);
    localStorage.setItem('membuku_theme_settings', JSON.stringify(newSettings));
  };

  const handleResetThemeSettings = () => {
    setThemeSettings(DEFAULT_THEME_SETTINGS);
    localStorage.removeItem('membuku_theme_settings');
  };

  // Community Datasets
  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);
  const [pendingRegistrations, setPendingRegistrations] = useState<RegisterCommunityForm[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  
  // Registered Users list state (for ownership transfer & user accounts)
  const [registeredUsers, setRegisteredUsers] = useState<UserAccount[]>([
    {
      id: 'usr-1',
      name: 'Anindya Putri',
      email: 'anindya@bacadipark.id',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      city: 'Jakarta',
      favoriteGenre: 'Fiksi & Novel',
      isLoggedIn: false,
      createdAt: '10 Jan 2026',
    },
    {
      id: 'usr-2',
      name: 'Budi Santoso',
      email: 'budi.santoso@klabbacabdg.id',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      city: 'Bandung',
      favoriteGenre: 'Non-Fiksi & Essai',
      isLoggedIn: false,
      createdAt: '15 Jan 2026',
    },
    {
      id: 'usr-3',
      name: 'Maya Lestari',
      email: 'maya.lestari@sastraselatan.id',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      city: 'Yogyakarta',
      favoriteGenre: 'Sastra & Klasik',
      isLoggedIn: false,
      createdAt: '20 Jan 2026',
    },
  ]);

  // Manual Add Community from Master Admin
  const handleManualAddCommunity = (newComm: Community) => {
    setCommunities((prev) => [newComm, ...prev]);
  };

  // Manual Delete Community from Master Admin
  const handleManualDeleteCommunity = (communityId: string) => {
    setCommunities((prev) => prev.filter((comm) => comm.id !== communityId));
    if (selectedCommunity?.id === communityId) {
      setSelectedCommunity(null);
    }
  };

  // Transfer Ownership of Community to User
  const handleTransferOwnership = (
    communityId: string, 
    owner: { userId: string; userName: string; userEmail: string }
  ) => {
    setCommunities((prev) =>
      prev.map((comm) => {
        if (comm.id !== communityId) return comm;
        return {
          ...comm,
          ownerUserId: owner.userId,
          ownerUserName: owner.userName,
          ownerEmail: owner.userEmail,
          isClaimed: true,
          claimedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        };
      })
    );
  };

  // Modals state
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

  // Filters & Sorting state
  const [filter, setFilter] = useState<CommunityFilter>({
    query: '',
    city: '',
    genre: '',
    format: '',
    sortBy: 'featured',
  });

  const handleFilterChange = (updatedFilter: Partial<CommunityFilter>) => {
    setFilter((prev) => ({ ...prev, ...updatedFilter }));
  };

  const handleToggleBookmark = (communityId: string) => {
    if (bookmarkedIds.includes(communityId)) {
      setBookmarkedIds(bookmarkedIds.filter((id) => id !== communityId));
    } else {
      setBookmarkedIds([...bookmarkedIds, communityId]);
    }
  };

  // Submit New Community Form
  const handleSubmitNewCommunity = (formData: RegisterCommunityForm) => {
    setPendingRegistrations((prev) => [formData, ...prev]);
  };

  // Approve Pending Community from Master Admin Panel
  const handleApproveCommunity = (form: RegisterCommunityForm) => {
    const newComm: Community = {
      id: `comm-${Date.now()}`,
      name: form.name,
      slug: form.name.toLowerCase().replace(/\s+/g, '-'),
      tagline: form.tagline,
      description: form.description,
      city: form.city,
      district: form.district,
      format: form.format,
      genres: form.genres,
      memberCount: 1,
      establishedYear: new Date().getFullYear(),
      logoUrl: form.logoUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1000&auto=format&fit=crop&q=80',
      verified: true,
      featured: true,
      schedule: {
        dayFrequency: form.scheduleDay,
        time: form.scheduleTime || '15:00 - 17:00 WIB',
        locationName: form.locationName,
      },
      socials: {
        instagram: form.instagram,
        whatsappGroup: form.whatsapp,
      },
      leaders: [
        {
          name: form.contactPersonName,
          role: 'Inisiator Komunitas',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        }
      ],
      recentBooks: []
    };

    setCommunities((prev) => [newComm, ...prev]);
    setPendingRegistrations((prev) => prev.filter((item) => item !== form));
  };

  const handleRejectCommunity = (index: number) => {
    setPendingRegistrations((prev) => prev.filter((_, i) => i !== index));
  };

  // Filtered & Sorted Communities Computation
  const filteredCommunities = useMemo(() => {
    return communities.filter((comm) => {
      // Query Match
      if (filter.query.trim()) {
        const q = filter.query.toLowerCase();
        const matchesName = comm.name.toLowerCase().includes(q);
        const matchesTagline = comm.tagline.toLowerCase().includes(q);
        const matchesDesc = comm.description.toLowerCase().includes(q);
        const matchesCity = comm.city.toLowerCase().includes(q);
        const matchesGenre = comm.genres.some((g) => g.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesDesc && !matchesCity && !matchesGenre) {
          return false;
        }
      }

      // City Match
      if (filter.city && filter.city !== 'Semua Kota') {
        if (comm.city !== filter.city) return false;
      }

      // Genre Match
      if (filter.genre && filter.genre !== 'Semua Genre') {
        if (!comm.genres.includes(filter.genre as any)) return false;
      }

      // Format Match
      if (filter.format) {
        if (comm.format !== filter.format) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'members') {
        return b.memberCount - a.memberCount;
      }
      if (filter.sortBy === 'newest') {
        return b.establishedYear - a.establishedYear;
      }
      if (filter.sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      return a.name.localeCompare(b.name);
    });
  }, [communities, filter]);

  return (
    <div 
      className="min-h-screen font-sans selection:bg-[#5A5A40] selection:text-white transition-colors"
      style={{
        backgroundColor: themeSettings.backgroundColor,
        color: themeSettings.textColor,
        fontFamily: themeSettings.bodyFont,
      }}
    >
      
      {/* Top Navbar */}
      <Navbar
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        onOpenUserRegisterModal={(mode) => handleOpenUserAuthModal(mode || 'register')}
        onNavigateTab={(tab) => setActiveTab(tab)}
        activeTab={activeTab}
        isAdminMode={isAdminMode}
        onToggleAdminMode={() => setIsAdminMode(!isAdminMode)}
        themeSettings={themeSettings}
        currentUser={currentUser}
        onLogoutUser={() => setCurrentUser(null)}
      />

      {/* Main Content Render */}
      <main className="pb-16">
        
        {/* TAB 0: HOME MAIN PAGE (Clean Hero Header + 4 Feature Bubbles ONLY) */}
        {activeTab === 'home' && (
          <HeroSection
            themeSettings={themeSettings}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* TAB 1: DEDICATED DIREKTORI KOMUNITAS PAGE */}
        {activeTab === 'directory' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
            
            {/* Header & Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D241E]/10 pb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] flex items-center gap-3">
                  <BookOpen className="w-7 h-7 text-[#5A5A40]" />
                  Direktori Komunitas Baca ({filteredCommunities.length})
                </h1>
                <p className="text-sm text-[#2D241E]/70 mt-1">
                  Cari klub buku, silent reading party, dan ruang baca di seluruh Indonesia.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <SlidersHorizontal className="w-4 h-4 text-[#5A5A40]" />
                <span className="text-xs text-[#2D241E]/70 font-semibold">Urutkan:</span>
                <select
                  value={filter.sortBy}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                  className="bg-white border border-[#2D241E]/15 text-[#2D241E] rounded-full px-4 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#5A5A40] cursor-pointer shadow-2xs"
                >
                  <option value="featured">Unggulan & Terverifikasi</option>
                  <option value="members">Anggota Terbanyak</option>
                  <option value="newest">Tahun Berdiri (Terbaru)</option>
                  <option value="name">Nama (A - Z)</option>
                </select>
              </div>
            </div>

            {/* Dedicated Search & Filter Box */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#5A5A40]/15 shadow-sm space-y-4">
              <form 
                onSubmit={(e) => e.preventDefault()}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
              >
                {/* Keyword Search Input */}
                <div className="md:col-span-5 relative">
                  <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Kata Kunci / Nama Komunitas</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={filter.query}
                      onChange={(e) => handleFilterChange({ query: e.target.value })}
                      placeholder="Cari klub buku, silent reading, dll..."
                      className="w-full bg-[#FDFCF8] text-[#2D241E] placeholder:text-gray-400 pl-10 pr-4 py-2.5 rounded-xl border border-[#2D241E]/15 focus:outline-none focus:border-[#5A5A40] text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                {/* City Dropdown */}
                <div className="md:col-span-3 relative">
                  <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Kota / Lokasi</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A5A40] pointer-events-none" />
                    <select
                      value={filter.city}
                      onChange={(e) => handleFilterChange({ city: e.target.value })}
                      className="w-full bg-[#FDFCF8] text-[#2D241E] pl-10 pr-8 py-2.5 rounded-xl border border-[#2D241E]/15 focus:outline-none focus:border-[#5A5A40] text-sm font-medium appearance-none cursor-pointer transition-all"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c === 'Semua Kota' ? '' : c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Genre Dropdown */}
                <div className="md:col-span-4 relative">
                  <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Genre Utama</label>
                  <div className="relative">
                    <BookMarked className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A5A40] pointer-events-none" />
                    <select
                      value={filter.genre}
                      onChange={(e) => handleFilterChange({ genre: e.target.value })}
                      className="w-full bg-[#FDFCF8] text-[#2D241E] pl-10 pr-8 py-2.5 rounded-xl border border-[#2D241E]/15 focus:outline-none focus:border-[#5A5A40] text-sm font-medium appearance-none cursor-pointer transition-all"
                    >
                      {GENRES.map((g) => (
                        <option key={g} value={g === 'Semua Genre' ? '' : g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>

              {/* Format Selector Pills & Reset */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#2D241E]/10">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  <span className="text-xs font-semibold text-[#2D241E]/70 flex items-center gap-1 mr-1">
                    <Radio className="w-3.5 h-3.5 text-[#5A5A40]" />
                    Format:
                  </span>
                  {[
                    { label: 'Semua Format', value: '' },
                    { label: 'Offline', value: 'Offline' },
                    { label: 'Online', value: 'Online' },
                    { label: 'Hybrid', value: 'Hybrid' },
                  ].map((fmt) => (
                    <button
                      key={fmt.value}
                      onClick={() => handleFilterChange({ format: fmt.value })}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                        filter.format === fmt.value
                          ? 'bg-[#5A5A40] text-white font-bold shadow-xs'
                          : 'bg-[#F5F5F0] text-[#5A5A40] hover:bg-[#5A5A40]/10 border border-[#5A5A40]/15'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>

                {(filter.query || filter.city || filter.genre || filter.format) && (
                  <button
                    onClick={() => handleFilterChange({ query: '', city: '', genre: '', format: '' })}
                    className="text-xs text-[#5A5A40] hover:underline font-bold ml-auto"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>

            {/* Admin Banner alert if pending items exist */}
            {pendingRegistrations.length > 0 && (
              <div 
                onClick={() => setIsAdminMode(true)}
                className="bg-[#F5F5F0] border border-[#5A5A40]/30 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-[#5A5A40]/10 transition-all text-[#2D241E] shadow-2xs"
              >
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
                  <ShieldAlert className="w-5 h-5 text-[#5A5A40] shrink-0" />
                  <span>Ada {pendingRegistrations.length} pendaftaran komunitas baru menunggu verifikasi Master Admin!</span>
                </div>
                <span className="text-xs font-bold underline text-[#5A5A40]">Buka Panel Admin →</span>
              </div>
            )}

            {/* Master Admin Panel overlay if toggled */}
            {isAdminMode && (
              <AdminMasterControl
                pendingRegistrations={pendingRegistrations}
                onApproveCommunity={handleApproveCommunity}
                onRejectCommunity={handleRejectCommunity}
                approvedCommunities={communities}
                onManualAddCommunity={handleManualAddCommunity}
                onManualDeleteCommunity={handleManualDeleteCommunity}
                onTransferOwnership={handleTransferOwnership}
                themeSettings={themeSettings}
                onUpdateThemeSettings={handleUpdateThemeSettings}
                onResetThemeSettings={handleResetThemeSettings}
                registeredUsers={registeredUsers}
              />
            )}

            {/* Community Cards Grid */}
            {filteredCommunities.length === 0 ? (
              <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-[#2D241E]/10 shadow-2xs">
                <AlertCircle className="w-12 h-12 text-[#5A5A40]/60 mx-auto" />
                <h3 className="text-lg font-serif font-bold text-[#2D241E]">Tidak Ada Komunitas yang Cocok</h3>
                <p className="text-xs text-[#2D241E]/70 max-w-md mx-auto">
                  Coba sesuaikan kata kunci atau atur ulang filter pencarian untuk menemukan klub buku pilihanmu.
                </p>
                <button
                  onClick={() => handleFilterChange({ query: '', city: '', genre: '', format: '' })}
                  className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs rounded-full shadow-2xs"
                >
                  Reset Filter Pencarian
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    onSelect={(c) => setSelectedCommunity(c)}
                    onToggleBookmark={handleToggleBookmark}
                    isBookmarked={bookmarkedIds.includes(community.id)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: EVENT LITERASI */}
        {activeTab === 'events' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <EventTeaserSection 
              events={MOCK_EVENTS} 
              currentUser={currentUser}
              onRequireAuth={handleRequireAuth}
            />
          </div>
        )}

        {/* TAB 3: FORUM DISKUSI */}
        {activeTab === 'forum' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <ForumSection 
              currentUser={currentUser}
              onRequireAuth={handleRequireAuth}
            />
          </div>
        )}

        {/* TAB 4: TEMPLATE BACA (Current Read Card Generator) */}
        {activeTab === 'profile' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <ReaderProfileExport />
          </div>
        )}

        {/* TAB 5: READING WORKOUT (Strava Mode for Reading) */}
        {activeTab === 'workout' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <ReadingWorkout 
              currentUser={currentUser}
              onRequireAuth={handleRequireAuth}
            />
          </div>
        )}

      </main>

      {/* Community Detail Modal */}
      <CommunityDetailModal
        community={selectedCommunity}
        onClose={() => setSelectedCommunity(null)}
      />

      {/* Register New Community Form Modal */}
      <RegisterCommunityModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSubmitNewCommunity={handleSubmitNewCommunity}
      />

      {/* User Registration & Login Modal */}
      <UserRegisterModal
        isOpen={isUserRegisterModalOpen}
        initialMode={userAuthModalMode}
        onClose={() => setIsUserRegisterModalOpen(false)}
        onRegisterSuccess={(account) => {
          setCurrentUser(account);
          setRegisteredUsers((prev) => [account, ...prev]);
          setIsUserRegisterModalOpen(false);
        }}
      />

      {/* Auth Notification Gating Modal */}
      <AuthRequiredModal
        isOpen={authModalState.isOpen}
        onClose={() => setAuthModalState({ isOpen: false, actionName: '' })}
        onOpenRegisterModal={() => {
          setAuthModalState({ isOpen: false, actionName: '' });
          handleOpenUserAuthModal('register');
        }}
        actionName={authModalState.actionName}
      />

      {/* Footer */}
      <Footer themeSettings={themeSettings} />

    </div>

  );
}

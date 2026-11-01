import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Clock, 
  Building, 
  Palette, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  RotateCcw, 
  Save, 
  Megaphone, 
  Sparkles,
  Eye,
  Layers,
  PlusCircle,
  Trash2,
  UserCheck,
  Search,
  Filter,
  User,
  Mail,
  RefreshCw,
  ArrowRight,
  UserPlus,
  AlertTriangle,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { 
  Community, 
  RegisterCommunityForm, 
  SiteThemeSettings, 
  DEFAULT_THEME_SETTINGS, 
  UserAccount, 
  LocationType, 
  CommunityFormat, 
  BookGenre 
} from '../types';

interface AdminMasterControlProps {
  pendingRegistrations: RegisterCommunityForm[];
  onApproveCommunity: (form: RegisterCommunityForm) => void;
  onRejectCommunity: (index: number) => void;
  approvedCommunities: Community[];
  onManualAddCommunity: (community: Community) => void;
  onManualDeleteCommunity: (communityId: string) => void;
  onTransferOwnership: (communityId: string, owner: { userId: string; userName: string; userEmail: string }) => void;
  themeSettings: SiteThemeSettings;
  onUpdateThemeSettings: (newSettings: SiteThemeSettings) => void;
  onResetThemeSettings: () => void;
  registeredUsers?: UserAccount[];
}

const PRESET_THEMES = [
  {
    name: '🌿 Sage & Warm Cream (Default)',
    settings: {
      primaryColor: '#5A5A40',
      backgroundColor: '#FDFCF8',
      textColor: '#2D241E',
      accentColor: '#D97706',
      headingFont: 'Playfair Display',
      bodyFont: 'Plus Jakarta Sans',
    },
  },
  {
    name: '🍂 Terracotta & Vintage Paper',
    settings: {
      primaryColor: '#8B4513',
      backgroundColor: '#FAF6F0',
      textColor: '#2A1B12',
      accentColor: '#C85A17',
      headingFont: 'Playfair Display',
      bodyFont: 'Plus Jakarta Sans',
    },
  },
  {
    name: '☕ Midnight Espresso (Dark Mode)',
    settings: {
      primaryColor: '#C0A080',
      backgroundColor: '#1A1614',
      textColor: '#F0EAE1',
      accentColor: '#E5A93C',
      headingFont: 'Playfair Display',
      bodyFont: 'Plus Jakarta Sans',
    },
  },
  {
    name: '📜 Library Amber & Parchment',
    settings: {
      primaryColor: '#B45309',
      backgroundColor: '#FFFDF7',
      textColor: '#371B04',
      accentColor: '#10B981',
      headingFont: 'Merriweather',
      bodyFont: 'Plus Jakarta Sans',
    },
  },
  {
    name: '🌲 Nordic Forest & Snow',
    settings: {
      primaryColor: '#2F4F4F',
      backgroundColor: '#F8FAFC',
      textColor: '#1E293B',
      accentColor: '#0284C7',
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Inter',
    },
  },
];

const AVAILABLE_GENRES: BookGenre[] = [
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

const CITIES: LocationType[] = [
  'Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Medan', 
  'Bali', 'Malang', 'Semarang', 'Makassar', 'Online (Seluruh Indonesia)', 'Lainnya'
];

export const AdminMasterControl: React.FC<AdminMasterControlProps> = ({
  pendingRegistrations,
  onApproveCommunity,
  onRejectCommunity,
  approvedCommunities,
  onManualAddCommunity,
  onManualDeleteCommunity,
  onTransferOwnership,
  themeSettings,
  onUpdateThemeSettings,
  onResetThemeSettings,
  registeredUsers = [],
}) => {
  const [activeTab, setActiveTab] = useState<'management' | 'transfer' | 'verification' | 'customizer'>('management');
  const [formSettings, setFormSettings] = useState<SiteThemeSettings>(themeSettings);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Search & Filters for Admin Tables
  const [searchQuery, setSearchQuery] = useState('');
  const [transferFilter, setTransferFilter] = useState<'all' | 'claimed' | 'unclaimed'>('all');

  // Manual Add Modal State
  const [isManualAddOpen, setIsManualAddOpen] = useState(false);
  const [addName, setAddName] = useState('');
  const [addTagline, setAddTagline] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addCity, setAddCity] = useState<LocationType>('Jakarta');
  const [addFormat, setAddFormat] = useState<CommunityFormat>('Offline');
  const [addGenres, setAddGenres] = useState<BookGenre[]>(['Fiksi & Novel', 'Non-Fiksi & Essai']);
  const [addMemberCount, setAddMemberCount] = useState(150);
  const [addEstablishedYear, setAddEstablishedYear] = useState(2024);
  const [addScheduleDay, setAddScheduleDay] = useState('Sabtu Minggu ke-2 & ke-4');
  const [addScheduleTime, setAddScheduleTime] = useState('15:30 - 17:30 WIB');
  const [addLocationName, setAddLocationName] = useState('Taman Kota / Cafe Lokal');
  const [addInstagram, setAddInstagram] = useState('');
  const [addWhatsapp, setAddWhatsapp] = useState('');
  const [addLogoUrl, setAddLogoUrl] = useState('');
  const [addBannerUrl, setAddBannerUrl] = useState('');
  const [addVerified, setAddVerified] = useState(true);
  const [addFeatured, setAddFeatured] = useState(false);
  const [addAssignUserId, setAddAssignUserId] = useState('');

  // Delete Confirm Modal
  const [communityToDelete, setCommunityToDelete] = useState<Community | null>(null);

  // Transfer Ownership Modal State
  const [communityToTransfer, setCommunityToTransfer] = useState<Community | null>(null);
  const [selectedUserIdForTransfer, setSelectedUserIdForTransfer] = useState<string>('');
  const [customUserName, setCustomUserName] = useState('');
  const [customUserEmail, setCustomUserEmail] = useState('');

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleToggleAddGenre = (genre: BookGenre) => {
    if (addGenres.includes(genre)) {
      setAddGenres(addGenres.filter((g) => g !== genre));
    } else {
      setAddGenres([...addGenres, genre]);
    }
  };

  const handleSubmitManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) return;

    let assignedOwner: { id?: string; name?: string; email?: string } = {};
    if (addAssignUserId) {
      const foundUser = registeredUsers.find((u) => u.id === addAssignUserId);
      if (foundUser) {
        assignedOwner = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        };
      }
    }

    const newCommunity: Community = {
      id: `comm-manual-${Date.now()}`,
      name: addName.trim(),
      slug: addName.trim().toLowerCase().replace(/\s+/g, '-'),
      tagline: addTagline.trim() || 'Komunitas membaca dan ruang diskusi literasi',
      description: addDescription.trim() || 'Komunitas ini dikurasi secara resmi oleh tim platform Membuku.',
      city: addCity,
      format: addFormat,
      genres: addGenres.length > 0 ? addGenres : ['Fiksi & Novel'],
      memberCount: Number(addMemberCount) || 100,
      establishedYear: Number(addEstablishedYear) || 2024,
      logoUrl: addLogoUrl.trim() || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80',
      bannerUrl: addBannerUrl.trim() || 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1000&auto=format&fit=crop&q=80',
      verified: addVerified,
      featured: addFeatured,
      schedule: {
        dayFrequency: addScheduleDay || 'Sabtu berkala',
        time: addScheduleTime || '15:00 - 17:00 WIB',
        locationName: addLocationName || 'Lokasi Kumpul Publik',
      },
      socials: {
        instagram: addInstagram.replace('@', '').trim(),
        whatsappGroup: addWhatsapp.trim(),
      },
      leaders: [
        {
          name: assignedOwner.name || 'Admin Komunitas',
          role: 'Pengurus Komunitas',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        }
      ],
      recentBooks: [],
      ownerUserId: assignedOwner.id,
      ownerUserName: assignedOwner.name,
      ownerEmail: assignedOwner.email,
      isClaimed: Boolean(assignedOwner.id),
      claimedAt: assignedOwner.id ? new Date().toLocaleDateString('id-ID') : undefined,
    };

    onManualAddCommunity(newCommunity);
    setIsManualAddOpen(false);
    
    // Reset Form
    setAddName('');
    setAddTagline('');
    setAddDescription('');
    setAddInstagram('');
    setAddWhatsapp('');

    triggerNotice(`✅ Komunitas "${newCommunity.name}" berhasil ditambahkan secara manual ke direktori aktif!`);
  };

  const handleConfirmDelete = () => {
    if (!communityToDelete) return;
    onManualDeleteCommunity(communityToDelete.id);
    triggerNotice(`🗑️ Komunitas "${communityToDelete.name}" telah dihapus secara permanen.`);
    setCommunityToDelete(null);
  };

  const handleConfirmTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!communityToTransfer) return;

    let targetUserId = '';
    let targetUserName = '';
    let targetUserEmail = '';

    if (selectedUserIdForTransfer) {
      const user = registeredUsers.find((u) => u.id === selectedUserIdForTransfer);
      if (user) {
        targetUserId = user.id;
        targetUserName = user.name;
        targetUserEmail = user.email;
      }
    } else if (customUserName && customUserEmail) {
      targetUserId = `usr-external-${Date.now()}`;
      targetUserName = customUserName.trim();
      targetUserEmail = customUserEmail.trim();
    } else {
      alert('Pilih akun user terdaftar atau isi nama dan email owner baru!');
      return;
    }

    onTransferOwnership(communityToTransfer.id, {
      userId: targetUserId,
      userName: targetUserName,
      userEmail: targetUserEmail,
    });

    triggerNotice(`🎉 Hak akses ownership "${communityToTransfer.name}" berhasil ditransfer ke ${targetUserName} (${targetUserEmail})!`);
    
    setCommunityToTransfer(null);
    setSelectedUserIdForTransfer('');
    setCustomUserName('');
    setCustomUserEmail('');
  };

  const handleApplyPreset = (preset: typeof PRESET_THEMES[0]) => {
    setFormSettings((prev) => ({
      ...prev,
      ...preset.settings,
    }));
  };

  const handleSaveTheme = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateThemeSettings(formSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh visual & tema ke setelan default?')) {
      onResetThemeSettings();
      setFormSettings(DEFAULT_THEME_SETTINGS);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Filter approved communities for management table
  const filteredManagementCommunities = approvedCommunities.filter((comm) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = comm.name.toLowerCase().includes(q) || comm.city.toLowerCase().includes(q);
    
    if (transferFilter === 'claimed') return matchesSearch && comm.isClaimed;
    if (transferFilter === 'unclaimed') return matchesSearch && !comm.isClaimed;
    return matchesSearch;
  });

  return (
    <div className="bg-white border border-[#2D241E]/10 rounded-3xl p-4 sm:p-6 md:p-8 space-y-6 shadow-2xs text-[#2D241E] animate-fadeIn">
      
      {/* Admin Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2D241E]/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#5A5A40]/10 text-[#5A5A40] border border-[#5A5A40]/20 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D241E]">Master Admin Control Panel</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#2D241E]/10 text-[#2D241E] border border-[#2D241E]/20 text-[10px] font-mono font-bold uppercase">
                Private Route
              </span>
            </div>
            <p className="text-xs text-[#2D241E]/70 mt-0.5">
              Input manual direktori, hapus entri, transfer ownership ke user, dan kelola verifikasi pendaftaran.
            </p>
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="bg-[#F5F5F0] px-3 py-1.5 rounded-full border border-[#5A5A40]/15 text-xs">
            <span className="text-[#2D241E]/70">Antrean: </span>
            <span className="font-bold text-[#5A5A40]">{pendingRegistrations.length}</span>
          </div>
          <div className="bg-[#F5F5F0] px-3 py-1.5 rounded-full border border-[#5A5A40]/15 text-xs">
            <span className="text-[#2D241E]/70">Aktif Terbit: </span>
            <span className="font-bold text-emerald-700">{approvedCommunities.length}</span>
          </div>
          <div className="bg-[#F5F5F0] px-3 py-1.5 rounded-full border border-[#5A5A40]/15 text-xs">
            <span className="text-[#2D241E]/70">Claimed: </span>
            <span className="font-bold text-indigo-700">{approvedCommunities.filter(c => c.isClaimed).length}</span>
          </div>
        </div>
      </div>

      {/* Action Notice Alert */}
      {actionNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold flex items-center justify-between animate-fadeIn">
          <span>{actionNotice}</span>
          <button onClick={() => setActionNotice(null)} className="text-emerald-800 hover:text-black">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 bg-[#F5F5F0] p-1.5 rounded-2xl border border-[#2D241E]/10 w-max max-w-full overflow-x-auto scrollbar-thin">
        
        <button
          onClick={() => setActiveTab('management')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'management'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#2D241E]/70 hover:bg-stone-200/60'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>📁 Kelola & Input Manual ({approvedCommunities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('transfer')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'transfer'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#2D241E]/70 hover:bg-stone-200/60'
          }`}
        >
          <UserCheck className="w-4 h-4 text-emerald-300" />
          <span>🔄 Transfer Ownership Komunitas</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'verification'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#2D241E]/70 hover:bg-stone-200/60'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>📋 Antrean Verifikasi ({pendingRegistrations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('customizer')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'customizer'
              ? 'bg-[#5A5A40] text-white shadow-xs'
              : 'text-[#2D241E]/70 hover:bg-stone-200/60'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>🎨 Kustomisasi Visual Web</span>
        </button>

      </div>

      {/* TAB 1: KELOLA & INPUT DIREKTORI MANUAL */}
      {activeTab === 'management' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-[#F9F7F2] rounded-2xl border border-[#5A5A40]/20">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#2D241E]">Early Stage Curation & Directory Management</h3>
              <p className="text-xs text-[#2D241E]/70 mt-0.5">
                Input data komunitas dari tim riset secara manual atau hapus komunitas yang sudah tidak aktif dari direktori publik.
              </p>
            </div>

            <button
              onClick={() => setIsManualAddOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              + Input Komunitas Manual
            </button>
          </div>

          {/* Search & Quick Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama komunitas / kota..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D241E]/15 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
              />
            </div>

            <div className="text-xs text-[#2D241E]/60 font-semibold self-end sm:self-center">
              Menampilkan {filteredManagementCommunities.length} dari {approvedCommunities.length} komunitas
            </div>
          </div>

          {/* Table / Cards List of Active Communities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredManagementCommunities.map((comm) => (
              <div 
                key={comm.id}
                className="bg-[#FDFCF8] border border-[#2D241E]/10 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs hover:border-[#5A5A40]/40 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={comm.logoUrl} 
                        alt={comm.name} 
                        className="w-10 h-10 rounded-xl object-cover border border-[#2D241E]/10 shrink-0" 
                      />
                      <div>
                        <h4 className="text-sm font-serif font-bold text-[#2D241E] line-clamp-1">{comm.name}</h4>
                        <span className="text-[11px] text-[#5A5A40] font-medium">{comm.city} • {comm.memberCount} Anggota</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#2D241E]/70 line-clamp-2 italic">"{comm.tagline}"</p>

                  {/* Ownership Badge */}
                  <div className="pt-2 border-t border-[#2D241E]/10 text-[11px]">
                    {comm.isClaimed ? (
                      <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Owner: {comm.ownerUserName}
                        </span>
                        <span className="text-[10px] text-emerald-600">Claimed</span>
                      </div>
                    ) : (
                      <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-between">
                        <span className="font-semibold text-[10px]">🏷️ Kurasi Tim Platform (Unclaimed)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Management Action Buttons */}
                <div className="pt-2 border-t border-[#2D241E]/10 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCommunityToTransfer(comm);
                      setSelectedUserIdForTransfer(comm.ownerUserId || '');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#F5F5F0] hover:bg-[#5A5A40] hover:text-white text-[#2D241E] text-xs font-bold transition-all border border-[#5A5A40]/20 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Transfer Ownership</span>
                  </button>

                  <button
                    onClick={() => setCommunityToDelete(comm)}
                    title="Hapus Komunitas dari Direktori"
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-700 border border-red-200 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: TRANSFER OWNERSHIP KOMUNITAS */}
      {activeTab === 'transfer' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Explanation Banner */}
          <div className="p-5 bg-[#F9F7F2] rounded-2xl border border-[#5A5A40]/20 space-y-2">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#5A5A40]" />
              <h3 className="text-base font-serif font-bold text-[#2D241E]">Fitur Transfer Ownership Komunitas ke User Asli</h3>
            </div>
            <p className="text-xs text-[#2D241E]/80 leading-relaxed">
              <strong>Workflow Early Stage:</strong> Tim platform Membuku mengurasi dan memasukkan komunitas-komunitas buku di Indonesia terlebih dahulu. 
              Saat pengurus atau founder asli komunitas tersebut mendaftar akun di Membuku, Anda dapat mentransfer kepemilikan (Ownership) secara langsung.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-[#F5F5F0] p-1 rounded-xl border border-[#2D241E]/10 text-xs">
              <button
                onClick={() => setTransferFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  transferFilter === 'all' ? 'bg-[#5A5A40] text-white shadow-2xs' : 'text-[#2D241E]/70'
                }`}
              >
                Semua ({approvedCommunities.length})
              </button>
              <button
                onClick={() => setTransferFilter('unclaimed')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  transferFilter === 'unclaimed' ? 'bg-[#5A5A40] text-white shadow-2xs' : 'text-[#2D241E]/70'
                }`}
              >
                🏷️ Belum Dikelola ({approvedCommunities.filter(c => !c.isClaimed).length})
              </button>
              <button
                onClick={() => setTransferFilter('claimed')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  transferFilter === 'claimed' ? 'bg-[#5A5A40] text-white shadow-2xs' : 'text-[#2D241E]/70'
                }`}
              >
                ✅ Sudah Ditransfer ({approvedCommunities.filter(c => c.isClaimed).length})
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari komunitas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#F9F7F2] border border-[#2D241E]/15 text-xs text-[#2D241E]"
              />
            </div>
          </div>

          {/* Transfer List */}
          <div className="space-y-3">
            {filteredManagementCommunities.map((comm) => (
              <div 
                key={comm.id}
                className="bg-[#FDFCF8] p-4 rounded-2xl border border-[#2D241E]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <img src={comm.logoUrl} alt={comm.name} className="w-12 h-12 rounded-2xl object-cover border border-[#2D241E]/10" />
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#2D241E]">{comm.name}</h4>
                    <p className="text-xs text-[#5A5A40]">{comm.city} • {comm.format} • {comm.memberCount} Anggota</p>
                    
                    {comm.isClaimed ? (
                      <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        ✅ Owner saat ini: {comm.ownerUserName} ({comm.ownerEmail})
                      </span>
                    ) : (
                      <span className="inline-block mt-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        🏷️ Masih dikurasi tim platform (Unclaimed)
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCommunityToTransfer(comm);
                    setSelectedUserIdForTransfer(comm.ownerUserId || '');
                  }}
                  className="px-4 py-2 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <UserCheck className="w-4 h-4" />
                  {comm.isClaimed ? 'Ubah Owner Komunitas' : 'Transfer Ownership ke User'}
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: PENDING VERIFICATIONS */}
      {activeTab === 'verification' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-4">
            <h3 className="text-sm font-serif font-bold text-[#5A5A40] flex items-center gap-2 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-[#5A5A40]" />
              Antrean Pendaftaran Komunitas Baru ({pendingRegistrations.length})
            </h3>

            {pendingRegistrations.length === 0 ? (
              <div className="p-6 bg-[#FDFCF8] rounded-2xl border border-[#2D241E]/10 text-center text-xs text-[#2D241E]/60">
                Tidak ada pendaftaran komunitas baru yang menunggu verifikasi saat ini.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRegistrations.map((form, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F9F7F2] p-4 sm:p-5 rounded-2xl border border-[#2D241E]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-serif font-bold text-[#2D241E]">{form.name}</h4>
                        <span className="px-2.5 py-0.5 bg-[#5A5A40]/10 text-[#5A5A40] text-[10px] font-bold rounded-full border border-[#5A5A40]/20">
                          {form.format} • {form.city}
                        </span>
                      </div>
                      <p className="text-xs text-[#5A5A40] font-medium italic">"{form.tagline}"</p>
                      <p className="text-xs text-[#2D241E]/80 line-clamp-2">{form.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-[#2D241E]/60">
                        <span>📍 {form.locationName} ({form.scheduleDay})</span>
                        <span>👤 Penanggung Jawab: {form.contactPersonName} ({form.contactPersonPhone})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onApproveCommunity(form)}
                        className="px-4 py-2 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        Approve & Terbitkan
                      </button>
                      <button
                        onClick={() => onRejectCommunity(idx)}
                        className="px-3.5 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold active:scale-95 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                        Tolak
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: VISUAL THEME CUSTOMIZER */}
      {activeTab === 'customizer' && (
        <form onSubmit={handleSaveTheme} className="space-y-8 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F9F7F2] border border-[#5A5A40]/20">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#2D241E] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#5A5A40]" />
                Visual Customization Engine
              </h3>
              <p className="text-xs text-[#2D241E]/70 mt-0.5">
                Ubah nama platform, warna, font, banner hero, hingga teks footer langsung dari panel ini.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2 rounded-full bg-white text-[#2D241E] hover:bg-stone-200 border border-[#2D241E]/15 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#5A5A40]" />
                Reset Default
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Simpan & Terapkan Tema
              </button>
            </div>
          </div>

          {saveSuccess && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Berhasil! Seluruh visual & tema website telah diperbarui secara langsung.</span>
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-xs font-serif font-bold text-[#5A5A40] uppercase tracking-wider">
              1. Pilih Preset Tema Instan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PRESET_THEMES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="p-3.5 rounded-2xl border border-[#2D241E]/10 bg-white hover:border-[#5A5A40] transition-all text-left flex items-center justify-between shadow-2xs group cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#2D241E]">{preset.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: preset.settings.primaryColor }} />
                    <span className="w-4 h-4 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: preset.settings.backgroundColor }} />
                    <span className="w-4 h-4 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: preset.settings.textColor }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Color & Font Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#2D241E]/10">
            <div className="space-y-4">
              <h4 className="text-xs font-serif font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5">
                <Layout className="w-4 h-4" />
                A. Brand Identity & Hero Text
              </h4>

              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/80 mb-1">Nama Platform / Brand</label>
                <input
                  type="text"
                  value={formSettings.siteName}
                  onChange={(e) => setFormSettings({ ...formSettings, siteName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D241E]/15 text-xs font-bold text-[#2D241E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/80 mb-1">Tagline Platform</label>
                <input
                  type="text"
                  value={formSettings.siteTagline}
                  onChange={(e) => setFormSettings({ ...formSettings, siteTagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D241E]/15 text-xs text-[#2D241E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/80 mb-1">Judul Utama Hero Section</label>
                <textarea
                  rows={2}
                  value={formSettings.heroTitle}
                  onChange={(e) => setFormSettings({ ...formSettings, heroTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F9F7F2] border border-[#2D241E]/15 text-xs font-bold text-[#2D241E]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-serif font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-4 h-4" />
                B. Palet Warna Utama
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#2D241E]/80 mb-1">Warna Utama</label>
                  <input
                    type="color"
                    value={formSettings.primaryColor}
                    onChange={(e) => setFormSettings({ ...formSettings, primaryColor: e.target.value })}
                    className="w-full h-9 rounded-lg border border-[#2D241E]/15 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#2D241E]/80 mb-1">Warna Latar</label>
                  <input
                    type="color"
                    value={formSettings.backgroundColor}
                    onChange={(e) => setFormSettings({ ...formSettings, backgroundColor: e.target.value })}
                    className="w-full h-9 rounded-lg border border-[#2D241E]/15 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#2D241E]/10 flex items-center justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Simpan Perubahan Visual
            </button>
          </div>

        </form>
      )}

      {/* MODAL 1: INPUT KOMUNITAS MANUAL */}
      {isManualAddOpen && (
        <div 
          onClick={() => setIsManualAddOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FDFCF8] border border-[#2D241E]/10 rounded-3xl max-w-2xl w-full p-5 sm:p-6 space-y-4 shadow-2xl relative text-[#2D241E] max-h-[92vh] overflow-y-auto scrollbar-thin my-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2D241E]/10">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2D241E]">Input Komunitas Manual (Curation)</h3>
                <p className="text-xs text-[#2D241E]/70">Masukkan data komunitas terverifikasi untuk dipublikasikan langsung.</p>
              </div>
              <button
                onClick={() => setIsManualAddOpen(false)}
                className="px-3 py-1.5 rounded-full bg-[#2D241E] text-white hover:bg-[#5A5A40] text-xs font-bold transition-all"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleSubmitManualAdd} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Nama Komunitas *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Klub Baca Nusantara Bandung"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Tagline Singkat *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ruang temu pecinta novel & puisi di Bandung"
                    value={addTagline}
                    onChange={(e) => setAddTagline(e.target.value)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Deskripsi Lengkap Komunitas</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan sejarah singkat, aktivitas utama, dan suasana kumpul komunitas..."
                  value={addDescription}
                  onChange={(e) => setAddDescription(e.target.value)}
                  className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kota / Domisili *</label>
                  <select
                    value={addCity}
                    onChange={(e) => setAddCity(e.target.value as LocationType)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A5A40]"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Format *</label>
                  <select
                    value={addFormat}
                    onChange={(e) => setAddFormat(e.target.value as CommunityFormat)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A5A40]"
                  >
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Jumlah Anggota Saja</label>
                  <input
                    type="number"
                    value={addMemberCount}
                    onChange={(e) => setAddMemberCount(Number(e.target.value))}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>
              </div>

              {/* Genres Checkbox Pick */}
              <div>
                <label className="block font-semibold mb-1">Genre Fokus Utama</label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {AVAILABLE_GENRES.map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => handleToggleAddGenre(g)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                        addGenres.includes(g)
                          ? 'bg-[#5A5A40] text-white'
                          : 'bg-white border border-[#2D241E]/15 text-[#2D241E]/70 hover:bg-stone-100'
                      }`}
                    >
                      {g} {addGenres.includes(g) ? '✓' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#2D241E]/10">
                <div>
                  <label className="block font-semibold mb-1">Frekuensi Hari Kumpul</label>
                  <input
                    type="text"
                    placeholder="e.g. Sabtu ke-2 & ke-4 setiap bulan"
                    value={addScheduleDay}
                    onChange={(e) => setAddScheduleDay(e.target.value)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Nama Tempat / Lokasi Kumpul</label>
                  <input
                    type="text"
                    placeholder="e.g. Taman Balai Kota & Kopi Kenangan"
                    value={addLocationName}
                    onChange={(e) => setAddLocationName(e.target.value)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Instagram Handle</label>
                  <input
                    type="text"
                    placeholder="e.g. bacadipark.jkt"
                    value={addInstagram}
                    onChange={(e) => setAddInstagram(e.target.value)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">WhatsApp Group Link</label>
                  <input
                    type="text"
                    placeholder="e.g. https://chat.whatsapp.com/..."
                    value={addWhatsapp}
                    onChange={(e) => setAddWhatsapp(e.target.value)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              {/* Assign Initial Ownership Option */}
              {registeredUsers.length > 0 && (
                <div className="p-3 bg-[#F5F5F0] rounded-2xl border border-[#5A5A40]/20 space-y-1">
                  <label className="block font-serif font-bold text-[#2D241E]">
                    Transfer Ownership Langsung ke User Terdaftar (Opsional):
                  </label>
                  <select
                    value={addAssignUserId}
                    onChange={(e) => setAddAssignUserId(e.target.value)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2 text-xs"
                  >
                    <option value="">-- Belum Ditransfer (Tim Platform Membuku) --</option>
                    {registeredUsers.map((u) => (
                      <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-98"
              >
                Terbitkan Komunitas ke Direktori Publik
              </button>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DELETE CONFIRMATION DIALOG */}
      {communityToDelete && (
        <div 
          onClick={() => setCommunityToDelete(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FDFCF8] border border-red-200 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-[#2D241E]"
          >
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-3 rounded-2xl bg-red-100">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold">Hapus Komunitas Manual?</h3>
            </div>

            <p className="text-xs text-[#2D241E]/80 leading-relaxed">
              Anda akan menghapus <strong className="text-black">"{communityToDelete.name}"</strong> dari direktori publik Membuku. 
              Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setCommunityToDelete(null)}
                className="flex-1 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#2D241E] text-xs font-bold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Ya, Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: TRANSFER OWNERSHIP DIALOG */}
      {communityToTransfer && (
        <div 
          onClick={() => setCommunityToTransfer(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FDFCF8] border border-[#2D241E]/10 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-[#2D241E]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2D241E]/10">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-serif font-bold text-[#2D241E]">Transfer Ownership Komunitas</h3>
              </div>
              <button
                onClick={() => setCommunityToTransfer(null)}
                className="p-1 hover:text-[#5A5A40]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-[#F5F5F0] rounded-2xl border border-[#5A5A40]/20 flex items-center gap-3 text-xs">
              <img src={communityToTransfer.logoUrl} alt={communityToTransfer.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
              <div>
                <strong className="block text-sm font-serif">{communityToTransfer.name}</strong>
                <span className="text-[#5A5A40]">{communityToTransfer.city} • {communityToTransfer.memberCount} Anggota</span>
              </div>
            </div>

            <form onSubmit={handleConfirmTransfer} className="space-y-4 text-xs">
              
              {/* Registered Users Selection */}
              {registeredUsers.length > 0 ? (
                <div>
                  <label className="block font-bold text-[#2D241E] mb-1">
                    Pilih Akun User Terdaftar yang Memiliki Komunitas Ini:
                  </label>
                  <select
                    value={selectedUserIdForTransfer}
                    onChange={(e) => {
                      setSelectedUserIdForTransfer(e.target.value);
                      if (e.target.value) {
                        setCustomUserName('');
                        setCustomUserEmail('');
                      }
                    }}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                  >
                    <option value="">-- Pilih dari User Terdaftar --</option>
                    {registeredUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        👤 {user.name} ({user.email}) - Domisili: {user.city}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="text-[11px] text-[#2D241E]/60 italic">Belum ada user terdaftar di sistem.</p>
              )}

              {/* Or Manual Input Target Owner */}
              <div className="pt-2 border-t border-[#2D241E]/10 space-y-2">
                <span className="block font-semibold text-[11px] text-[#5A5A40]">Atau Masukkan Nama & Email Pengurus Baru Secara Manual:</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Nama Pengurus / Founder"
                    value={customUserName}
                    onChange={(e) => {
                      setCustomUserName(e.target.value);
                      if (e.target.value) setSelectedUserIdForTransfer('');
                    }}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2 text-xs"
                  />
                  <input
                    type="email"
                    placeholder="Email Pengurus"
                    value={customUserEmail}
                    onChange={(e) => {
                      setCustomUserEmail(e.target.value);
                      if (e.target.value) setSelectedUserIdForTransfer('');
                    }}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#2D241E]/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCommunityToTransfer(null)}
                  className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-[#2D241E] font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Konfirmasi Transfer Ownership
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { BookOpen, Search, PlusCircle, User, Menu, X, ShieldAlert, Sparkles, Calendar, MessageSquare, ArrowRight, UserPlus, LogOut, Flame, Home, LogIn } from 'lucide-react';
import { SiteThemeSettings, UserAccount } from '../types';

interface NavbarProps {
  onOpenRegisterModal: () => void;
  onOpenUserRegisterModal: (mode?: 'register' | 'login') => void;
  onNavigateTab: (tab: string) => void;
  activeTab: string;
  isAdminMode: boolean;
  onToggleAdminMode: () => void;
  themeSettings?: SiteThemeSettings;
  currentUser?: UserAccount | null;
  onLogoutUser?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegisterModal,
  onOpenUserRegisterModal,
  onNavigateTab,
  activeTab,
  isAdminMode,
  onToggleAdminMode,
  themeSettings,
  currentUser,
  onLogoutUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tabId: string) => {
    onNavigateTab(tabId);
    setMobileMenuOpen(false);
  };

  const siteName = themeSettings?.siteName || 'membuku';
  const siteTagline = themeSettings?.siteTagline || 'Direktori Komunitas Baca';

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[#2D241E]/10 text-[#2D241E] shadow-sm transition-all">
      
      {/* Top Announcement Bar if enabled */}
      {themeSettings?.enableAnnouncement && (
        <div 
          className="px-4 py-2 text-center text-xs font-bold text-white flex items-center justify-center gap-2 shadow-inner"
          style={{ backgroundColor: themeSettings.primaryColor || '#5A5A40' }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{themeSettings.announcementText}</span>
          {themeSettings.announcementLinkText && (
            <button 
              onClick={onOpenRegisterModal}
              className="underline font-bold hover:opacity-90 flex items-center gap-1 ml-1 cursor-pointer"
            >
              <span>{themeSettings.announcementLinkText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Custom Site Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabClick('home')}>
            {themeSettings?.logoUrl ? (
              <img src={themeSettings.logoUrl} alt={siteName} className="w-9 h-9 object-contain rounded-lg shadow-sm" />
            ) : (
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm transition-transform hover:scale-105"
                style={{ backgroundColor: themeSettings?.primaryColor || '#5A5A40' }}
              >
                <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
              </div>
            )}
            <div>
              <span 
                className="text-2xl font-serif font-bold tracking-tight"
                style={{ 
                  color: themeSettings?.primaryColor || '#5A5A40',
                  fontFamily: themeSettings?.headingFont || 'Plus Jakarta Sans' 
                }}
              >
                {siteName}
              </span>
              <span className="block text-[10px] font-semibold tracking-wider opacity-70 uppercase -mt-1 line-clamp-1">
                {siteTagline}
              </span>
            </div>
          </div>


          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1.5">
            <button
              onClick={() => handleTabClick('home')}
              className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'bg-[#5A5A40] text-white shadow-sm font-semibold'
                  : 'text-[#5A5A40]/80 hover:text-[#5A5A40] hover:bg-[#F5F5F0]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Beranda
            </button>

            <button
              onClick={() => handleTabClick('directory')}
              className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'directory'
                  ? 'bg-[#5A5A40] text-white shadow-sm font-semibold'
                  : 'text-[#5A5A40]/80 hover:text-[#5A5A40] hover:bg-[#F5F5F0]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Direktori
            </button>

            <button
              onClick={() => handleTabClick('events')}
              className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'events'
                  ? 'bg-[#5A5A40] text-white shadow-sm font-semibold'
                  : 'text-[#5A5A40]/80 hover:text-[#5A5A40] hover:bg-[#F5F5F0]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Event Literasi
            </button>

            <button
              onClick={() => handleTabClick('profile')}
              className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'profile'
                  ? 'bg-[#5A5A40] text-white shadow-sm font-semibold'
                  : 'text-[#5A5A40]/80 hover:text-[#5A5A40] hover:bg-[#F5F5F0]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Template Baca
            </button>

            <button
              onClick={() => handleTabClick('workout')}
              className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'workout'
                  ? 'bg-orange-600 text-white shadow-sm font-semibold'
                  : 'text-orange-700 bg-orange-50 hover:bg-orange-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              Reading Workout
            </button>

            <button
              onClick={() => handleTabClick('forum')}
              className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'forum'
                  ? 'bg-[#5A5A40] text-white shadow-sm font-semibold'
                  : 'text-[#5A5A40]/80 hover:text-[#5A5A40] hover:bg-[#F5F5F0]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Forum
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* User Account Button or Status */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#F5F5F0] px-3 py-1.5 rounded-full border border-[#5A5A40]/20">
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-6 h-6 rounded-full object-cover" />
                <span className="text-xs font-bold text-[#2D241E] max-w-[100px] truncate">{currentUser.name}</span>
                {onLogoutUser && (
                  <button 
                    onClick={onLogoutUser} 
                    title="Keluar Akun"
                    className="p-1 hover:text-red-600 text-gray-400 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                {/* Daftar Button */}
                <button
                  onClick={() => onOpenUserRegisterModal('register')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full bg-[#F5F5F0] text-[#5A5A40] border border-[#5A5A40]/30 hover:bg-[#5A5A40] hover:text-white transition-all shadow-2xs cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Daftar
                </button>

                {/* Login Button (Right of Daftar) */}
                <button
                  onClick={() => onOpenUserRegisterModal('login')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full bg-white text-[#2D241E] border border-[#2D241E]/20 hover:border-[#5A5A40] hover:text-[#5A5A40] transition-all shadow-2xs cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Masuk
                </button>
              </div>
            )}

            <button
              onClick={onOpenRegisterModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full bg-[#5A5A40] text-white hover:bg-[#484833] active:scale-95 transition-all shadow-xs cursor-pointer ml-1"
            >
              <PlusCircle className="w-4 h-4" />
              Mulai Komunitas
            </button>

            {/* Admin toggle simulation switch */}
            <button
              onClick={onToggleAdminMode}
              title={isAdminMode ? 'Mode Master Admin Aktif' : 'Masuk Mode Master Admin (Hidden Control)'}
              className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all border ${
                isAdminMode
                  ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                  : 'bg-[#F5F5F0] text-[#5A5A40] border-[#5A5A40]/20 hover:bg-[#5A5A40] hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isAdminMode ? 'ADMIN ON' : 'ADMIN'}</span>
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex md:hidden items-center gap-1.5">
            {!currentUser && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onOpenUserRegisterModal('register')}
                  className="px-2.5 py-1 text-xs font-bold rounded-full bg-[#F5F5F0] text-[#5A5A40] border border-[#5A5A40]/30 flex items-center gap-1"
                >
                  <UserPlus className="w-3 h-3" />
                  Daftar
                </button>
                <button
                  onClick={() => onOpenUserRegisterModal('login')}
                  className="px-2.5 py-1 text-xs font-bold rounded-full bg-[#5A5A40] text-white flex items-center gap-1"
                >
                  <LogIn className="w-3 h-3" />
                  Masuk
                </button>
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2D241E] hover:text-[#5A5A40] rounded-xl hover:bg-[#F5F5F0]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFCF8] border-b border-[#2D241E]/10 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => handleTabClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-3 ${
              activeTab === 'home' ? 'bg-[#5A5A40] text-white font-semibold' : 'text-[#2D241E]'
            }`}
          >
            <Home className="w-4 h-4" />
            Beranda
          </button>
          <button
            onClick={() => handleTabClick('directory')}
            className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-3 ${
              activeTab === 'directory' ? 'bg-[#5A5A40] text-white font-semibold' : 'text-[#2D241E]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Direktori Komunitas
          </button>
          <button
            onClick={() => handleTabClick('events')}
            className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-3 ${
              activeTab === 'events' ? 'bg-[#5A5A40] text-white font-semibold' : 'text-[#2D241E]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Event Literasi
          </button>
          <button
            onClick={() => handleTabClick('profile')}
            className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-3 ${
              activeTab === 'profile' ? 'bg-[#5A5A40] text-white font-semibold' : 'text-[#2D241E]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Template Baca
          </button>
          <button
            onClick={() => handleTabClick('workout')}
            className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-3 ${
              activeTab === 'workout' ? 'bg-orange-600 text-white font-semibold' : 'text-orange-700 bg-orange-50'
            }`}
          >
            <Flame className="w-4 h-4 fill-current" />
            Reading Workout (Strava Mode)
          </button>
          <button
            onClick={() => handleTabClick('forum')}
            className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-3 ${
              activeTab === 'forum' ? 'bg-[#5A5A40] text-white font-semibold' : 'text-[#2D241E]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Forum Diskusi
          </button>

          <div className="pt-2 border-t border-[#2D241E]/10 flex items-center justify-between">
            <button
              onClick={onToggleAdminMode}
              className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-2 border ${
                isAdminMode
                  ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                  : 'bg-[#F5F5F0] text-[#5A5A40] border-[#5A5A40]/20'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isAdminMode ? 'Mode Admin: ON' : 'Mode Admin: OFF'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

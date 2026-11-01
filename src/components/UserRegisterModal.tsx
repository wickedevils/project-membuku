import React, { useState, useEffect } from 'react';
import { UserPlus, X, BookOpen, CheckCircle, Mail, Lock, User, MapPin, Sparkles, LogIn, Loader2 } from 'lucide-react';
import { UserAccount } from '../types';

interface UserRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (user: UserAccount) => void;
  onSwitchToLogin?: () => void;
  initialMessage?: string;
  initialMode?: 'register' | 'login';
}

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const UserRegisterModal: React.FC<UserRegisterModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
  initialMessage,
  initialMode = 'register',
}) => {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(initialMode === 'login');
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [googleAuthSuccess, setGoogleAuthSuccess] = useState<boolean>(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Jakarta');
  const [favoriteGenre, setFavoriteGenre] = useState('Fiksi & Novel');

  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    setIsLoginMode(initialMode === 'login');
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  // Google / Gmail Automatic Authentication Handler
  const handleGoogleAuth = (selectedEmail?: string) => {
    setIsGoogleLoading(true);

    const gmailAddress = selectedEmail || 'mueeekk@gmail.com';
    const nameFromEmail = gmailAddress.split('@')[0];
    const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    setTimeout(() => {
      setIsGoogleLoading(false);
      setGoogleAuthSuccess(true);

      const googleUser: UserAccount = {
        id: `usr-google-${Date.now()}`,
        name: capitalizedName || 'Pembaca Google',
        email: gmailAddress,
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80`,
        city: 'Jakarta',
        favoriteGenre: 'Fiksi & Novel',
        isLoggedIn: true,
        createdAt: new Date().toLocaleDateString('id-ID'),
      };

      setTimeout(() => {
        onRegisterSuccess(googleUser);
        setGoogleAuthSuccess(false);
        onClose();
      }, 1000);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: isLoginMode ? (email.split('@')[0] || 'Pembaca Membuku') : (fullName || 'Pembaca Membuku'),
      email,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80`,
      city: city || 'Jakarta',
      favoriteGenre: favoriteGenre || 'Fiksi & Novel',
      isLoggedIn: true,
      createdAt: new Date().toLocaleDateString('id-ID'),
    };

    setRegistered(true);
    setTimeout(() => {
      onRegisterSuccess(newUser);
      setRegistered(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FDFCF8] border border-[#2D241E]/15 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative text-[#2D241E] max-h-[92vh] overflow-y-auto scrollbar-thin my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2D241E]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#5A5A40] text-white flex items-center justify-center shadow-xs">
              {isLoginMode ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#2D241E]">
                {isLoginMode ? 'Masuk ke Membuku' : 'Daftar Akun Pembaca Baru'}
              </h3>
              <p className="text-[11px] text-[#2D241E]/60">
                {isLoginMode ? 'Masuk untuk mengelola profil & diskusi' : 'Bergabung gratis dengan komunitas pembaca Indonesia'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-[#2D241E]/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Initial prompt message if triggered by restricted CTA */}
        {initialMessage && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Akses Fitur Terbatas:</span>
              {initialMessage}
            </div>
          </div>
        )}

        {googleAuthSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif font-bold text-[#2D241E]">
              Otentikasi Google Berhasil!
            </h4>
            <p className="text-xs text-[#2D241E]/70">
              Terhubung otomatis dengan akun Gmail <strong className="text-[#5A5A40]">mueeekk@gmail.com</strong>.
            </p>
          </div>
        ) : registered ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif font-bold text-[#2D241E]">
              {isLoginMode ? 'Berhasil Masuk!' : 'Registrasi Berhasil!'}
            </h4>
            <p className="text-xs text-[#2D241E]/70">
              Selamat datang di membuku, <strong className="text-[#5A5A40]">{fullName || email}</strong>. Anda sekarang dapat mendaftar event, menulis komentar, dan membuat diskusi.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {/* AUTOMATIC GMAIL / GOOGLE SIGN-IN SECTION */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleGoogleAuth('mueeekk@gmail.com')}
                disabled={isGoogleLoading}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-stone-50 border-2 border-stone-200 hover:border-[#5A5A40] text-[#2D241E] font-bold text-xs shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer group relative overflow-hidden"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#5A5A40]" />
                    <span>Menghubungkan Akun Gmail...</span>
                  </>
                ) : (
                  <>
                    <GoogleIcon />
                    <span>{isLoginMode ? 'Masuk Otomatis dengan Gmail' : 'Daftar Otomatis dengan Gmail'}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 ml-auto">
                      Auto-Auth
                    </span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-center text-[#2D241E]/60 bg-[#F5F5F0] p-2 rounded-xl border border-[#2D241E]/10 flex items-center justify-between">
                <span>Akun Gmail Terdeteksi: <strong className="text-[#5A5A40]">mueeekk@gmail.com</strong></span>
                <button
                  type="button"
                  onClick={() => handleGoogleAuth('mueeekk@gmail.com')}
                  className="text-[#5A5A40] font-bold hover:underline ml-1"
                >
                  1-Klik Login →
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-[#2D241E]/15 w-full"></div>
              <span className="bg-[#FDFCF8] px-3 text-[10px] font-bold text-[#2D241E]/50 uppercase tracking-wider shrink-0">
                Atau Manual dengan Email
              </span>
              <div className="border-t border-[#2D241E]/15 w-full"></div>
            </div>

            {/* Manual Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              
              {!isLoginMode && (
                <div>
                  <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Nama Lengkap / Display Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dian Sastrowardoyo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white text-[#2D241E] pl-10 pr-4 py-2 rounded-xl border border-[#2D241E]/15 text-xs focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="pembaca@membuku.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white text-[#2D241E] pl-10 pr-4 py-2 rounded-xl border border-[#2D241E]/15 text-xs focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white text-[#2D241E] pl-10 pr-4 py-2 rounded-xl border border-[#2D241E]/15 text-xs focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>
              </div>

              {!isLoginMode && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Kota Domisili</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white text-[#2D241E] p-2 rounded-xl border border-[#2D241E]/15 text-xs focus:outline-none focus:border-[#5A5A40]"
                    >
                      <option value="Jakarta">Jakarta</option>
                      <option value="Bandung">Bandung</option>
                      <option value="Yogyakarta">Yogyakarta</option>
                      <option value="Surabaya">Surabaya</option>
                      <option value="Medan">Medan</option>
                      <option value="Bali">Bali</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Genre Favorit</label>
                    <select
                      value={favoriteGenre}
                      onChange={(e) => setFavoriteGenre(e.target.value)}
                      className="w-full bg-white text-[#2D241E] p-2 rounded-xl border border-[#2D241E]/15 text-xs focus:outline-none focus:border-[#5A5A40]"
                    >
                      <option value="Fiksi & Novel">Fiksi & Novel</option>
                      <option value="Sastra & Klasik">Sastra & Klasik</option>
                      <option value="Non-Fiksi & Essai">Non-Fiksi & Essai</option>
                      <option value="Self-Development">Self-Development</option>
                      <option value="Sci-Fi & Fantasi">Sci-Fi & Fantasi</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                {isLoginMode ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                <span>{isLoginMode ? 'Masuk Sekarang' : 'Daftar Akun Pembaca (Gratis)'}</span>
              </button>

              <div className="text-center pt-2 border-t border-[#2D241E]/10">
                <button
                  type="button"
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-xs text-[#5A5A40] hover:underline font-semibold cursor-pointer"
                >
                  {isLoginMode ? 'Belum punya akun? Daftar Akun Baru' : 'Sudah punya akun? Masuk di sini'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};


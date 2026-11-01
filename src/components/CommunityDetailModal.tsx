import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Instagram, 
  MessageCircle, 
  Globe, 
  BookOpen, 
  Share2, 
  Sparkles,
  Send,
  UserCheck,
  Check,
  ArrowLeft
} from 'lucide-react';
import { Community } from '../types';

interface CommunityDetailModalProps {
  community: Community | null;
  onClose: () => void;
}

export const CommunityDetailModal: React.FC<CommunityDetailModalProps> = ({
  community,
  onClose,
}) => {
  if (!community) return null;

  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantReason, setApplicantReason] = useState('');
  const [copied, setCopied] = useState(false);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;
    
    // Simulate submission
    setJoinSubmitted(true);
  };

  const handleShareClick = () => {
    const shareUrl = `${window.location.origin}?community=${community.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }).catch(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn"
    >
      
      {/* Toast Notification overlay on copy */}
      {copied && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-[#2D241E] text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Tautan komunitas berhasil disalin!</span>
        </div>
      )}

      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FDFCF8] border border-[#2D241E]/10 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-[#2D241E] my-auto scrollbar-thin"
      >
        
        {/* Sticky Header Bar for Mobile & Close Button */}
        <div className="sticky top-0 z-30 bg-[#FDFCF8]/95 backdrop-blur-md px-4 py-3 border-b border-[#2D241E]/10 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#5A5A40]">
            <span className="w-2 h-2 rounded-full bg-[#5A5A40]" />
            Detail Komunitas Baca
          </div>

          <div className="flex items-center gap-2">
            {/* Share CTA */}
            <button
              onClick={handleShareClick}
              className="px-3 py-1.5 rounded-full bg-[#F5F5F0] hover:bg-[#5A5A40] text-[#2D241E] hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-[#2D241E]/10 active:scale-95"
              title="Bagikan Tautan Komunitas"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan</span>
                </>
              )}
            </button>

            {/* Prominent High-Contrast Close Button */}
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-full bg-[#2D241E] text-white hover:bg-[#5A5A40] text-xs font-bold transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
              aria-label="Tutup Dialog"
              title="Tutup (Esc)"
            >
              <X className="w-4 h-4" />
              <span>Tutup</span>
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative h-44 sm:h-60 overflow-hidden bg-[#F5F5F0]">
          <img 
            src={community.bannerUrl} 
            alt={community.name} 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex items-end justify-between">
            <div className="flex items-end gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ring-4 ring-white overflow-hidden bg-white shadow-xl shrink-0">
                <img 
                  src={community.logoUrl} 
                  alt={community.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pb-1">
                <span className="px-3 py-1 rounded-full bg-[#F5F5F0] text-[#5A5A40] border border-[#5A5A40]/20 text-[11px] font-bold uppercase tracking-wider shadow-xs">
                  Format: {community.format}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          
          {/* Header Info */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#2D241E] flex items-center gap-2">
                  {community.name}
                  {community.verified && (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#5A5A40]" title="Terverifikasi" />
                  )}
                </h2>
                <p className="text-[#5A5A40] font-medium text-xs sm:text-sm mt-1 italic">
                  "{community.tagline}"
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-3 py-1.5 bg-white text-[#2D241E] rounded-xl text-xs font-semibold border border-[#2D241E]/10 flex items-center gap-1.5 shadow-2xs">
                  <Users className="w-4 h-4 text-[#5A5A40]" />
                  {community.memberCount.toLocaleString('id-ID')} Anggota
                </span>
                <span className="px-3 py-1.5 bg-white text-[#2D241E] rounded-xl text-xs font-semibold border border-[#2D241E]/10 shadow-2xs">
                  Est. {community.establishedYear}
                </span>
              </div>
            </div>

            {/* City & Genres */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
              <span className="px-3 py-1 bg-[#F5F5F0] text-[#5A5A40] rounded-full font-bold uppercase tracking-wider border border-[#5A5A40]/20 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {community.city} {community.district ? `(${community.district})` : ''}
              </span>
              {community.genres.map((g, i) => (
                <span key={i} className="px-3 py-1 bg-[#F5F5F0] text-[#5A5A40] rounded-full font-medium border border-[#5A5A40]/15">
                  {g}
                </span>
              ))}

              {community.isClaimed && (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold border border-emerald-300 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Official Admin Owner: {community.ownerUserName}
                </span>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-[#F9F7F2] p-4 sm:p-5 rounded-2xl border border-[#2D241E]/10 space-y-2">
            <h3 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">Tentang Komunitas</h3>
            <p className="text-[#2D241E]/80 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {community.description}
            </p>
          </div>

          {/* Schedule & Location Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#2D241E]/10 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-[#5A5A40] font-bold text-sm">
                <Clock className="w-4 h-4" />
                Jadwal Kumpul Rutin
              </div>
              <p className="text-[#2D241E] text-sm font-semibold">{community.schedule.dayFrequency}</p>
              <p className="text-[#2D241E]/60 text-xs">{community.schedule.time}</p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#2D241E]/10 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-[#5A5A40] font-bold text-sm">
                <MapPin className="w-4 h-4" />
                Lokasi Utama
              </div>
              <p className="text-[#2D241E] text-sm font-semibold">{community.schedule.locationName}</p>
              {community.address && <p className="text-[#2D241E]/60 text-xs">{community.address}</p>}
            </div>
          </div>

          {/* Recent Books Read */}
          {community.recentBooks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-serif font-bold text-[#2D241E] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#5A5A40]" />
                Buku yang Sedang / Baru Dibaca
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {community.recentBooks.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#2D241E]/10 shadow-2xs">
                    <img src={b.coverUrl} alt={b.title} className="w-10 h-14 object-cover rounded-md shadow-xs shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#2D241E] truncate">{b.title}</h4>
                      <p className="text-[11px] text-[#2D241E]/60 truncate">{b.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leaders / Hosts */}
          {community.leaders.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-serif font-bold text-[#2D241E]">Pengurus & Inisiator</h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {community.leaders.map((leader, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white px-3.5 py-2 rounded-2xl border border-[#2D241E]/10 shadow-2xs">
                    <img src={leader.avatar} alt={leader.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#2D241E]">{leader.name}</div>
                      <div className="text-[10px] text-[#5A5A40] font-semibold uppercase">{leader.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links Bar */}
          <div className="pt-4 border-t border-[#2D241E]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-[#2D241E]/60 font-semibold">Kontak & Medsos:</span>
            <div className="flex flex-wrap items-center gap-2">
              {community.socials.instagram && (
                <a
                  href={`https://instagram.com/${community.socials.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-[#F5F5F0] hover:bg-[#5A5A40] text-[#2D241E] hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  @{community.socials.instagram}
                </a>
              )}
              {community.socials.whatsappGroup && (
                <a
                  href={community.socials.whatsappGroup}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-[#F5F5F0] hover:bg-[#5A5A40] text-[#5A5A40] hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-[#5A5A40]/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Grup WhatsApp
                </a>
              )}
              {community.socials.website && (
                <a
                  href={community.socials.website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-[#F5F5F0] hover:bg-[#5A5A40] text-[#2D241E] hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Globe className="w-4 h-4 text-sky-600" />
                  Website
                </a>
              )}
            </div>
          </div>

          {/* Join Form Section */}
          <div className="bg-[#F9F7F2] p-4 sm:p-6 rounded-2xl border border-[#5A5A40]/20 space-y-4">
            <div className="flex items-center gap-2 text-[#5A5A40] font-bold text-base">
              <Sparkles className="w-5 h-5 text-[#5A5A40]" />
              Gabung / Daftar Anggota Baru
            </div>

            {joinSubmitted ? (
              <div className="p-4 bg-white border border-[#5A5A40] text-[#2D241E] rounded-xl text-center space-y-2 shadow-xs">
                <UserCheck className="w-8 h-8 mx-auto text-[#5A5A40]" />
                <h4 className="font-bold text-sm text-[#5A5A40]">Permohonan Terkirim!</h4>
                <p className="text-xs text-[#2D241E]/70">
                  Pengurus komunitas <strong>{community.name}</strong> akan segera mendata dan mengontakmu via WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-3">
                <p className="text-xs text-[#2D241E]/70">
                  Isi formulir singkat di bawah ini untuk terhubung langsung dengan pengurus komunitas:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap Kamu"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Nomor WhatsApp (mis. 08123456789)"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Buku favoritmu / alasan bergabung (opsional)"
                  value={applicantReason}
                  onChange={(e) => setApplicantReason(e.target.value)}
                  className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  Kirim Permohonan Gabung
                </button>
              </form>
            )}
          </div>

          {/* Bottom Close Action Button */}
          <div className="pt-4 border-t border-[#2D241E]/10 flex justify-center">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#F5F5F0] hover:bg-[#2D241E] text-[#2D241E] hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 border border-[#2D241E]/15 shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tutup Modal & Kembali ke Direktori</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};


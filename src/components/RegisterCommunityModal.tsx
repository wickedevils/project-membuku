import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, ShieldCheck, Sparkles, MapPin, BookOpen } from 'lucide-react';
import { RegisterCommunityForm, LocationType, CommunityFormat, BookGenre } from '../types';

interface RegisterCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitNewCommunity: (formData: RegisterCommunityForm) => void;
}

const CITIES: LocationType[] = [
  'Jakarta',
  'Bandung',
  'Yogyakarta',
  'Surabaya',
  'Medan',
  'Bali',
  'Malang',
  'Semarang',
  'Makassar',
  'Online (Seluruh Indonesia)',
  'Lainnya'
];

const GENRE_OPTIONS: BookGenre[] = [
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

export const RegisterCommunityModal: React.FC<RegisterCommunityModalProps> = ({
  isOpen,
  onClose,
  onSubmitNewCommunity,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<RegisterCommunityForm>({
    name: '',
    tagline: '',
    description: '',
    city: 'Jakarta',
    district: '',
    format: 'Offline',
    genres: ['Fiksi & Novel'],
    scheduleDay: 'Setiap Sabtu Minggu ke-2',
    scheduleTime: '15:00 - 17:00 WIB',
    locationName: 'Taman Kota / Cafe',
    instagram: '',
    whatsapp: '',
    contactPersonName: '',
    contactPersonPhone: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleGenreToggle = (genre: BookGenre) => {
    if (formData.genres.includes(genre)) {
      if (formData.genres.length > 1) {
        setFormData({
          ...formData,
          genres: formData.genres.filter((g) => g !== genre),
        });
      }
    } else {
      setFormData({
        ...formData,
        genres: [...formData.genres, genre],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitNewCommunity(formData);
    setSubmitted(true);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn"
    >
      
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FDFCF8] border border-[#2D241E]/10 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-[#2D241E] my-auto scrollbar-thin"
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#2D241E]/10 bg-[#F9F7F2] sticky top-0 z-10 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5A5A40] text-white flex items-center justify-center shadow-xs shrink-0">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2D241E]">Daftarkan Komunitas Baca</h2>
              <p className="text-[11px] sm:text-xs text-[#2D241E]/60 line-clamp-1">
                Akan ditinjau oleh Master Admin sebelum tampil publik
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-[#2D241E] text-white hover:bg-[#5A5A40] text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
            aria-label="Tutup Dialog Pendaftaran"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Tutup</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F5F0] text-[#5A5A40] border border-[#5A5A40]/30 flex items-center justify-center mx-auto shadow-2xs">
                <ShieldCheck className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#5A5A40]">Pendaftaran Berhasil Dikirim!</h3>
              <p className="text-sm text-[#2D241E]/80 max-w-md mx-auto leading-relaxed">
                Terima kasih telah mendaftarkan <strong>"{formData.name}"</strong> ke membuku. Permohonanmu masuk ke antrean verifikasi Master Admin. Kamu bisa memantau statusnya di panel admin.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-sm transition-all shadow-xs"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider border-b border-[#2D241E]/10 pb-1">
                  1. Informasi Dasar Komunitas
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                      Nama Komunitas *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Klub Baca Bandung"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                      Tagline Singkat *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ruang baca hening di taman kota"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                    Deskripsi Lengkap & Visi *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Jelaskan mengenai sejarah, kegiatan rutin, dan suasana membaca di komunitasmu..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-3 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>
              </div>

              {/* Location & Format */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider border-b border-[#2D241E]/10 pb-1">
                  2. Lokasi & Format Temu
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                      Kota Utama *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value as LocationType })}
                      className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3 py-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                      Format Komunitas *
                    </label>
                    <select
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value as CommunityFormat })}
                      className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3 py-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                    >
                      <option value="Offline">Offline (Tatap Muka)</option>
                      <option value="Online">Online (Daring / Zoom)</option>
                      <option value="Hybrid">Hybrid (Campuran)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                      Kecamatan / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Menteng / Coblong"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                      Jadwal Hari Kumpul Rutin *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Setiap Sabtu ke-2 & ke-4"
                      value={formData.scheduleDay}
                      onChange={(e) => setFormData({ ...formData, scheduleDay: e.target.value })}
                      className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                      Nama Tempat / Cafe / Platform *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Taman Suropati / Zoom Room"
                      value={formData.locationName}
                      onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                      className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>
                </div>
              </div>

              {/* Genres */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider border-b border-[#2D241E]/10 pb-1">
                  3. Genre Buku Fokus (Pilih Minimal 1)
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {GENRE_OPTIONS.map((g) => {
                    const isSelected = formData.genres.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleGenreToggle(g)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#5A5A40] text-white font-bold shadow-2xs'
                            : 'bg-[#F5F5F0] text-[#5A5A40] border border-[#5A5A40]/15 hover:bg-[#5A5A40]/10'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{g}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Socials & Contact Person */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider border-b border-[#2D241E]/10 pb-1">
                  4. Medsos & Kontak Penanggung Jawab
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                      Username Instagram Komunitas
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. bacadipark.jkt"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                      Link Grup WhatsApp / Kontak Admin
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. https://chat.whatsapp.com/..."
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                      Nama Penanggung Jawab *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama kamu / inisiator"
                      value={formData.contactPersonName}
                      onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                      className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                      No. WhatsApp Aktif (Untuk Verifikasi) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="081234567890"
                      value={formData.contactPersonPhone}
                      onChange={(e) => setFormData({ ...formData, contactPersonPhone: e.target.value })}
                      className="w-full bg-white border border-[#2D241E]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#2D241E]/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full bg-[#F5F5F0] hover:bg-gray-200 text-[#2D241E] text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Kirim Pendaftaran
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};

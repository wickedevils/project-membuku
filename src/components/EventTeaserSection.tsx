import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Ticket, CheckCircle, Search, Filter } from 'lucide-react';
import { EventItem, UserAccount } from '../types';

interface EventTeaserSectionProps {
  events: EventItem[];
  currentUser?: UserAccount | null;
  onRequireAuth?: (actionName: string) => void;
}

export const EventTeaserSection: React.FC<EventTeaserSectionProps> = ({ 
  events, 
  currentUser, 
  onRequireAuth 
}) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [rsvpDone, setRsvpDone] = useState(false);
  const [rsvpName, setRsvpName] = useState(currentUser?.name || '');
  const [rsvpPhone, setRsvpPhone] = useState('');

  const handleRsvpClick = (evt: EventItem) => {
    if (!currentUser && onRequireAuth) {
      onRequireAuth('mendaftar / RSVP event literasi');
      return;
    }
    setSelectedEvent(evt);
    setRsvpDone(false);
    if (currentUser) {
      setRsvpName(currentUser.name);
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpPhone) return;
    setRsvpDone(true);
  };

  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#5A5A40]" />
            Agenda & Event Literasi Mendatang
          </h2>
          <p className="text-xs text-[#2D241E]/70 mt-1">
            Temu komunitas, silent reading party, webinar, dan bedah buku yang diselenggarakan oleh klub buku terdaftar.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F5F0] border border-[#5A5A40]/20 text-[#5A5A40] text-xs font-bold shadow-2xs">
          <Ticket className="w-4 h-4 text-[#5A5A40]" />
          {events.length} Event Aktif
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="group bg-white rounded-3xl border border-[#2D241E]/10 hover:border-[#5A5A40]/50 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Event Cover Image */}
            <div className="relative h-44 overflow-hidden bg-[#F5F5F0]">
              <img
                src={evt.coverImage}
                alt={evt.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-white/90 text-[#5A5A40] text-[11px] font-bold rounded-full border border-[#2D241E]/10 backdrop-blur-md shadow-2xs">
                  {evt.format}
                </span>
                {evt.isFree && (
                  <span className="px-2.5 py-0.5 bg-[#5A5A40] text-white text-[11px] font-bold rounded-full shadow-2xs">
                    GRATIS
                  </span>
                )}
              </div>

              {/* Host Badge */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-white/90 p-2 rounded-2xl backdrop-blur-md border border-[#2D241E]/10 shadow-2xs">
                <img src={evt.communityLogo} alt={evt.communityName} className="w-6 h-6 rounded-md object-cover" />
                <span className="text-xs font-bold text-[#2D241E] truncate">{evt.communityName}</span>
              </div>
            </div>

            {/* Event Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-serif font-bold text-[#2D241E] group-hover:text-[#5A5A40] transition-colors line-clamp-2 leading-snug">
                  {evt.title}
                </h3>

                <div className="mt-3 space-y-1.5 text-xs text-[#2D241E]/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>

                <p className="text-[#2D241E]/70 text-xs mt-3 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              {/* Participant Bar & Action */}
              <div className="pt-3 border-t border-[#2D241E]/10 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#2D241E]/60">
                  <span className="flex items-center gap-1 font-semibold text-[#2D241E]">
                    <Users className="w-3.5 h-3.5 text-[#5A5A40]" />
                    {evt.currentParticipants} Terdaftar
                  </span>
                  {evt.maxParticipants && (
                    <span>Sisa kuota: {evt.maxParticipants - evt.currentParticipants} tempat</span>
                  )}
                </div>

                <button
                  onClick={() => handleRsvpClick(evt)}
                  className="w-full py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  Ikuti / RSVP Event
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* RSVP Modal */}
      {selectedEvent && (
        <div 
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FDFCF8] border border-[#2D241E]/10 rounded-3xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl relative text-[#2D241E] max-h-[92vh] overflow-y-auto scrollbar-thin my-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#2D241E]/10">
              <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">Pendaftaran Event</span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-3 py-1.5 rounded-full bg-[#2D241E] text-white hover:bg-[#5A5A40] text-xs font-bold transition-all flex items-center gap-1 shadow-md cursor-pointer"
                aria-label="Tutup Dialog RSVP"
              >
                <span>Tutup</span>
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2D241E]">{selectedEvent.title}</h3>
              <p className="text-xs text-[#2D241E]/60">Penyelenggara: {selectedEvent.communityName}</p>
            </div>

            {rsvpDone ? (
              <div className="p-5 bg-[#F9F7F2] border border-[#5A5A40]/30 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-[#5A5A40] mx-auto" />
                <h4 className="font-serif font-bold text-[#5A5A40]">RSVP Berhasil Terkonfirmasi!</h4>
                <p className="text-xs text-[#2D241E]/70">
                  Tiket dan pengingat event telah disimpan. Sampai jumpa di {selectedEvent.location}!
                </p>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="mt-2 px-5 py-2 bg-[#5A5A40] text-white text-xs font-bold rounded-full shadow-2xs"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div className="bg-[#F9F7F2] p-3 rounded-xl border border-[#2D241E]/10 text-xs space-y-1">
                  <div>📅 <strong>Waktu:</strong> {selectedEvent.date}, {selectedEvent.time}</div>
                  <div>📍 <strong>Lokasi:</strong> {selectedEvent.location}</div>
                  <div>🎟️ <strong>Biaya:</strong> {selectedEvent.isFree ? 'Gratis' : 'Tiket Masuk'}</div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Nama Lengkap Kamu *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Budi Rahardjo"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 081234567890"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold shadow-xs transition-all"
                >
                  Konfirmasi Pendaftaran Event
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

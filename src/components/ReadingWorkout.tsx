import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Flame, 
  Clock, 
  BookOpen, 
  Award, 
  Plus, 
  Share2, 
  Download, 
  Upload, 
  Image as ImageIcon, 
  Star, 
  Quote, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Zap, 
  Trash2, 
  Smartphone, 
  Layers, 
  Instagram, 
  User,
  Check
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { UserAccount } from '../types';

export interface ReadingWorkoutItem {
  id: string;
  userName: string;
  userHandle: string;
  userAvatar: string;
  date: string;
  durationSeconds: number; // in seconds
  bookTitle: string;
  bookAuthor: string;
  bookCoverUrl: string;
  pagesRead: number;
  rating: number;
  keyTakeaway: string;
  createdAt: string;
}

const INITIAL_SAMPLE_WORKOUTS: ReadingWorkoutItem[] = [
  {
    id: 'wk-1',
    userName: 'Annisa Rahma',
    userHandle: '@annisa.reads',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    date: 'Hari ini • 14:20 WIB',
    durationSeconds: 2718, // 45m 18s
    bookTitle: 'Laut Bercerita',
    bookAuthor: 'Leila S. Chudori',
    bookCoverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&auto=format&fit=crop&q=80',
    pagesRead: 42,
    rating: 5,
    keyTakeaway: 'Sesi fokus tanpa distraksi HP. Bab tentang masa penahanan terasa sangat menyayat hati tapi indah secara prosa.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'wk-2',
    userName: 'Budi Santoso',
    userHandle: '@budi.reads',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    date: 'Kemarin • 20:00 WIB',
    durationSeconds: 3600, // 1 jam
    bookTitle: 'Atomic Habits',
    bookAuthor: 'James Clear',
    bookCoverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&auto=format&fit=crop&q=80',
    pagesRead: 35,
    rating: 5,
    keyTakeaway: 'Focus on 1% improvement every day. Sistem jauh lebih penting daripada goal semata.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

interface ReadingWorkoutProps {
  currentUser?: UserAccount | null;
  onRequireAuth?: (actionName: string) => void;
}

export const ReadingWorkout: React.FC<ReadingWorkoutProps> = ({
  currentUser,
  onRequireAuth,
}) => {
  // Workout history list stored in localStorage
  const [workouts, setWorkouts] = useState<ReadingWorkoutItem[]>(() => {
    try {
      const saved = localStorage.getItem('membuku_reading_workouts');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load workouts from localStorage', e);
    }
    return INITIAL_SAMPLE_WORKOUTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('membuku_reading_workouts', JSON.stringify(workouts));
    } catch (e) {
      console.error('Failed to save workouts', e);
    }
  }, [workouts]);

  // LIVE STOPWATCH TIMER STATE
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Interval reference
  useEffect(() => {
    let interval: any = null;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  // TIMER CONTROLS
  const handleStartTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePauseTimer = () => {
    setIsPaused(true);
  };

  const handleResumeTimer = () => {
    setIsPaused(false);
  };

  const handleResetTimer = () => {
    if (seconds > 0) {
      if (confirm('Apakah kamu yakin ingin mengulang timernya dari nol?')) {
        setIsRunning(false);
        setIsPaused(false);
        setSeconds(0);
      }
    }
  };

  // STOP TIMER & OPEN FINISH MODAL
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  const handleStopAndLog = () => {
    if (seconds < 10) {
      alert('Sesi membaca masih terlalu singkat (minimal 10 detik) untuk dicatat!');
      return;
    }
    setIsPaused(true);
    setIsFinishModalOpen(true);
  };

  // FORM STATE FOR FINISH SESSION MODAL
  const [bookTitle, setBookTitle] = useState('Laut Bercerita');
  const [bookAuthor, setBookAuthor] = useState('Leila S. Chudori');
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&auto=format&fit=crop&q=80');
  const [pagesRead, setPagesRead] = useState<number>(35);
  const [rating, setRating] = useState<number>(5);
  const [keyTakeaway, setKeyTakeaway] = useState('Sesi membaca yang sangat mengesankan dan penuh perenungan.');

  // Handle Cover Photo Upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, atau WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCoverUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // SAVE NEW WORKOUT
  const handleSaveWorkout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookTitle.trim()) {
      alert('Mohon isi judul buku yang dibaca!');
      return;
    }

    const activeUser = currentUser || {
      name: 'Annisa Rahma',
      email: 'annisa@membuku.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    };

    const newWorkout: ReadingWorkoutItem = {
      id: `wk-${Date.now()}`,
      userName: activeUser.name,
      userHandle: `@${activeUser.name.toLowerCase().replace(/\s+/g, '')}`,
      userAvatar: activeUser.avatarUrl,
      date: 'Hari ini • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      durationSeconds: seconds,
      bookTitle: bookTitle.trim(),
      bookAuthor: bookAuthor.trim() || 'Penulis',
      bookCoverUrl: coverUrl,
      pagesRead: Number(pagesRead) || 1,
      rating: rating,
      keyTakeaway: keyTakeaway.trim(),
      createdAt: new Date().toISOString(),
    };

    setWorkouts((prev) => [newWorkout, ...prev]);

    // Reset Stopwatch
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(0);
    setIsFinishModalOpen(false);

    alert('🎉 Sesi Reading Workout berhasil disimpan!');
  };

  // DELETE WORKOUT ENTRY
  const handleDeleteWorkout = (id: string) => {
    if (confirm('Hapus log sesi membaca ini?')) {
      setWorkouts((prev) => prev.filter((w) => w.id !== id));
    }
  };

  // FORMAT TIME HELPERS
  const formatTimeHMS = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    if (hrs > 0) {
      return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  };

  const formatDurationText = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    if (hrs > 0) {
      return `${hrs}j ${mins}m ${secs}d`;
    }
    if (mins > 0) {
      return `${mins}m ${secs}d`;
    }
    return `${secs}d`;
  };

  // STATS CALCULATIONS
  const totalSecondsAll = workouts.reduce((acc, curr) => acc + curr.durationSeconds, 0);
  const totalHoursFormatted = (totalSecondsAll / 3600).toFixed(1);
  const totalPagesAll = workouts.reduce((acc, curr) => acc + curr.pagesRead, 0);
  const totalSessions = workouts.length;
  const avgSpeedPace = totalSecondsAll > 0 && totalPagesAll > 0 
    ? (totalPagesAll / (totalSecondsAll / 60)).toFixed(1) 
    : '0';

  // SHARE MODAL STATE
  const [selectedWorkoutForShare, setSelectedWorkoutForShare] = useState<ReadingWorkoutItem | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '4:5'>('9:16');
  const [downloadingShare, setDownloadingShare] = useState(false);
  const cardExportRef = useRef<HTMLDivElement>(null);

  const handleDownloadShareCard = async () => {
    if (!cardExportRef.current) return;
    setDownloadingShare(true);
    try {
      const dataUrl = await toPng(cardExportRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `reading_workout_${aspectRatio.replace(':', 'x')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export card', err);
      alert('Gagal mengekspor kartu. Silakan coba lagi.');
    } finally {
      setDownloadingShare(false);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* HEADER TITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2D241E]/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-2">
            <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
            Reading Workout • Strava Mode for Readers
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] flex items-center gap-2">
            Lacak & Catat Sesi Membacamu
          </h2>
          <p className="text-xs text-[#2D241E]/70 mt-1">
            Hitung waktu baca secara realtime dengan timer, catat halaman & quote, lalu bagikan statistik ala Strava!
          </p>
        </div>

        {/* Quick Start Timer button scroll */}
        <button
          onClick={() => {
            const timerEl = document.getElementById('workout-timer-box');
            if (timerEl) timerEl.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md flex items-center gap-2 shrink-0 transition-all cursor-pointer active:scale-95"
        >
          <Play className="w-4 h-4 fill-white" />
          Mulai Timer Membaca
        </button>
      </div>

      {/* OVERVIEW STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-4 bg-white border border-[#2D241E]/10 rounded-2xl shadow-2xs space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#2D241E]/60 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-orange-600" />
            Total Waktu Membaca
          </div>
          <div className="text-2xl font-serif font-bold text-[#2D241E]">
            {totalHoursFormatted} <span className="text-xs font-sans font-semibold text-[#2D241E]/60">Jam</span>
          </div>
          <div className="text-[10px] text-[#2D241E]/60">dari {totalSessions} sesi terdistribusi</div>
        </div>

        <div className="p-4 bg-white border border-[#2D241E]/10 rounded-2xl shadow-2xs space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#2D241E]/60 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Total Halaman
          </div>
          <div className="text-2xl font-serif font-bold text-[#2D241E]">
            {totalPagesAll} <span className="text-xs font-sans font-semibold text-[#2D241E]/60">Hlm</span>
          </div>
          <div className="text-[10px] text-[#2D241E]/60">terbaca dengan fokus</div>
        </div>

        <div className="p-4 bg-white border border-[#2D241E]/10 rounded-2xl shadow-2xs space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#2D241E]/60 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
            Current Streak
          </div>
          <div className="text-2xl font-serif font-bold text-[#2D241E]">
            {workouts.length > 0 ? `${workouts.length} Hari` : '0 Hari'}
          </div>
          <div className="text-[10px] text-[#2D241E]/60">beruntun konsisten baca</div>
        </div>

        <div className="p-4 bg-white border border-[#2D241E]/10 rounded-2xl shadow-2xs space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#2D241E]/60 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-600" />
            Rata-rata Pace
          </div>
          <div className="text-2xl font-serif font-bold text-[#2D241E]">
            {avgSpeedPace} <span className="text-xs font-sans font-semibold text-[#2D241E]/60">hlm/mnt</span>
          </div>
          <div className="text-[10px] text-[#2D241E]/60">kecepatan rata-rata</div>
        </div>

      </div>


      {/* LIVE STOPWATCH TIMER CONTROL CARD */}
      <div 
        id="workout-timer-box" 
        className={`p-6 md:p-8 rounded-3xl border-2 transition-all shadow-xl text-center space-y-6 ${
          isRunning && !isPaused
            ? 'bg-gradient-to-b from-orange-500 via-orange-600 to-amber-700 text-white border-orange-400 shadow-orange-500/20'
            : isPaused
            ? 'bg-gradient-to-b from-stone-800 to-stone-900 text-white border-stone-700'
            : 'bg-white border-[#5A5A40]/30 text-[#2D241E]'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isRunning && !isPaused ? 'bg-white animate-ping' : 'bg-stone-400'}`} />
            <span className="text-xs font-bold uppercase tracking-wider opacity-90">
              {isRunning && !isPaused ? '🔥 Sesi Membaca Sedang Berjalan' : isPaused ? '⏸️ Sesi Dijeda' : '⏱️ Timer Sesi Membaca'}
            </span>
          </div>

          {seconds > 0 && (
            <button
              onClick={handleResetTimer}
              className={`text-xs font-bold underline flex items-center gap-1 cursor-pointer opacity-80 hover:opacity-100 ${
                isRunning || isPaused ? 'text-white' : 'text-[#2D241E]'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>

        {/* TIME DISPLAY COUNTER */}
        <div className="py-2">
          <div className="text-5xl sm:text-7xl font-mono font-bold tracking-tight drop-shadow-sm">
            {formatTimeHMS(seconds)}
          </div>
          <p className="text-xs opacity-80 mt-2">
            {isRunning && !isPaused
              ? 'Fokus membaca buku favoritmu. Biarkan waktu terus berjalan...'
              : isPaused
              ? 'Sesi membaca sedang diistirahatkan.'
              : 'Klik tombol "Mulai Membaca" untuk memulai penghitungan waktu sesi hari ini.'}
          </p>
        </div>

        {/* TIMER ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {!isRunning ? (
            <button
              onClick={handleStartTimer}
              className="px-8 py-3.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              Mulai Membaca Sekarang
            </button>
          ) : (
            <>
              {isPaused ? (
                <button
                  onClick={handleResumeTimer}
                  className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Lanjutkan Sesi
                </button>
              ) : (
                <button
                  onClick={handlePauseTimer}
                  className="px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Pause className="w-4 h-4 fill-white" />
                  Jeda Sementara
                </button>
              )}

              <button
                onClick={handleStopAndLog}
                className="px-7 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Square className="w-4 h-4 fill-white" />
                Selesai & Catat Sesi
              </button>
            </>
          )}
        </div>

      </div>


      {/* STRAVA ACTIVITY FEED LIST */}
      <div className="space-y-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-[#2D241E]/10">
          <h3 className="text-xl font-serif font-bold text-[#2D241E] flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-600" />
            Aktivitas Reading Workout Terbaru ({workouts.length})
          </h3>

          <span className="text-xs text-[#2D241E]/60 font-medium">
            Jelajahi & Bagikan Catatan Sesi
          </span>
        </div>

        {workouts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#2D241E]/10 space-y-3">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto" />
            <h4 className="text-base font-bold text-[#2D241E]">Belum Ada Log Sesi Membaca</h4>
            <p className="text-xs text-[#2D241E]/60 max-w-sm mx-auto">
              Mulai timer di atas saat kamu sedang membaca, lalu simpan catatannya untuk melihat riwayat aktivitasmu di sini.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {workouts.map((item) => {
              const minsRead = Math.max(1, Math.round(item.durationSeconds / 60));
              const pace = (item.pagesRead / minsRead).toFixed(1);

              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-3xl border border-[#2D241E]/10 p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all space-y-4 relative"
                >
                  {/* Item User Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.userAvatar} 
                        alt={item.userName} 
                        className="w-10 h-10 rounded-full object-cover border border-[#2D241E]/10 shadow-2xs" 
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#2D241E]">{item.userName}</span>
                          <span className="text-xs text-[#2D241E]/50 font-mono">{item.userHandle}</span>
                        </div>
                        <div className="text-[10px] text-[#2D241E]/60 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-[#5A5A40]" />
                          {item.date}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedWorkoutForShare(item)}
                        className="px-3.5 py-1.5 rounded-full bg-orange-100 hover:bg-orange-600 hover:text-white text-orange-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Export Card</span>
                      </button>

                      <button
                        onClick={() => handleDeleteWorkout(item.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Hapus Log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Content Body */}
                  <div className="bg-[#FDFCF8] p-4 rounded-2xl border border-[#2D241E]/10 flex flex-col sm:flex-row gap-4 items-start">
                    <img
                      src={item.bookCoverUrl}
                      alt={item.bookTitle}
                      className="w-16 h-24 object-cover rounded-xl border border-[#2D241E]/15 shadow-2xs shrink-0 bg-stone-100"
                    />

                    <div className="flex-1 space-y-3 w-full">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                          Reading Session
                        </span>
                        <h4 className="text-base font-serif font-bold text-[#2D241E] mt-1">
                          {item.bookTitle}
                        </h4>
                        <p className="text-xs text-[#2D241E]/70 font-medium">
                          oleh {item.bookAuthor}
                        </p>
                      </div>

                      {/* Strava Badges Grid */}
                      <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-xl border border-[#2D241E]/10 text-center">
                        <div>
                          <div className="text-[9px] font-bold text-[#2D241E]/50 uppercase">Durasi</div>
                          <div className="text-xs font-bold text-[#2D241E] flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3 text-orange-600" />
                            {formatDurationText(item.durationSeconds)}
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] font-bold text-[#2D241E]/50 uppercase">Halaman</div>
                          <div className="text-xs font-bold text-[#2D241E] flex items-center justify-center gap-1">
                            <BookOpen className="w-3 h-3 text-emerald-600" />
                            {item.pagesRead} hlm
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] font-bold text-[#2D241E]/50 uppercase">Pace</div>
                          <div className="text-xs font-bold text-[#2D241E] flex items-center justify-center gap-1">
                            <Zap className="w-3 h-3 text-blue-600" />
                            {pace} hlm/m
                          </div>
                        </div>
                      </div>

                      {/* Key Takeaway Quote */}
                      {item.keyTakeaway && (
                        <div className="bg-[#F5F5F0] p-3 rounded-xl border border-[#5A5A40]/20 text-xs text-[#2D241E]/80 italic relative">
                          <Quote className="w-3.5 h-3.5 text-[#5A5A40]/30 absolute top-2 left-2" />
                          <p className="pl-4 leading-relaxed">
                            "{item.keyTakeaway}"
                          </p>
                        </div>
                      )}

                      {/* Star Rating */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-[10px] font-bold text-[#2D241E]/60 uppercase">Rating Sesi:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= item.rating
                                  ? 'text-amber-500 fill-amber-400'
                                  : 'text-stone-300 fill-stone-100'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>


      {/* MODAL: FINISH SESSION FORM (when stop is clicked) */}
      {isFinishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 border border-[#2D241E]/15 shadow-2xl my-8">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#2D241E]/10">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2D241E] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Selesai Sesi Reading Workout
                </h3>
                <p className="text-xs text-[#2D241E]/70">
                  Durasi Tercatat: <strong className="text-orange-600 font-mono text-sm">{formatTimeHMS(seconds)}</strong> ({formatDurationText(seconds)})
                </p>
              </div>

              <button
                onClick={() => setIsFinishModalOpen(false)}
                className="p-1 text-stone-400 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveWorkout} className="space-y-4 text-left">
              
              {/* Book Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Judul Buku *</label>
                  <input
                    type="text"
                    required
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="e.g. Laut Bercerita"
                    className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Penulis Buku</label>
                  <input
                    type="text"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                    placeholder="e.g. Leila S. Chudori"
                    className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                  />
                </div>
              </div>

              {/* Pages Read */}
              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                  Jumlah Halaman Dibaca Sesi Ini *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={pagesRead}
                  onChange={(e) => setPagesRead(Number(e.target.value))}
                  className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              {/* Upload Foto Cover Buku */}
              <div className="p-3 bg-[#F9F7F2] rounded-2xl border border-[#5A5A40]/20 space-y-2">
                <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#5A5A40]" />
                  Upload Foto Cover Buku (Opsional)
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={coverUrl}
                    alt="Cover Preview"
                    className="w-12 h-16 object-cover rounded-lg border border-[#2D241E]/15 shadow-2xs shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      id="workout-cover-upload"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="workout-cover-upload"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#2D241E]/20 text-xs font-bold text-[#2D241E] hover:bg-stone-100 cursor-pointer shadow-2xs"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#5A5A40]" />
                      Pilih Foto Buku
                    </label>
                    <p className="text-[10px] text-[#2D241E]/60 italic">
                      🔒 Foto tidak disimpan di server. Hanya diproses di browser Anda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Takeaways / Quotes */}
              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                  Key Takeaway / Kutipan Favorit Sesi Ini
                </label>
                <textarea
                  rows={2}
                  value={keyTakeaway}
                  onChange={(e) => setKeyTakeaway(e.target.value)}
                  placeholder="Poin penting atau quotes membekas dari bab yang dibaca..."
                  className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl p-3 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">
                  Impresi / Rating Sesi Membaca
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-amber-500 fill-amber-400'
                            : 'text-stone-300 fill-stone-100'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#5A5A40] ml-2">{rating} / 5</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFinishModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#2D241E]/20 text-xs font-bold text-[#2D241E]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                >
                  Simpan Ke Workout Feed
                </button>
              </div>

            </form>

          </div>
        </div>
      )}


      {/* MODAL: SHARE STRAVA-STYLE CARD EXPORT */}
      {selectedWorkoutForShare && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-6 border border-[#2D241E]/15 shadow-2xl my-8">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#2D241E]/10">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-orange-600" />
                <h3 className="text-base font-serif font-bold text-[#2D241E]">
                  Export Strava Reading Workout Card
                </h3>
              </div>

              <button
                onClick={() => setSelectedWorkoutForShare(null)}
                className="p-1 text-stone-400 hover:text-black font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Resolution Selector */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  aspectRatio === '9:16'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-[#F5F5F0] text-[#2D241E]/70 hover:bg-stone-200'
                }`}
              >
                📱 9:16 (IG Story)
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('4:5')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  aspectRatio === '4:5'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-[#F5F5F0] text-[#2D241E]/70 hover:bg-stone-200'
                }`}
              >
                🖼️ 4:5 (IG Feed)
              </button>
            </div>

            {/* CANVAS CONTAINER TO BE EXPORTED */}
            <div className="flex justify-center overflow-x-auto py-2">
              <div
                ref={cardExportRef}
                style={{
                  width: aspectRatio === '9:16' ? '330px' : '350px',
                  height: aspectRatio === '9:16' ? '580px' : '440px',
                }}
                className="bg-gradient-to-br from-stone-900 via-stone-900 to-orange-950 text-white p-5 rounded-none border-4 border-orange-500/50 shadow-2xl flex flex-col justify-between relative overflow-hidden shrink-0"
              >
                {/* Strava Orange Accent Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-orange-600 text-white font-bold flex items-center justify-center rounded-none shadow-xs">
                      <Flame className="w-4 h-4 fill-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-orange-400 uppercase leading-none">
                        membuku.com
                      </div>
                      <div className="text-[8px] text-white/60">Reading Workout</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-bold text-white">{selectedWorkoutForShare.userName}</div>
                    <div className="text-[8px] text-orange-400 font-mono">{selectedWorkoutForShare.userHandle}</div>
                  </div>
                </div>

                {/* BIG METRICS GRID (STRAVA STYLE) */}
                <div className="my-auto space-y-3">
                  
                  <div className="bg-white/10 p-3 rounded-none border border-white/15 space-y-2">
                    <div className="text-[9px] font-bold tracking-widest text-orange-400 uppercase">
                      READING WORKOUT STATS
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-[8px] font-bold text-white/60 uppercase">Waktu</div>
                        <div className="text-base font-mono font-bold text-white">
                          {formatDurationText(selectedWorkoutForShare.durationSeconds)}
                        </div>
                      </div>

                      <div>
                        <div className="text-[8px] font-bold text-white/60 uppercase">Halaman</div>
                        <div className="text-base font-mono font-bold text-white">
                          {selectedWorkoutForShare.pagesRead} hlm
                        </div>
                      </div>

                      <div>
                        <div className="text-[8px] font-bold text-white/60 uppercase">Pace</div>
                        <div className="text-base font-mono font-bold text-white">
                          {(selectedWorkoutForShare.pagesRead / Math.max(1, Math.round(selectedWorkoutForShare.durationSeconds / 60))).toFixed(1)} hlm/m
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Book Info Box */}
                  <div className="bg-white/5 p-3 rounded-none border border-white/10 flex items-center gap-3">
                    <img
                      src={selectedWorkoutForShare.bookCoverUrl}
                      alt={selectedWorkoutForShare.bookTitle}
                      className="w-12 h-18 object-cover border border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {selectedWorkoutForShare.bookTitle}
                      </h4>
                      <p className="text-[10px] text-white/70 truncate">
                        {selectedWorkoutForShare.bookAuthor}
                      </p>
                      
                      <div className="flex items-center gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= selectedWorkoutForShare.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-stone-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Key Takeaway Quote */}
                  {selectedWorkoutForShare.keyTakeaway && (
                    <div className="bg-white/10 p-2.5 rounded-none border border-orange-500/30 text-center">
                      <p className="text-[10px] italic text-white/90 line-clamp-2">
                        "{selectedWorkoutForShare.keyTakeaway}"
                      </p>
                    </div>
                  )}

                </div>

                {/* Footer Watermark */}
                <div className="pt-2 border-t border-white/10 text-center">
                  <span className="text-[8px] font-mono text-white/50 tracking-wider">
                    Lacak sesi membacamu di membuku.com
                  </span>
                </div>

              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadShareCard}
                disabled={downloadingShare}
                className="px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Gambar PNG</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

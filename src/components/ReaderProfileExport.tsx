import React, { useRef, useState } from 'react';
import { 
  User, 
  BookOpen, 
  Sparkles, 
  Download, 
  Instagram, 
  Quote, 
  Share2, 
  Star,
  Upload,
  Image as ImageIcon,
  Clock,
  CheckCircle2,
  RotateCcw,
  Smartphone,
  Layers,
  FileText
} from 'lucide-react';
import { toPng } from 'html-to-image';

export const ReaderProfileExport: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);

  // Resolution Mode: '9:16' (IG Story) vs '4:5' (IG Feed)
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '4:5'>('9:16');

  // User Profile State
  const [userName, setUserName] = useState('Annisa Rahma');
  const [userHandle, setUserHandle] = useState('@annisa.reads');

  // Book & Reading Details
  const [bookTitle, setBookTitle] = useState('Laut Bercerita');
  const [bookAuthor, setBookAuthor] = useState('Leila S. Chudori');
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&auto=format&fit=crop&q=80');
  
  // Progress & Pages
  const [pagesRead, setPagesRead] = useState(184);
  const [totalPages, setTotalPages] = useState(380);

  // Duration
  const [durationValue, setDurationValue] = useState(3);
  const [durationUnit, setDurationUnit] = useState<'Hari' | 'Jam' | 'Minggu'>('Hari');

  // Rating & Quote
  const [rating, setRating] = useState(5);
  const [keyTakeaway, setKeyTakeaway] = useState(
    'Kebenaran dan ingatan tidak pernah bisa ditenggelamkan, betapapun dalamnya samudera menyembunyikannya.'
  );

  // Calculated Progress Percentage
  const progressPercent = Math.min(100, Math.max(0, Math.round((pagesRead / (totalPages || 1)) * 100)));

  // Rating label based on reading progress (100% vs under 100%)
  const ratingLabel = (pagesRead >= totalPages && totalPages > 0)
    ? 'Rating Buku'
    : 'Rating Buku Sejauh Ini';

  // Formatted Card Title e.g. "Annisa's Current Read"
  const formattedCardTitle = userName.trim()
    ? (userName.trim().endsWith('s') || userName.trim().endsWith('S')
        ? `${userName.trim()}' Current Read`
        : `${userName.trim()}'s Current Read`)
    : "My Current Read";

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

  // Reset to default sample cover
  const handleResetCover = () => {
    setCoverUrl('https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&auto=format&fit=crop&q=80');
  };

  // Generate Data URL PNG
  const generatePngDataUrl = async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    return await toPng(cardRef.current, {
      cacheBust: true,
      quality: 0.98,
      pixelRatio: 2, // High DPI resolution for crisp export
    });
  };

  // Download PNG Image
  const handleDownloadImage = async () => {
    setDownloading(true);
    setShareNotice(null);
    try {
      const dataUrl = await generatePngDataUrl();
      if (!dataUrl) return;

      const link = document.createElement('a');
      const filename = `${userName.toLowerCase().replace(/\s+/g, '_')}_current_read_${aspectRatio.replace(':', 'x')}.png`;
      link.download = filename;
      link.href = dataUrl;
      link.click();

      setShareNotice(`✅ Gambar (${aspectRatio}) berhasil diunduh! Siap diunggah ke Instagram.`);
    } catch (err) {
      console.error('Failed to download image:', err);
      alert('Gagal mengunduh gambar. Silakan coba lagi.');
    } finally {
      setDownloading(false);
    }
  };

  // Share directly to Instagram Story / Web Share API
  const handleShareToIGStory = async () => {
    setSharing(true);
    setShareNotice(null);

    try {
      const dataUrl = await generatePngDataUrl();
      if (!dataUrl) return;

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const filename = `${userName.toLowerCase().replace(/\s+/g, '_')}_current_read.png`;
      const file = new File([blob], filename, { type: 'image/png' });

      // Check if Web Share API with files is supported
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: formattedCardTitle,
          text: `Sedang membaca "${bookTitle}" oleh ${bookAuthor} • #membuku`,
        });
        setShareNotice('🎉 Berhasil dibagikan melalui menu bagikan perangkat Anda!');
      } else {
        // Fallback: auto download file + show instruction
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
        
        setShareNotice('📥 File gambar telah diunduh ke galeri HP/Laptop. Buka aplikasi Instagram & pilih file dari galeri untuk dipost ke Story!');
      }
    } catch (err) {
      // User cancelled share or failed
      if ((err as Error).name !== 'AbortError') {
        console.error('Failed to share:', err);
      }
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2D241E]/10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-[#5A5A40]" />
            Share Current Read Generator
          </h2>
          <p className="text-xs text-[#2D241E]/70 mt-1">
            Buat kartu progress membaca estetis siap-share ke Instagram Story (9:16) & Feed (4:5).
          </p>
        </div>

        {/* Action Buttons Top */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleDownloadImage}
            disabled={downloading || sharing}
            className="px-4 py-2.5 rounded-full bg-[#F5F5F0] hover:bg-[#2D241E] hover:text-white text-[#2D241E] font-bold text-xs border border-[#2D241E]/15 flex items-center gap-2 transition-all shadow-2xs active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {downloading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Unduh PNG
          </button>

          <button
            onClick={handleShareToIGStory}
            disabled={downloading || sharing}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {sharing ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Instagram className="w-4 h-4" />
            )}
            <span>Share Langsung ke IG Story</span>
          </button>
        </div>
      </div>

      {/* Notice Banner */}
      {shareNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold flex items-start justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{shareNotice}</span>
          </div>
          <button onClick={() => setShareNotice(null)} className="text-emerald-800 hover:text-black font-bold">
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: EDITOR CONTROLS */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* 1. Resolution Switcher */}
          <div className="bg-white border border-[#2D241E]/10 rounded-3xl p-5 space-y-3 shadow-2xs">
            <label className="block text-xs font-serif font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#5A5A40]" />
              1. Pilih Ukuran Resolusi
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                  aspectRatio === '9:16'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-2xs'
                    : 'bg-[#FDFCF8] text-[#2D241E] border-[#2D241E]/15 hover:border-[#5A5A40]'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${aspectRatio === '9:16' ? 'bg-white/20' : 'bg-[#5A5A40]/10 text-[#5A5A40]'}`}>
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">9:16 (Story)</div>
                  <div className={`text-[10px] ${aspectRatio === '9:16' ? 'text-white/80' : 'text-[#2D241E]/60'}`}>
                    1080 × 1920 px (IG Story & Status)
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAspectRatio('4:5')}
                className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                  aspectRatio === '4:5'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-2xs'
                    : 'bg-[#FDFCF8] text-[#2D241E] border-[#2D241E]/15 hover:border-[#5A5A40]'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${aspectRatio === '4:5' ? 'bg-white/20' : 'bg-[#5A5A40]/10 text-[#5A5A40]'}`}>
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold">4:5 (Feed)</div>
                  <div className={`text-[10px] ${aspectRatio === '4:5' ? 'text-white/80' : 'text-[#2D241E]/60'}`}>
                    1080 × 1350 px (Instagram Feed)
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Reader Profile Details */}
          <div className="bg-white border border-[#2D241E]/10 rounded-3xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-xs font-serif font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#5A5A40]" />
              2. Identitas Pembaca
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Nama Pembaca *</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Annisa"
                  className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Username Instagram / Handle</label>
                <input
                  type="text"
                  value={userHandle}
                  onChange={(e) => setUserHandle(e.target.value)}
                  placeholder="e.g. @annisa.reads"
                  className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>
            </div>
          </div>

          {/* 3. Book Details & Cover Upload */}
          <div className="bg-white border border-[#2D241E]/10 rounded-3xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-xs font-serif font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#5A5A40]" />
              3. Detail Buku & Cover
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Judul Buku *</label>
                <input
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Penulis *</label>
                <input
                  type="text"
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                  className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>
            </div>

            {/* Custom Cover Upload Box */}
            <div className="p-3.5 bg-[#F9F7F2] rounded-2xl border border-[#5A5A40]/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#5A5A40]" />
                  Upload Foto Cover Buku
                </label>
                <button
                  type="button"
                  onClick={handleResetCover}
                  className="text-[10px] font-bold text-[#5A5A40] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Sample
                </button>
              </div>

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
                    id="cover-file-input"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="cover-file-input"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#2D241E]/20 text-xs font-bold text-[#2D241E] hover:bg-stone-100 cursor-pointer shadow-2xs transition-all"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#5A5A40]" />
                    Pilih Gambar dari Perangkat
                  </label>
                  <p className="text-[10px] text-[#2D241E]/60 italic">
                    🔒 Foto tidak disimpan di server. Hanya diproses lokal di HP/Browser Anda untuk ekspor gambar.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* 4. Progress, Pages & Duration */}
          <div className="bg-white border border-[#2D241E]/10 rounded-3xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-xs font-serif font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#5A5A40]" />
              4. Progress, Halaman & Durasi Membaca
            </h3>

            {/* Pages Input */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Halaman Dibaca</label>
                <input
                  type="number"
                  min="0"
                  value={pagesRead}
                  onChange={(e) => setPagesRead(Number(e.target.value))}
                  className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Total Halaman Buku</label>
                <input
                  type="number"
                  min="1"
                  value={totalPages}
                  onChange={(e) => setTotalPages(Number(e.target.value))}
                  className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>
            </div>

            {/* Slider Percentage Display */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#2D241E]/70 mb-1">
                <span>Progress Membaca ({pagesRead} / {totalPages} hlm)</span>
                <span className="text-[#5A5A40] font-bold">{progressPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max={totalPages || 100}
                value={pagesRead}
                onChange={(e) => setPagesRead(Number(e.target.value))}
                className="w-full accent-[#5A5A40] cursor-pointer"
              />
            </div>

            {/* Duration Input */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#2D241E]/10">
              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Durasi / Lama Membaca</label>
                <input
                  type="number"
                  min="1"
                  value={durationValue}
                  onChange={(e) => setDurationValue(Number(e.target.value))}
                  className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Satuan Waktu</label>
                <select
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value as any)}
                  className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40] cursor-pointer"
                >
                  <option value="Hari">Hari</option>
                  <option value="Jam">Jam</option>
                  <option value="Minggu">Minggu</option>
                </select>
              </div>
            </div>

          </div>

          {/* 5. Key Takeaways & Star Rating */}
          <div className="bg-white border border-[#2D241E]/10 rounded-3xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-xs font-serif font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              5. Rating & Key Takeaway
            </h3>

            {/* Star Rating Picker */}
            <div>
              <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1.5">Rating Buku (1 - 5 Bintang)</label>
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
                <span className="text-xs font-bold text-[#5A5A40] ml-2">{rating} / 5 Bintang</span>
              </div>
            </div>

            {/* Key Takeaway Quote */}
            <div>
              <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Key Takeaway / Kutipan Membekas</label>
              <textarea
                rows={2}
                value={keyTakeaway}
                onChange={(e) => setKeyTakeaway(e.target.value)}
                placeholder="Tuliskan impresi atau kutipan favorit dari buku ini..."
                className="w-full bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl p-3 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
              />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: LIVE CANVAS PREVIEW */}
        <div className="lg:col-span-6 flex flex-col items-center w-full sticky top-6">
          
          <div className="flex items-center justify-between w-full max-w-[380px] mb-3 px-2">
            <div className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5">
              <Instagram className="w-4 h-4 text-pink-600" /> 
              Pratinjau Kartu ({aspectRatio})
            </div>

            {/* Toggle Aspect Pill */}
            <div className="flex items-center gap-1 bg-[#F5F5F0] p-1 rounded-full border border-[#2D241E]/10 text-[10px] font-bold">
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                  aspectRatio === '9:16' ? 'bg-[#5A5A40] text-white shadow-2xs' : 'text-[#2D241E]/60'
                }`}
              >
                9:16
              </button>
              <button
                onClick={() => setAspectRatio('4:5')}
                className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                  aspectRatio === '4:5' ? 'bg-[#5A5A40] text-white shadow-2xs' : 'text-[#2D241E]/60'
                }`}
              >
                4:5
              </button>
            </div>
          </div>

          {/* CANVAS CONTAINER TO BE CAPTURED BY HTML-TO-IMAGE */}
          <div className="w-full flex justify-center py-2 overflow-x-auto">
            <div
              ref={cardRef}
              style={{
                width: aspectRatio === '9:16' ? '340px' : '360px',
                height: aspectRatio === '9:16' ? '604px' : '450px',
              }}
              className="bg-gradient-to-br from-[#FDFCF8] via-[#F9F7F2] to-[#F5F5F0] rounded-none p-5 sm:p-6 border-4 border-[#5A5A40]/30 shadow-2xl flex flex-col justify-between text-[#2D241E] relative overflow-hidden shrink-0 transition-all duration-300"
            >
              {/* Decorative background glow elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#5A5A40]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5A5A40]/10 rounded-full blur-2xl pointer-events-none" />

              {/* CARD HEADER: Brand & Custom Title */}
              <div className="relative z-10 flex items-center justify-between border-b border-[#2D241E]/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-none bg-[#5A5A40] flex items-center justify-center text-white font-bold shadow-xs">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-serif font-bold tracking-wider text-[#5A5A40] uppercase leading-none">
                      membuku
                    </div>
                    <div className="text-[8px] text-[#2D241E]/60 leading-tight">Reading Tracker</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-bold text-[#5A5A40] font-mono">{userHandle || '@membuku.user'}</div>
                </div>
              </div>

              {/* MAIN CONTENT BODY */}
              <div className="relative z-10 my-auto space-y-3">
                
                {/* Title Header above main box */}
                <div className="text-center pb-0.5">
                  <h3 className="text-xs sm:text-sm font-serif font-bold text-[#2D241E] uppercase tracking-wider">
                    {formattedCardTitle}
                  </h3>
                </div>

                {/* Book Card Section (Main Box) */}
                <div className="bg-white p-3.5 sm:p-4 rounded-none border border-[#5A5A40]/30 shadow-2xs space-y-3">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#5A5A40] flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#5A5A40]" /> CURRENT READ
                    </span>
                    
                    <span className="text-[10px] font-bold text-[#2D241E]/70 bg-[#F5F5F0] px-2 py-0.5 rounded-none border border-[#2D241E]/10">
                      ⏱️ {durationValue} {durationUnit}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <img
                      src={coverUrl}
                      alt={bookTitle}
                      className="w-16 h-22 object-cover rounded-none shadow-xs border border-[#2D241E]/15 shrink-0 bg-stone-100"
                    />
                    
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-sm font-serif font-bold text-[#2D241E] line-clamp-2 leading-snug">
                        {bookTitle || 'Judul Buku'}
                      </h4>
                      <p className="text-xs text-[#2D241E]/70 truncate font-medium">
                        {bookAuthor || 'Nama Penulis'}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="pt-1 space-y-1">
                        <div className="w-full h-2 bg-[#F5F5F0] rounded-none overflow-hidden border border-[#2D241E]/10">
                          <div
                            className="h-full bg-[#5A5A40] rounded-none transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>

                        {/* Pages & Percentage display under progress bar */}
                        <div className="flex items-center justify-between text-[10px] font-bold text-[#5A5A40]">
                          <span>📖 {pagesRead} / {totalPages} hlm</span>
                          <span>{progressPercent}%</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Key Takeaway Quote */}
                {keyTakeaway.trim() && (
                  <div className="bg-[#F5F5F0] p-3 rounded-none border border-[#5A5A40]/30 text-center relative">
                    <Quote className="w-4 h-4 text-[#5A5A40]/20 absolute top-2 left-2" />
                    <p className="text-[11px] text-[#2D241E]/80 italic font-medium relative z-10 px-2 leading-relaxed line-clamp-3">
                      "{keyTakeaway}"
                    </p>
                  </div>
                )}

                {/* Star Rating Section at bottom of card */}
                <div className="bg-white p-2.5 rounded-none border border-[#2D241E]/15 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-[10px] font-bold text-[#2D241E]/80 uppercase tracking-wider">
                    {ratingLabel}:
                  </span>
                  
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= rating
                            ? 'text-amber-500 fill-amber-400'
                            : 'text-stone-300 fill-stone-100'
                        }`}
                      />
                    ))}
                    <span className="text-[10px] font-bold text-[#2D241E] ml-1">({rating}/5)</span>
                  </div>
                </div>

              </div>

              {/* CARD FOOTER WATERMARK */}
              <div className="relative z-10 text-center pt-2 border-t border-[#2D241E]/10">
                <span className="text-[9px] text-[#2D241E]/60 font-mono tracking-wider">
                  Bagikan cerita membacamu di <strong>membuku.com</strong>
                </span>
              </div>

            </div>
          </div>

          {/* Action Helper Note */}
          <div className="mt-3 text-center space-y-2">
            <p className="text-[11px] text-[#2D241E]/60">
              Pratinjau di atas adalah hasil visual akhir yang akan dikonversi secara presisi ke format PNG.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleDownloadImage}
                disabled={downloading || sharing}
                className="px-4 py-2 rounded-full bg-[#5A5A40] text-white font-bold text-xs shadow-2xs hover:bg-[#484833] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Unduh ({aspectRatio})
              </button>

              <button
                onClick={handleShareToIGStory}
                disabled={downloading || sharing}
                className="px-4 py-2 rounded-full bg-pink-600 text-white font-bold text-xs shadow-2xs hover:bg-pink-700 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Story
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

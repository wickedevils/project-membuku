import React from 'react';
import { BookOpen, Heart } from 'lucide-react';
import { SiteThemeSettings } from '../types';

interface FooterProps {
  themeSettings?: SiteThemeSettings;
}

export const Footer: React.FC<FooterProps> = ({ themeSettings }) => {
  const siteName = themeSettings?.siteName || 'membuku';
  const footerDesc = themeSettings?.footerDescription || 'Platform direktori komunitas buku/baca terpadu di Indonesia. Menghubungkan pembaca lokal, silent reading party, klub buku hobi, event literasi, dan ruang diskusi hangat.';
  const copyright = themeSettings?.footerCopyright || '© 2026 membuku. Semua hak cipta dilindungi.';

  return (
    <footer className="bg-[#F5F5F0] border-t border-[#2D241E]/10 text-[#2D241E]/80 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-xl text-white font-bold flex items-center justify-center shadow-2xs"
              style={{ backgroundColor: themeSettings?.primaryColor || '#5A5A40' }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <span 
              className="text-2xl font-serif font-bold tracking-tight"
              style={{ color: themeSettings?.primaryColor || '#5A5A40', fontFamily: themeSettings?.headingFont || 'Plus Jakarta Sans' }}
            >
              {siteName}
            </span>
          </div>

          <p className="text-xs text-[#2D241E]/70 max-w-sm leading-relaxed">
            {footerDesc}
          </p>

          <p className="text-[11px] text-[#2D241E]/60 flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600 inline" /> untuk gerakan literasi Indonesia.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-serif font-bold text-[#2D241E] uppercase tracking-wider">Fitur Utama</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#directory" className="hover:text-[#5A5A40] transition-colors">Direktori Komunitas Lokal</a></li>
            <li><a href="#events" className="hover:text-[#5A5A40] transition-colors">Event & Silent Reading Party</a></li>
            <li><a href="#forum" className="hover:text-[#5A5A40] transition-colors">Forum Diskusi Publik</a></li>
            <li><a href="#profile" className="hover:text-[#5A5A40] transition-colors">Reading Tracker & Export IG Story</a></li>
          </ul>
        </div>

        {/* Kota Populer */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-serif font-bold text-[#2D241E] uppercase tracking-wider">Komunitas di Kota Kamu</h4>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Bali', 'Medan', 'Malang', 'Online'].map((city) => (
              <span key={city} className="px-3 py-1 bg-[#FDFCF8] border border-[#2D241E]/10 rounded-full text-[#2D241E]/80 text-xs font-medium">
                {city}
              </span>
            ))}
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[#2D241E]/10 flex flex-wrap items-center justify-between text-[11px] text-[#2D241E]/60">
        <div>{copyright}</div>
        <div>Visual Theme Engine Active • Customizer Enabled</div>
      </div>
    </footer>
  );
};


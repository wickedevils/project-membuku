import React from 'react';
import { Users, Sparkles, Calendar, Flame } from 'lucide-react';
import { SiteThemeSettings } from '../types';

interface HeroSectionProps {
  themeSettings?: SiteThemeSettings;
  onNavigateTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  themeSettings,
  onNavigateTab,
}) => {
  const heroTitle = themeSettings?.heroTitle || 'Cari Klub Buku Terdekat!';
  const heroSubtitle = themeSettings?.heroSubtitle || 'Jelajahi klub buku lokal, acara diskusi hobi, dan kumpul membaca bersama di kotamu. Gabung dengan ribuan pembaca aktif di seluruh Indonesia.';

  return (
    <section className="relative bg-[#FDFCF8] text-[#2D241E] py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        
        {/* Heading */}
        <h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-tight text-[#2D241E]"
          style={{ fontFamily: themeSettings?.headingFont || 'Plus Jakarta Sans' }}
        >
          {heroTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-[#2D241E]/70 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed text-balance">
          {heroSubtitle}
        </p>

        {/* 4 Primary Feature Bubbles (2x2 Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto pt-4 text-left">
          
          {/* Bubble 1: Cari Komunitas Buku */}
          <button
            type="button"
            onClick={() => onNavigateTab('directory')}
            className="p-6 bg-white hover:bg-[#F9F7F2] border-2 border-[#5A5A40]/40 hover:border-[#5A5A40] rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md group cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#5A5A40]/10 text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-stone-200 text-stone-700">
                Direktori
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2D241E] group-hover:text-[#5A5A40] transition-colors">
                Cari Komunitas Buku
              </h3>
              <p className="text-xs sm:text-sm text-[#2D241E]/70 leading-relaxed mt-1">
                Temukan klub buku, silent reading party, & ruang baca terdekat.
              </p>
            </div>
          </button>

          {/* Bubble 2: Event Literasi */}
          <button
            type="button"
            onClick={() => onNavigateTab('events')}
            className="p-6 bg-white hover:bg-[#F9F7F2] border-2 border-emerald-300 hover:border-emerald-600 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md group cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                Agenda
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2D241E] group-hover:text-emerald-700 transition-colors">
                Event Literasi
              </h3>
              <p className="text-xs sm:text-sm text-[#2D241E]/70 leading-relaxed mt-1">
                Jelajahi agenda kumpul baca, bedah buku, & workshop literasi.
              </p>
            </div>
          </button>

          {/* Bubble 3: Template Baca */}
          <button
            type="button"
            onClick={() => onNavigateTab('profile')}
            className="p-6 bg-white hover:bg-[#F9F7F2] border-2 border-purple-200 hover:border-purple-600 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md group cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                Current Read
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2D241E] group-hover:text-purple-700 transition-colors">
                Template Baca
              </h3>
              <p className="text-xs sm:text-sm text-[#2D241E]/70 leading-relaxed mt-1">
                Buat kartu progress baca estetis (Current Read) untuk IG Story.
              </p>
            </div>
          </button>

          {/* Bubble 4: Reading Workout */}
          <button
            type="button"
            onClick={() => onNavigateTab('workout')}
            className="p-6 bg-white hover:bg-orange-50/50 border-2 border-orange-200 hover:border-orange-500 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md group cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6 fill-current" />
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                Strava Mode
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2D241E] group-hover:text-orange-600 transition-colors">
                Reading Workout
              </h3>
              <p className="text-xs sm:text-sm text-[#2D241E]/70 leading-relaxed mt-1">
                Lacak waktu & hlm membaca via timer realtime, plus ekspor statistik!
              </p>
            </div>
          </button>

        </div>

      </div>
    </section>
  );
};


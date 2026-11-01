import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  CheckCircle2, 
  Calendar, 
  ExternalLink, 
  MessageCircle, 
  Instagram, 
  Globe, 
  Bookmark, 
  Clock, 
  ArrowRight,
  BookOpen,
  Share2,
  Check
} from 'lucide-react';
import { Community } from '../types';

interface CommunityCardProps {
  community: Community;
  onSelect: (community: Community) => void;
  onToggleBookmark?: (communityId: string) => void;
  isBookmarked?: boolean;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  onSelect,
  onToggleBookmark,
  isBookmarked = false,
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [copied, setCopied] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
    if (onToggleBookmark) {
      onToggleBookmark(community.id);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}?community=${community.id}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }).catch(() => {
        // Fallback for older browsers
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
      onClick={() => onSelect(community)}
      className="group bg-white rounded-3xl border border-[#2D241E]/10 hover:border-[#5A5A40]/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      
      {/* Toast Notification overlay on copy */}
      {copied && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-[#2D241E] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 animate-bounce">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tautan disalin ke clipboard!</span>
        </div>
      )}

      {/* Banner Header */}
      <div className="relative h-36 sm:h-40 overflow-hidden bg-[#F5F5F0]">
        <img 
          src={community.bannerUrl} 
          alt={community.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Top Badges & Action Buttons */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F5F5F0] text-[#5A5A40] border border-[#5A5A40]/20 shadow-xs">
            {community.format}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Share Button */}
            <button
              onClick={handleShareClick}
              className="p-2.5 rounded-full bg-white/90 hover:bg-[#5A5A40] text-[#2D241E] hover:text-white backdrop-blur-md transition-all shadow-2xs active:scale-90"
              title="Bagikan Tautan Komunitas"
              aria-label="Share Community"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmarkClick}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-2xs active:scale-90 ${
                bookmarked 
                  ? 'bg-[#5A5A40] text-white font-bold' 
                  : 'bg-white/90 text-[#2D241E] hover:bg-[#5A5A40] hover:text-white'
              }`}
              title="Simpan Komunitas"
              aria-label="Bookmark Community"
            >
              <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Logo Avatar over Banner */}
        <div className="absolute -bottom-5 left-4 flex items-end gap-3">
          <div className="relative w-14 h-14 rounded-2xl ring-4 ring-white overflow-hidden bg-white shadow-md">
            <img 
              src={community.logoUrl} 
              alt={community.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 pt-7 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Header Title & Verified Badge */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#2D241E] group-hover:text-[#5A5A40] transition-colors flex items-center gap-1.5 line-clamp-1">
                {community.name}
                {community.verified && (
                  <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0" title="Komunitas Terverifikasi" />
                )}
              </h3>
              
              <div className="flex items-center gap-2 text-xs font-medium text-[#2D241E]/60 mt-0.5">
                <span className="flex items-center gap-1 text-[#5A5A40] font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  {community.city}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  {community.memberCount.toLocaleString('id-ID')} anggota
                </span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-[#2D241E]/70 text-xs font-normal mt-2.5 line-clamp-2 leading-relaxed italic">
            "{community.tagline}"
          </p>

          {/* Genre Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {community.genres.slice(0, 3).map((genre, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-0.5 rounded-full bg-[#F5F5F0] text-[#5A5A40] text-[11px] font-medium border border-[#5A5A40]/15"
              >
                {genre}
              </span>
            ))}
            {community.genres.length > 3 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5F5F0] text-[#2D241E]/60 text-[11px] font-medium">
                +{community.genres.length - 3} lagi
              </span>
            )}
          </div>
        </div>

        {/* Regular Schedule Highlight */}
        <div className="bg-[#F9F7F2] rounded-2xl p-3 border border-[#2D241E]/10 text-xs space-y-1">
          <div className="font-semibold text-[#5A5A40] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#5A5A40]" />
            Jadwal Kumpul Rutin:
          </div>
          <div className="text-[#2D241E] font-medium pl-5 line-clamp-1">
            {community.schedule.dayFrequency} ({community.schedule.time})
          </div>
          <div className="text-[#2D241E]/60 text-[11px] pl-5 truncate">
            📍 {community.schedule.locationName}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-[#2D241E]/10 flex items-center justify-between gap-2">
          
          {/* Quick Social Buttons */}
          <div className="flex items-center gap-1.5">
            {community.socials.instagram && (
              <a
                href={`https://instagram.com/${community.socials.instagram}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-full bg-[#F5F5F0] hover:bg-[#5A5A40] text-[#2D241E] hover:text-white transition-colors"
                title={`Instagram @${community.socials.instagram}`}
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {community.socials.whatsappGroup && (
              <a
                href={community.socials.whatsappGroup}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-full bg-[#F5F5F0] hover:bg-[#5A5A40] text-[#5A5A40] hover:text-white transition-colors"
                title="Grup WhatsApp Komunitas"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* CTA Detail Button */}
          <button
            onClick={() => onSelect(community)}
            className="px-4 py-2 rounded-full bg-[#5A5A40] text-white hover:bg-[#484833] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
          >
            Detail Komunitas
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </div>
  );
};

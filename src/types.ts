export type LocationType = 'Jakarta' | 'Bandung' | 'Yogyakarta' | 'Surabaya' | 'Medan' | 'Bali' | 'Malang' | 'Semarang' | 'Makassar' | 'Online (Seluruh Indonesia)' | 'Lainnya';

export type CommunityFormat = 'Offline' | 'Online' | 'Hybrid';

export type BookGenre = 
  | 'Fiksi & Novel'
  | 'Non-Fiksi & Essai'
  | 'Sastra & Klasik'
  | 'Self-Development & Psikologi'
  | 'Bisnis & Finansial'
  | 'Sci-Fi & Fantasi'
  | 'Puisi & Antologi'
  | 'Sejarah & Filsafat'
  | 'Biografi & Memoir'
  | 'Komik & Graphic Novel';

export interface Community {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  city: LocationType;
  district?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  format: CommunityFormat;
  genres: BookGenre[];
  memberCount: number;
  establishedYear: number;
  logoUrl: string;
  bannerUrl: string;
  verified: boolean;
  featured?: boolean;
  schedule: {
    dayFrequency: string; // e.g. "Sabtu ke-2 & ke-4 setiap bulan"
    time: string; // e.g. "15:00 - 17:00 WIB"
    locationName: string; // e.g. "Taman Suropati & Kopi Kalyan Cikini"
  };
  socials: {
    instagram?: string;
    whatsappGroup?: string;
    website?: string;
    discord?: string;
  };
  leaders: {
    name: string;
    role: string;
    avatar: string;
  }[];
  recentBooks: {
    title: string;
    author: string;
    coverUrl: string;
  }[];
  // Ownership fields for transfer / claim
  ownerUserId?: string;
  ownerUserName?: string;
  ownerEmail?: string;
  isClaimed?: boolean;
  claimedAt?: string;
}

export interface CommunityFilter {
  query: string;
  city: string;
  genre: string;
  format: string;
  sortBy: 'featured' | 'popular' | 'newest' | 'members';
}

export interface RegisterCommunityForm {
  name: string;
  tagline: string;
  description: string;
  city: LocationType;
  district: string;
  format: CommunityFormat;
  genres: BookGenre[];
  scheduleDay: string;
  scheduleTime: string;
  locationName: string;
  instagram: string;
  whatsapp: string;
  contactPersonName: string;
  contactPersonPhone: string;
  logoUrl?: string;
}

export interface EventItem {
  id: string;
  communityId: string;
  communityName: string;
  communityLogo: string;
  title: string;
  date: string;
  time: string;
  location: string;
  format: CommunityFormat;
  description: string;
  bookTitle?: string;
  bookAuthor?: string;
  maxParticipants?: number;
  currentParticipants: number;
  registrationUrl?: string;
  isFree: boolean;
  coverImage: string;
}

export interface SiteThemeSettings {
  siteName: string;
  siteTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  logoUrl?: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  headingFont: string;
  bodyFont: string;
  enableAnnouncement: boolean;
  announcementText: string;
  announcementLinkText: string;
  footerDescription: string;
  footerCopyright: string;
}

export const DEFAULT_THEME_SETTINGS: SiteThemeSettings = {
  siteName: 'membuku',
  siteTagline: 'Platform Direktori Komunitas Buku & Ruang Baca Indonesia',
  heroTitle: 'Temukan Komunitas Baca & Silent Reading Party Terdekat',
  heroSubtitle: 'Jelajahi klub buku lokal, acara diskusi hobi, dan kumpul membaca bersama di kotamu. Gabung dengan ribuan pembaca aktif di seluruh Indonesia.',
  heroImageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
  logoUrl: '',
  primaryColor: '#5A5A40',
  backgroundColor: '#FDFCF8',
  textColor: '#2D241E',
  accentColor: '#D97706',
  headingFont: 'Plus Jakarta Sans',
  bodyFont: 'Plus Jakarta Sans',
  enableAnnouncement: true,
  announcementText: '🎉 Pendaftaran Komunitas Baru Periode 2026 Telah Dibuka!',
  announcementLinkText: 'Daftarkan Komunitasmu →',
  footerDescription: 'Membuku adalah wadah kolektif dan direktori publik untuk menghubungkan para pencinta buku, klub baca, dan inisiatif silent reading party di seluruh Indonesia.',
  footerCopyright: '© 2026 membuku platform. Dipersembahkan untuk komunitas pembaca Indonesia.'
};

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  city: string;
  favoriteGenre: string;
  isLoggedIn: boolean;
  createdAt: string;
}


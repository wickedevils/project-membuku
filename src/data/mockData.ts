import { Community, EventItem } from '../types';

export const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'Jakarta': { lat: -6.1994, lng: 106.8326 },
  'Bandung': { lat: -6.8863, lng: 107.6153 },
  'Yogyakarta': { lat: -7.7523, lng: 110.4082 },
  'Surabaya': { lat: -7.2653, lng: 112.7483 },
  'Medan': { lat: 3.5952, lng: 98.6722 },
  'Bali': { lat: -8.5069, lng: 115.2625 },
  'Malang': { lat: -7.9666, lng: 112.6326 },
  'Semarang': { lat: -6.9667, lng: 110.4167 },
  'Makassar': { lat: -5.1477, lng: 119.4327 },
  'Online (Seluruh Indonesia)': { lat: -6.2088, lng: 106.8456 },
  'Lainnya': { lat: -2.5489, lng: 118.0149 }
};

export const INITIAL_COMMUNITIES: Community[] = [
  {
    id: 'comm-1',
    name: 'Baca di Park (Jakarta)',
    slug: 'baca-di-park-jakarta',
    tagline: 'Membaca bersama secara hening di ruang terbuka Jakarta',
    description: 'Komunitas silent reading party di taman-taman kota Jakarta. Kami berkumpul setiap 2 minggu sekali untuk silent reading selama 1 jam, dilanjutkan sesi perkenalan dan obrolan santai tentang buku yang sedang dibaca.',
    city: 'Jakarta',
    district: 'Jakarta Pusat',
    address: 'Taman Suropati & Taman Langsat',
    coordinates: { lat: -6.1994, lng: 106.8326 },
    format: 'Offline',
    genres: ['Fiksi & Novel', 'Non-Fiksi & Essai', 'Self-Development & Psikologi', 'Sastra & Klasik'],
    memberCount: 2450,
    establishedYear: 2022,
    logoUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1000&auto=format&fit=crop&q=80',
    verified: true,
    featured: true,
    schedule: {
      dayFrequency: 'Sabtu Minggu ke-2 & ke-4',
      time: '15:30 - 17:30 WIB',
      locationName: 'Taman Suropati, Menteng, Jakarta Pusat',
    },
    socials: {
      instagram: 'bacadipark.jkt',
      whatsappGroup: 'https://wa.me/6281234567890',
      website: 'https://bacadipark.id',
    },
    leaders: [
      {
        name: 'Anindya Putri',
        role: 'Initiator & Community Host',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
      {
        name: 'Rian Hidayat',
        role: 'Event Coordinator',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      }
    ],
    recentBooks: [
      {
        title: 'Laut Bercerita',
        author: 'Leila S. Chudori',
        coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Man’s Search for Meaning',
        author: 'Viktor E. Frankl',
        coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&auto=format&fit=crop&q=80',
      }
    ]
  },
  {
    id: 'comm-2',
    name: 'Klab Buku Bandung (KBB)',
    slug: 'klab-buku-bandung',
    tagline: 'Wadah apresiasi buku dan diskusi kritis di Kota Kembang',
    description: 'Komunitas pembaca buku di Bandung yang aktif membedah buku klasik, karya penerjemahan, dan sastra kontemporer sejak tahun 2018. Terbuka untuk semua genre dan latar belakang pembaca.',
    city: 'Bandung',
    district: 'Coblong',
    address: 'Koperasi Kopi & Perpustakaan Gasibu',
    coordinates: { lat: -6.8863, lng: 107.6153 },
    format: 'Hybrid',
    genres: ['Sastra & Klasik', 'Sejarah & Filsafat', 'Fiksi & Novel', 'Puisi & Antologi'],
    memberCount: 1820,
    establishedYear: 2018,
    logoUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1000&auto=format&fit=crop&q=80',
    verified: true,
    featured: true,
    schedule: {
      dayFrequency: 'Minggu Pertama Setiap Bulan',
      time: '14:00 - 16:30 WIB',
      locationName: 'Warung Kopi & Garasi Buku Dago',
    },
    socials: {
      instagram: 'klabbukubandung',
      whatsappGroup: 'https://wa.me/6281298765432',
      discord: 'https://discord.gg/klabbukubdg',
    },
    leaders: [
      {
        name: 'Dimas Wijaya',
        role: 'Moderator Diskusi',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      }
    ],
    recentBooks: [
      {
        title: 'Bumi Manusia',
        author: 'Pramoedya Ananta Toer',
        coverUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Cantik Itu Luka',
        author: 'Eka Kurniawan',
        coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&auto=format&fit=crop&q=80',
      }
    ]
  },
  {
    id: 'comm-3',
    name: 'Jogja Bookish Club',
    slug: 'jogja-bookish-club',
    tagline: 'Klub membaca santai, arisan buku, dan ruang tukar koleksi di Yogyakarta',
    description: 'Menghubungkan mahasiswa, akademisi, dan pencinta buku di Jogja. Kegiatan rutin meliputi book swap, bedah karya lokal, hingga piknik literasi di kawasan lereng Merapi.',
    city: 'Yogyakarta',
    district: 'Sleman / Depok',
    address: 'Kopi Macan & Perpustakaan Daerah DIY',
    coordinates: { lat: -7.7523, lng: 110.4082 },
    format: 'Offline',
    genres: ['Fiksi & Novel', 'Sejarah & Filsafat', 'Biografi & Memoir', 'Puisi & Antologi'],
    memberCount: 3100,
    establishedYear: 2019,
    logoUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1000&auto=format&fit=crop&q=80',
    verified: true,
    featured: true,
    schedule: {
      dayFrequency: 'Setiap Hari Sabtu',
      time: '16:00 - 18:00 WIB',
      locationName: 'Kedai Kopi & Buku Candi Gebang, Sleman',
    },
    socials: {
      instagram: 'jogjabookish',
      whatsappGroup: 'https://wa.me/6281333445566',
    },
    leaders: [
      {
        name: 'Siti Nurhaliza',
        role: 'Penggerak Literasi Jogja',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      }
    ],
    recentBooks: [
      {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&auto=format&fit=crop&q=80',
      }
    ]
  },
  {
    id: 'comm-4',
    name: 'Indonesian Non-Fiction Society',
    slug: 'indonesian-non-fiction-society',
    tagline: 'Diskusi buku pengembangan diri, bisnis, sains, dan psikologi secara online',
    description: 'Komunitas nasional bagi pembaca buku non-fiksi di seluruh Indonesia. Mengadakan webinar bulanan bersama penulis & praktisi, serta grup WhatsApp aktif untuk rangkuman buku harian.',
    city: 'Online (Seluruh Indonesia)',
    coordinates: { lat: -6.2088, lng: 106.8456 },
    format: 'Online',
    genres: ['Non-Fiksi & Essai', 'Bisnis & Finansial', 'Self-Development & Psikologi', 'Sejarah & Filsafat'],
    memberCount: 5200,
    establishedYear: 2021,
    logoUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&auto=format&fit=crop&q=80',
    verified: true,
    featured: false,
    schedule: {
      dayFrequency: 'Setiap Kamis Malam (Webinar Zoom)',
      time: '19:30 - 21:00 WIB',
      locationName: 'Zoom Meeting / Discord Channel',
    },
    socials: {
      instagram: 'nonfiction.id',
      website: 'https://nonfiction.id',
      discord: 'https://discord.gg/nonfictionid',
    },
    leaders: [
      {
        name: 'Farhan Pratama',
        role: 'Founder & Host',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      }
    ],
    recentBooks: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Filosofi Teras',
        author: 'Henry Manampiring',
        coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&auto=format&fit=crop&q=80',
      }
    ]
  },
  {
    id: 'comm-5',
    name: 'Surabaya Speculative Fiction Society',
    slug: 'surabaya-speculative-fiction',
    tagline: 'Klub pembaca novel Sci-Fi, Fantasi, Dystopia, dan Mitologi di Kota Pahlawan',
    description: 'Satu-satunya komunitas khusus genre Fantasi dan Science Fiction di Surabaya. Kami menyelenggarakan bedah dunia fiksi (world-building analysis), nonton bareng adaptasi film, dan kuis trivia buku.',
    city: 'Surabaya',
    district: 'Gubeng',
    address: 'Kafe Buku Gubeng & Balai Pemuda',
    coordinates: { lat: -7.2653, lng: 112.7483 },
    format: 'Offline',
    genres: ['Sci-Fi & Fantasi', 'Fiksi & Novel', 'Komik & Graphic Novel'],
    memberCount: 940,
    establishedYear: 2020,
    logoUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=80',
    verified: false,
    featured: false,
    schedule: {
      dayFrequency: 'Sabtu Pertama Tiap Bulan',
      time: '13:00 - 16:00 WIB',
      locationName: 'Co-Working Space Balai Pemuda Surabaya',
    },
    socials: {
      instagram: 'surabaya.scifi.fantasy',
      whatsappGroup: 'https://wa.me/6281122334455',
    },
    leaders: [
      {
        name: 'Budi Santoso',
        role: 'Chief Geek & Book Curator',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      }
    ],
    recentBooks: [
      {
        title: 'Dune',
        author: 'Frank Herbert',
        coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80',
      }
    ]
  },
  {
    id: 'comm-6',
    name: 'Pena & Puisi Bali',
    slug: 'pena-puisi-bali',
    tagline: 'Komunitas pembaca dan penulis puisi, prosais, dan sastra di Bali',
    description: 'Komunitas diskusi sastra dan apresiasi puisi di kawasan Denpasar & Ubud. Rutin menyelenggarakan panggung terbuka pembacaan puisi (open mic) dan workshop penulisan kreatif.',
    city: 'Bali',
    district: 'Ubud / Denpasar',
    address: 'Taman Baca Ubud & Art Space Denpasar',
    coordinates: { lat: -8.5069, lng: 115.2625 },
    format: 'Hybrid',
    genres: ['Puisi & Antologi', 'Sastra & Klasik', 'Biografi & Memoir'],
    memberCount: 1150,
    establishedYear: 2021,
    logoUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=1000&auto=format&fit=crop&q=80',
    verified: true,
    featured: false,
    schedule: {
      dayFrequency: 'Minggu Sore (2 Kali Sebulan)',
      time: '16:30 - 18:30 WITA',
      locationName: 'Taman Baca Ubud & Online Instagram Live',
    },
    socials: {
      instagram: 'penapuisi.bali',
      whatsappGroup: 'https://wa.me/6281778899001',
    },
    leaders: [
      {
        name: 'Made Astawa',
        role: 'Koordinator Komunitas',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      }
    ],
    recentBooks: [
      {
        title: 'Hujan Bulan Juni',
        author: 'Sapardi Djoko Damono',
        coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&auto=format&fit=crop&q=80',
      }
    ]
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    communityId: 'comm-1',
    communityName: 'Baca di Park (Jakarta)',
    communityLogo: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80',
    title: 'Silent Reading Party #42: Sore Santai & Tukar Buku di Taman Suropati',
    date: 'Sabtu, 2 Agt 2026',
    time: '15:30 - 17:30 WIB',
    location: 'Taman Suropati, Menteng, Jakarta Pusat',
    format: 'Offline',
    description: 'Bawa buku favoritmu (genre apa saja), tikar/alas duduk, dan tumbler minum. Kita akan baca hening 1 jam, lalu sharing 30 menit & book swap opsional!',
    isFree: true,
    currentParticipants: 48,
    maxParticipants: 60,
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'evt-2',
    communityId: 'comm-2',
    communityName: 'Klab Buku Bandung (KBB)',
    communityLogo: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150&auto=format&fit=crop&q=80',
    title: 'Bedah Buku: "Bumi Manusia" & Jejak Sejarah Pergerakan Sastra',
    date: 'Minggu, 10 Agt 2026',
    time: '14:00 - 16:30 WIB',
    location: 'Warung Kopi & Garasi Buku Dago, Bandung',
    format: 'Hybrid',
    description: 'Diskusi mendalam mengenai karya monumental Pramoedya Ananta Toer. Dilengkapi penjelasan konteks sejarah oleh dosen sastra guest speaker.',
    isFree: true,
    currentParticipants: 32,
    maxParticipants: 40,
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'evt-3',
    communityId: 'comm-4',
    communityName: 'Indonesian Non-Fiction Society',
    communityLogo: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=150&auto=format&fit=crop&q=80',
    title: 'Webinar Nasional: Membangun Kebiasaan Membaca Konsisten & Mindful Reading',
    date: 'Kamis, 14 Agt 2026',
    time: '19:30 - 21:00 WIB',
    location: 'Zoom Meeting Room',
    format: 'Online',
    description: 'Sering membeli buku tapi susah menamatkannya? Pelajari teknik membaca efektif, nota rangkuman, dan manajemen fokus bersama psikolog & penulis buku.',
    isFree: true,
    currentParticipants: 185,
    maxParticipants: 300,
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80'
  }
];

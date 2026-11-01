import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Send, 
  Plus, 
  TrendingUp, 
  Sparkles, 
  Tag, 
  User,
  CornerDownRight
} from 'lucide-react';
import { UserAccount } from '../types';

interface ForumSectionProps {
  currentUser?: UserAccount | null;
  onRequireAuth?: (actionName: string) => void;
}

interface PostComment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  upvotes: number;
  replies?: PostComment[];
}

interface ForumPost {
  id: string;
  author: string;
  authorAvatar: string;
  category: 'Rekomendasi' | 'Opini' | 'Bedah Buku' | 'Tanya Komunitas';
  title: string;
  content: string;
  createdAt: string;
  upvotes: number;
  userVote: 'up' | 'down' | null;
  comments: PostComment[];
}

const INITIAL_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    author: 'Rahmat Hidayat',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    category: 'Rekomendasi',
    title: 'Rekomendasi buku fiksi sejarah Indonesia terbaik selain Tetralogi Buru?',
    content: 'Saya baru saja menamatkan "Bumi Manusia" dan "Laut Bercerita". Sedang mencari novel fiksi sejarah lokal yang alur ceritanya kuat, kaya riset sejarah, dan karakternya berkesan. Komunitas ada saran?',
    createdAt: '2 jam yang lalu',
    upvotes: 28,
    userVote: null,
    comments: [
      {
        id: 'c-1',
        author: 'Dian Sastrowardoyo',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        content: 'Coba baca "Cantik Itu Luka" karya Eka Kurniawan atau "Max Havelaar" versi terjemahan. Juga novel "Pangeran dari Timur" karya Danarto!',
        createdAt: '1 jam yang lalu',
        upvotes: 12,
        replies: [
          {
            id: 'c-1-1',
            author: 'Rahmat Hidayat',
            authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
            content: 'Terima kasih Mbak Dian! "Cantik Itu Luka" langsung masuk daftar TBR saya.',
            createdAt: '30 menit yang lalu',
            upvotes: 4,
          }
        ]
      }
    ]
  },
  {
    id: 'post-2',
    author: 'Clarissa Vanya',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    category: 'Opini',
    title: 'Apakah Silent Reading Party lebih efektif dibanding diskusi buku tradisional?',
    content: 'Di Jakarta & Bandung sekarang lagi marak tren Silent Reading di taman kota. Pengalaman pribadi saya: jauh lebih rileks karena tidak ada tekanan harus menyelesaikan atau mempertahankan pendapat saat diskusi.',
    createdAt: '5 jam yang lalu',
    upvotes: 45,
    userVote: null,
    comments: [
      {
        id: 'c-2',
        author: 'Bagas Perkasa',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        content: 'Setuju banget! Untuk introvert, silent reading itu kombinasi sempurna antara suasana publik yang tenang dan kebebasan membaca.',
        createdAt: '4 jam yang lalu',
        upvotes: 18,
      }
    ]
  }
];

export const ForumSection: React.FC<ForumSectionProps> = ({ currentUser, onRequireAuth }) => {
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<'Rekomendasi' | 'Opini' | 'Bedah Buku' | 'Tanya Komunitas'>('Rekomendasi');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [activeCommentInput, setActiveCommentInput] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleOpenNewPost = () => {
    if (!currentUser && onRequireAuth) {
      onRequireAuth('membuat thread diskusi baru');
      return;
    }
    setShowNewPostModal(true);
  };

  const handleCommentClick = (postId: string) => {
    if (!currentUser && onRequireAuth) {
      onRequireAuth('menulis komentar atau tanggapan di forum');
      return;
    }
    setActiveCommentInput(activeCommentInput === postId ? null : postId);
  };

  const handleVote = (postId: string, direction: 'up' | 'down') => {
    if (!currentUser && onRequireAuth) {
      onRequireAuth('memberikan vote pada postingan');
      return;
    }

    setPosts(posts.map((p) => {
      if (p.id !== postId) return p;

      let scoreDelta = 0;
      let newVote: 'up' | 'down' | null = direction;

      if (p.userVote === direction) {
        newVote = null;
        scoreDelta = direction === 'up' ? -1 : 1;
      } else if (p.userVote === null) {
        scoreDelta = direction === 'up' ? 1 : -1;
      } else {
        scoreDelta = direction === 'up' ? 2 : -2;
      }

      return {
        ...p,
        upvotes: p.upvotes + scoreDelta,
        userVote: newVote,
      };
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const created: ForumPost = {
      id: `post-${Date.now()}`,
      author: currentUser?.name || 'Pengguna Membuku',
      authorAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      category: newPostCategory,
      title: newPostTitle,
      content: newPostContent,
      createdAt: 'Baru saja',
      upvotes: 1,
      userVote: 'up',
      comments: [],
    };

    setPosts([created, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPostModal(false);
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;

    const newComment: PostComment = {
      id: `c-${Date.now()}`,
      author: currentUser?.name || 'Pengguna Membuku',
      authorAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      content: commentText,
      createdAt: 'Baru saja',
      upvotes: 1,
    };

    setPosts(posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment],
        };
      }
      return p;
    }));

    setCommentText('');
    setActiveCommentInput(null);
  };

  const filteredPosts = selectedCategory === 'Semua' 
    ? posts 
    : posts.filter((p) => p.category === selectedCategory);

  return (
    <section className="space-y-6">
      
      {/* Forum Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#5A5A40]" />
            Forum Diskusi Publik Pembaca
          </h2>
          <p className="text-xs text-[#2D241E]/70 mt-1">
            Ruang tanya jawab, rekomendasi buku, dan opini kritis terbuka untuk seluruh anggota pembaca Indonesia.
          </p>
        </div>

        <button
          onClick={handleOpenNewPost}
          className="px-5 py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Buat Diskusi Baru
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-[#2D241E]/10">
        {['Semua', 'Rekomendasi', 'Opini', 'Bedah Buku', 'Tanya Komunitas'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#5A5A40] text-white font-bold shadow-2xs'
                : 'bg-[#F5F5F0] text-[#5A5A40] hover:bg-[#5A5A40]/10 border border-[#5A5A40]/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-[#2D241E]/10 rounded-3xl p-6 shadow-2xs space-y-4 hover:border-[#5A5A40]/40 transition-all"
          >
            {/* Post Author & Category Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold text-[#2D241E]">{post.author}</div>
                  <div className="text-[10px] text-[#2D241E]/60">{post.createdAt}</div>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#F5F5F0] text-[#5A5A40] text-[10px] font-bold border border-[#5A5A40]/20 uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            {/* Post Title & Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-serif font-bold text-[#2D241E] leading-snug">{post.title}</h3>
              <p className="text-[#2D241E]/80 text-xs leading-relaxed">{post.content}</p>
            </div>

            {/* Voting & Prominent Comment Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#2D241E]/10 text-xs">
              
              {/* Reddit Style Upvote / Downvote */}
              <div className="flex items-center bg-[#F9F7F2] rounded-full px-2.5 py-1 border border-[#2D241E]/10 shadow-2xs">
                <button
                  onClick={() => handleVote(post.id, 'up')}
                  className={`p-1 rounded-full hover:bg-stone-200 transition-colors ${
                    post.userVote === 'up' ? 'text-[#5A5A40] font-bold' : 'text-[#2D241E]/50'
                  }`}
                  title="Upvote"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <span className={`px-2 font-bold ${post.upvotes > 0 ? 'text-[#5A5A40]' : 'text-[#2D241E]/60'}`}>
                  {post.upvotes}
                </span>
                <button
                  onClick={() => handleVote(post.id, 'down')}
                  className={`p-1 rounded-full hover:bg-stone-200 transition-colors ${
                    post.userVote === 'down' ? 'text-red-600 font-bold' : 'text-[#2D241E]/50'
                  }`}
                  title="Downvote"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Prominent Comment & Reply Button */}
              <button
                onClick={() => handleCommentClick(post.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5A5A40] text-white hover:bg-[#484833] font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments.length > 0 ? `${post.comments.length} Komentar / Balas` : '💬 Tulis Komentar / Balas'}</span>
              </button>

            </div>

            {/* Nested Comments Section */}
            {post.comments.length > 0 && (
              <div className="pl-4 border-l-2 border-[#5A5A40]/30 space-y-3 pt-2">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="bg-[#F9F7F2] p-3.5 rounded-2xl border border-[#2D241E]/10 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[#2D241E]/60">
                      <span className="font-bold text-[#2D241E]">{comment.author}</span>
                      <span className="text-[10px]">{comment.createdAt}</span>
                    </div>
                    <p className="text-[#2D241E]/80">{comment.content}</p>

                    {/* Replies if any */}
                    {comment.replies && comment.replies.map((r) => (
                      <div key={r.id} className="mt-2 pl-3 border-l border-[#5A5A40]/30 flex items-start gap-1.5 text-[11px] text-[#2D241E]/80">
                        <CornerDownRight className="w-3 h-3 text-[#5A5A40] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#5A5A40]">{r.author}:</strong> {r.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Comment Input */}
            {activeCommentInput === post.id && (
              <div className="pt-2 flex items-center gap-2 animate-fadeIn">
                <input
                  type="text"
                  placeholder="Tulis tanggapan atau opinimu..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-[#FDFCF8] border border-[#2D241E]/15 rounded-xl px-3.5 py-2 text-xs text-[#2D241E] placeholder:text-gray-400 focus:outline-none focus:border-[#5A5A40]"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="px-4 py-2 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold rounded-full text-xs flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div 
          onClick={() => setShowNewPostModal(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FDFCF8] border border-[#2D241E]/10 rounded-3xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl relative text-[#2D241E] max-h-[92vh] overflow-y-auto scrollbar-thin my-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2D241E]/10">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#2D241E]">Buat Thread Diskusi Baru</h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-3 py-1.5 rounded-full bg-[#2D241E] text-white hover:bg-[#5A5A40] text-xs font-bold transition-all flex items-center gap-1 shadow-md cursor-pointer"
                aria-label="Tutup Dialog Thread"
              >
                <span>Tutup</span>
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Kategori Thread</label>
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value as any)}
                  className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                >
                  <option value="Rekomendasi">Rekomendasi Buku</option>
                  <option value="Opini">Opini & Catatan Sastra</option>
                  <option value="Bedah Buku">Bedah Karya / Diskusikan Buku</option>
                  <option value="Tanya Komunitas">Tanya Komunitas Baca</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Judul Diskusi *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apa pendapat kalian tentang pengakhiran cerita..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D241E]/70 mb-1">Isi Diskusi *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tulis detail pandangan atau pertanyaanmu di sini..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full bg-white border border-[#2D241E]/15 rounded-xl p-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#5A5A40]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                Terbitkan Thread Diskusi
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};


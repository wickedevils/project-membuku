import React from 'react';
import { ShieldAlert, UserPlus, LogIn, X, Sparkles, ArrowRight } from 'lucide-react';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: (customMessage?: string) => void;
  actionName?: string;
}

export const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({
  isOpen,
  onClose,
  onOpenRegister,
  actionName = 'berinteraksi',
}) => {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FDFCF8] border border-[#2D241E]/15 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-[#2D241E] text-center my-auto"
      >
        {/* Icon & Title */}
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center border border-amber-300">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-serif font-bold text-[#2D241E]">
            Daftar Akun Diperlukan
          </h3>
          <p className="text-xs text-[#2D241E]/70 leading-relaxed">
            Anda menjelajah sebagai <strong className="text-[#5A5A40]">Pengguna Anonim</strong>. Silakan mendaftar atau masuk ke akun pembaca Anda untuk <span className="font-bold text-[#5A5A40]">{actionName}</span>.
          </p>
        </div>

        {/* Benefits list */}
        <div className="p-3 bg-[#F5F5F0] rounded-2xl text-left space-y-2 border border-[#2D241E]/10 text-xs text-[#2D241E]">
          <div className="font-bold text-[#5A5A40] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Keuntungan Akun Pembaca:
          </div>
          <ul className="space-y-1 text-[11px] text-[#2D241E]/80 list-disc list-inside">
            <li>Mendaftar event & kumpul komunitas</li>
            <li>Menulis komentar & membuat thread forum</li>
            <li>Simpan bookmark komunitas & buku pilihan</li>
            <li>Ekspor kartu profil membaca ke IG Story</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              onClose();
              onOpenRegister(`Daftar akun gratis untuk ${actionName}.`);
            }}
            className="w-full py-3 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Akun Baru (Gratis)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-stone-200/70 hover:bg-stone-200 text-[#2D241E] font-semibold text-xs transition-all cursor-pointer"
          >
            Nanti Saja / Tutup
          </button>
        </div>

      </div>
    </div>
  );
};

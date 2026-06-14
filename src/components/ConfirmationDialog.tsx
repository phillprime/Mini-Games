import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmationDialog({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Exit Game?',
  message = 'Are you sure you want to close this game? Progress may not be saved.'
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xs rounded-2xl bg-[#0e0a29] border border-violet-500/30 p-5 shadow-2xl relative overflow-hidden"
      >
        {/* High Tech Tech line accents */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-violet-600 to-cyan-400" />
        
        <div className="flex flex-col items-center text-center gap-3 mt-1">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertCircle className="w-6 h-6 animate-pulse" />
          </div>
          
          <h3 className="text-base font-display font-bold text-white tracking-wide">
            {title}
          </h3>
          
          <p className="text-xs text-zinc-400 leading-relaxed font-sans px-1">
            {message}
          </p>
        </div>

        {/* Buttons Action Bar */}
        <div className="flex gap-2.5 mt-5">
          <button
            onClick={onCancel}
            className="flex-1 py-2 text-xs font-semibold tracking-wide border border-zinc-805 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition-all cursor-pointer"
          >
            No
          </button>
          
          <button
            onClick={onConfirm}
            className="flex-1 py-2 text-xs font-semibold tracking-wide bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-950/20 rounded-xl hover:brightness-110 active:brightness-95 transition-all cursor-pointer"
          >
            Yes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface EasterEggToastProps {
  message: string | null;
  onClose: () => void;
}

export const EasterEggToast: React.FC<EasterEggToastProps> = ({ message, onClose }) => {
  React.useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => {
      onClose();
    }, 4500);
    return () => window.clearTimeout(timer);
    // Only re-arm when the quote text changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-[92%] bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-xl text-center cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-start justify-center gap-2 text-white font-semibold text-sm sm:text-base font-myanmar leading-relaxed">
            <Heart className="w-5 h-5 text-rose-300 fill-rose-300 animate-bounce shrink-0 mt-0.5" />
            <span>{message}</span>
            <Sparkles className="w-4 h-4 text-amber-200 shrink-0 mt-1" />
          </div>
          <div className="text-[10px] text-white/60 mt-2">
            (နှိပ်လိုက်ရင် ပိတ်သွားပါမည်)
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

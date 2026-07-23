import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface EasterEggToastProps {
  message: string | null;
  onClose: () => void;
}

export const EasterEggToast: React.FC<EasterEggToastProps> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-[90%] bg-white/90 dark:bg-rose-950/90 backdrop-blur-md border border-pink-300 dark:border-rose-800 rounded-2xl p-4 shadow-xl shadow-pink-500/20 text-center cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-center justify-center gap-2 text-rose-600 dark:text-pink-300 font-semibold text-sm sm:text-base">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
            <span>{message}</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-[10px] text-pink-400 dark:text-rose-400 mt-1">
            (နှိပ်လိုက်ရင် ပိတ်သွားပါမည်)
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

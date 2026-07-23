import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart, HeartHandshake } from 'lucide-react';

interface Page2Props {
  onNext: () => void;
  onTriggerAudio: () => void;
}

export const Page2Envelope: React.FC<Page2Props> = ({ onNext, onTriggerAudio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardSlidOut, setCardSlidOut] = useState(false);

  const handleOpenEnvelope = () => {
    onTriggerAudio();
    setIsOpen(true);

    setTimeout(() => {
      setCardSlidOut(true);
    }, 800);
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg mx-auto bg-white/25 dark:bg-white/10 backdrop-blur-3xl border border-white/40 dark:border-white/20 rounded-[40px] sm:rounded-[48px] p-8 sm:p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] relative overflow-hidden"
      >
        {/* Decor Glows */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl text-white text-xs sm:text-sm font-semibold border border-white/30 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-200" />
            ချစ်ခြင်းမေတ္တာ သဝဏ်လွှာ 💌
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 font-myanmar leading-snug drop-shadow-sm">
          တစ်ခွန်း အတွက် စာတစ်စောင် ရောက်လာတယ် 💌
        </h2>

        {/* Envelope Container */}
        <div className="relative w-64 sm:w-80 h-48 sm:h-56 mx-auto my-6 perspective-1000">
          {/* Card Sliding Out */}
          <AnimatePresence>
            {cardSlidOut && (
              <motion.div
                initial={{ y: 0, scale: 0.9, opacity: 0 }}
                animate={{ y: -90, scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
                className="absolute inset-x-2 sm:inset-x-4 top-2 z-20 bg-[#faedcd] dark:bg-[#2b1700] backdrop-blur-2xl p-4 sm:p-5 rounded-3xl shadow-2xl border-2 border-amber-200 text-center text-[#3d2314] dark:text-[#faedcd]"
              >
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500 mx-auto mb-2 animate-bounce" />
                <h3 className="text-lg font-extrabold text-[#3d2314] dark:text-amber-200 font-myanmar">
                  အထူး ဖိတ်ခေါ်လွှာ 💌
                </h3>
                <p className="text-xs text-[#5c3821] dark:text-amber-100/90 mt-1 font-myanmar">
                  တစ်ခွန်း တစ်ယောက်တည်းအတွက်သာ သီးသန့် ရည်ရွယ်သည်...
                </p>
                <div className="mt-3 pt-2 border-t border-amber-300/40">
                  <span className="text-[11px] text-[#8c5638] dark:text-amber-300 font-bold uppercase tracking-wider">
                    Reserved For My Love ❤️
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope Graphic */}
          <div className="relative w-full h-full bg-white/20 backdrop-blur-2xl rounded-3xl shadow-xl border-2 border-white/50 overflow-hidden flex flex-col justify-end p-4 z-10">
            {/* Top Flap 3D Unfold Animation */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpen ? 180 : 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
              className={`absolute top-0 inset-x-0 h-1/2 bg-white/30 backdrop-blur-xl border-b border-white/40 clip-triangle shadow-md z-30 flex items-center justify-center ${
                isOpen ? 'pointer-events-none' : ''
              }`}
            >
              {!isOpen && (
                <div className="w-10 h-10 rounded-full bg-[#faedcd] shadow-md flex items-center justify-center border border-amber-200">
                  <HeartHandshake className="w-5 h-5 text-[#3d2314]" />
                </div>
              )}
            </motion.div>

            {/* Envelope Bottom Pocket */}
            <div className="relative z-10 flex flex-col items-center">
              {!isOpen ? (
                <div className="text-white font-medium text-sm flex items-center gap-1.5 font-myanmar">
                  <Mail className="w-4 h-4" /> ဖွင့်ရန် နှိပ်ပါ
                </div>
              ) : (
                <div className="text-white/90 text-xs font-semibold font-myanmar">
                  စာအိတ် ပွင့်သွားပါပြီ ✨
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex justify-center">
          {!isOpen ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenEnvelope}
              className="w-full py-4 rounded-[20px] sm:rounded-[24px] bg-[#faedcd] text-[#3d2314] font-extrabold text-lg shadow-lg hover:bg-[#fefae0] transition-all font-myanmar cursor-pointer flex items-center justify-center gap-2"
            >
              <span>ဖွင့်ကြည့်မယ် ✉️</span>
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="w-full py-4 rounded-[20px] sm:rounded-[24px] bg-[#faedcd] text-[#3d2314] font-extrabold text-lg shadow-lg hover:bg-[#fefae0] transition-all font-myanmar cursor-pointer flex items-center justify-center gap-2"
            >
              <span>ဖတ်ကြည့်မယ် ❤️</span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

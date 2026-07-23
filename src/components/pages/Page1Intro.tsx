import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { her, herSoft } from '../../data/partner';

interface Page1Props {
  onNext: () => void;
}

export const Page1Intro: React.FC<Page1Props> = ({ onNext }) => {
  const [showSubText, setShowSubText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowSubText(true);
    }, 1500);

    const timer2 = setTimeout(() => {
      setShowButton(true);
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleStart = () => {
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center select-none">
      <div className="w-full max-w-lg bg-white/25 dark:bg-white/10 backdrop-blur-3xl border border-white/40 dark:border-white/20 rounded-[40px] sm:rounded-[48px] p-8 sm:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] flex flex-col items-center text-center relative overflow-hidden">
        {/* Decor Inner Glow Elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />

        {/* Big Animated Glowing Heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/40 backdrop-blur-xl rounded-full flex items-center justify-center shadow-inner ring-4 ring-white/30 animate-pulse">
            <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-white fill-white animate-bounce" />
            <Sparkles className="absolute top-2 right-2 w-6 h-6 text-amber-200 animate-spin-slow" />
          </div>
        </motion.div>

        {/* Primary Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-wide leading-relaxed font-myanmar drop-shadow-sm"
        >
          {herSoft(0)}ရေ...
        </motion.h1>

        {/* Secondary Subtitle */}
        {showSubText && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-base sm:text-xl text-white/90 font-medium max-w-md mx-auto leading-relaxed mb-8 px-2 font-myanmar"
          >
            ကိုယ့်မှာ {her(1)} အတွက် အထူးလက်ဆောင်တစ်ခု ရှိတယ်... ✨
          </motion.p>
        )}

        {/* Continue Button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full mt-2"
          >
            <button
              onClick={handleStart}
              className="w-full py-4 sm:py-5 rounded-[20px] sm:rounded-[24px] bg-[#faedcd] text-[#3d2314] font-extrabold text-lg sm:text-xl shadow-lg shadow-amber-950/30 hover:bg-[#fefae0] hover:scale-105 active:scale-95 transition transform duration-200 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>ဆက်ကြည့်မယ် ❤️</span>
              <ArrowRight className="w-5 h-5 text-[#3d2314]" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

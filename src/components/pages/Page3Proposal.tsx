import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper, CheckCircle } from 'lucide-react';
import { her } from '../../data/partner';

interface Page3Props {
  onNext: () => void;
  onTriggerToast: (msg: string) => void;
}

const ESCAPE_MESSAGES_MM = [
  '🥺 ဟာ... မလုပ်ပါနဲ့...',
  '😭 No က အလုပ်မလုပ်ဘူး...',
  '😂 ထပ်ကြိုးစားကြည့် 😝',
  '❤️ ကိုယ့်ကို မငြင်းရဘူးနော်...',
  '😆 ဒီ Website မှာ NO မရှိဘူး ❤️',
  '😂 Mission Failed',
  '😂 Error 404 : NO Not Found',
  '😂 Relationship Status : YES Required',
  '😂 Love.exe has stopped working ❤️',
];

export const Page3Proposal: React.FC<Page3Props> = ({ onNext, onTriggerToast }) => {
  const [noPos, setNoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [attemptCount, setAttemptCount] = useState(0);
  const [yesAccepted, setYesAccepted] = useState(false);
  const [noMessage, setNoMessage] = useState<string | null>(null);

  const dodgeNoButton = () => {
    const newAttempt = attemptCount + 1;
    setAttemptCount(newAttempt);

    // Random offset in range [-140, 140] px
    const randomX = (Math.random() - 0.5) * 280;
    const randomY = (Math.random() - 0.5) * 200;
    setNoPos({ x: randomX, y: randomY });

    const msg = ESCAPE_MESSAGES_MM[Math.floor(Math.random() * ESCAPE_MESSAGES_MM.length)];
    setNoMessage(msg);

    if (newAttempt >= 5) {
      onTriggerToast("ဟီးဟီး 🤭 'မသွားဘူး' ဆိုတာ ဒီ Website မှာ မရှိဘူး ❤️");
    }
  };

  const handleYesClick = () => {
    setYesAccepted(true);

    // Confetti Fireworks Explosion
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF6FAE', '#FFD6E7', '#FF1493', '#FFD700', '#FF85B2'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF6FAE', '#FFD6E7', '#FF1493', '#FFD700', '#FF85B2'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center select-none">
      <AnimatePresence mode="wait">
        {!yesAccepted ? (
          <motion.div
            key="question-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[520px] bg-white/25 dark:bg-white/10 backdrop-blur-3xl border border-white/40 dark:border-white/20 rounded-[48px] p-8 sm:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] flex flex-col items-center text-center relative overflow-hidden text-white"
          >
            {/* Decor Inner Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />

            {/* Invitation Ring Icon */}
            <div className="w-24 h-24 bg-white/40 backdrop-blur-xl rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner ring-4 ring-white/20 animate-pulse">
              💍
            </div>

            <div className="mb-2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              အရေးကြီးသော မေးခွန်းလေး 🥺
            </div>

            <h1 className="text-white text-2xl sm:text-4xl font-bold leading-tight mb-4 drop-shadow-sm font-myanmar">
              {her(1)} နဲ့ Date Night <br className="hidden sm:inline" />သွားပေးမလား? 🥺❤️
            </h1>

            <p className="text-white/80 text-sm sm:text-lg mb-8 px-2 leading-relaxed font-myanmar">
              {her(0)} မရှိရင် ကိုယ့်ရဲ့ကမ္ဘာကြီးက ပျင်းစရာကြီးနော်... <br />
              အဲ့တော့ ကိုယ်နဲ့အတူတူ ပျော်စရာတွေ ဖန်တီးရအောင် ❤️
            </p>

            {noMessage && (
              <motion.div
                key={noMessage}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs sm:text-sm font-bold text-white mb-6 bg-white/20 backdrop-blur-md py-2.5 px-4 rounded-2xl border border-white/30 shadow-sm"
              >
                {noMessage}
              </motion.div>
            )}

            {/* Action Buttons Column */}
            <div className="relative w-full min-h-[140px] flex flex-col items-center gap-4">
              {/* YES Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="w-full py-4 sm:py-5 rounded-[20px] sm:rounded-[24px] bg-[#faedcd] text-[#3d2314] font-extrabold text-lg sm:text-xl shadow-lg shadow-amber-950/30 hover:bg-[#fefae0] transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-myanmar z-10"
              >
                <span>💖 သွားမယ်</span>
              </motion.button>

              {/* Dodging NO Button */}
              <motion.button
                animate={{
                  x: noPos.x,
                  y: noPos.y,
                  rotate: attemptCount * 15,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                onMouseEnter={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                onClick={dodgeNoButton}
                className="w-full py-3.5 sm:py-4 rounded-[20px] sm:rounded-[24px] bg-white/10 border border-white/30 text-white/80 font-medium text-base sm:text-lg flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer font-myanmar select-none"
              >
                <span>🙈 မသွားဘူး</span>
              </motion.button>
            </div>

            {/* Easter Egg Footer */}
            <div className="mt-8 pt-6 border-t border-white/20 w-full">
              <p className="text-white/70 text-xs italic font-myanmar">
                "ဒီ Website မှာ 'မသွားဘူး' ဆိုတာ မရှိဘူးနော် ဟီးဟီး 🤭"
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="w-full max-w-[520px] bg-white/25 dark:bg-white/10 backdrop-blur-3xl border border-white/40 dark:border-white/20 rounded-[48px] p-8 sm:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] text-center text-white relative overflow-hidden"
          >
            <div className="w-24 h-24 bg-white/40 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-white/20 animate-bounce">
              <PartyPopper className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-myanmar leading-tight drop-shadow-sm">
              Yayyyyy!! ❤️<br />
              ကိုယ် အရမ်းပျော်သွားပြီ 🥹❤️
            </h2>

            <p className="text-base text-white/90 font-myanmar mb-8 leading-relaxed">
              {her(1)} နဲ့ သွားရမယ့် Date Night လေးအတွက် အစီအစဉ်ဆွဲဖို့ အသင့်ဖြစ်ပါပြီ! 🌹
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="w-full py-4 sm:py-5 rounded-[20px] sm:rounded-[24px] bg-[#faedcd] text-[#3d2314] font-extrabold text-lg sm:text-xl shadow-lg shadow-amber-950/30 hover:bg-[#fefae0] transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-myanmar"
            >
              <CheckCircle className="w-6 h-6 text-[#3d2314]" />
              <span>Date အစီအစဉ် စဆွဲကြစို့ ❤️</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

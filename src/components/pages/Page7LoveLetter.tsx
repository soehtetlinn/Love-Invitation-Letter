import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, Feather, ArrowRight, Check } from 'lucide-react';
import { her } from '../../data/partner';

interface Page7Props {
  onNext: () => void;
}

const FULL_LOVE_LETTER_MM = `ချစ်ရပါသော ${her(0)} သို့... ❤️

ဒီစာလေးကို ဖတ်နေတဲ့ အချိန်မှာ ${her(1)} ရဲ့ မျက်နှာလေးမှာ အပြုံးလေးတွေ ဝေဆာနေလိမ့်မယ်လို့ ကိုယ် ယုံကြည်ပါတယ်။

${her(0)} နဲ့ စတင်ဆုံတွေ့ခဲ့ရတဲ့ နေ့ရက်ကလေးကစလို့ ကိုယ့်ရဲ့ ဘဝတစ်ခုလုံးဟာ ပိုမို အဓိပ္ပာယ်ရှိပြီး ပျော်စရာတွေနဲ့ ပြည့်နှက်သွားခဲ့ရတာပါ။ ${her(1)} ရဲ့ အပြုံး၊ ${her(0)} ရဲ့ ရယ်သံနဲ့ မင်းရဲ့ ဂရုစိုက်မှုလေးတွေဟာ ကိုယ့်အတွက်တော့ ကမ္ဘာပေါ်မှာ အလှဆုံး လက်ဆောင်ပါပဲ။

တစ်ခါတစ်လေ ကိုယ် ပင်ပန်းနွမ်းနယ်နေချိန်တွေမှာ ${her(1)} ရဲ့ "ဂရုစိုက်နော်" ဆိုတဲ့ စကားတစ်ခွန်းတည်းနဲ့တင် ကိုယ့် စိတ်ထဲမှာ နွေးထွေးသွားရပါတယ်။ မင်းနဲ့အတူ ရှိနေရတဲ့ စက္ကန့်တိုင်းကို ကိုယ် အရမ်း မြတ်နိုးရပါတယ်။

ရှေ့ဆက်လျှောက်လှမ်းရမယ့် နေ့ရက်တိုင်းမှာလည်း ${her(0)} ရဲ့ လက်ကလေးကို တင်းတင်းဆုပ်ကိုင်ထားရင်း၊ ${her(1)} ကို ပိုမို ပျော်ရွှင်အောင် ထာဝရ ချစ်ပေးသွားပါမယ်လို့ ကိုယ် ကတိပေးပါတယ်။

တို့နှစ်ယောက်ရဲ့ ဒီနေ့ Date Night လေးဟာလည်း အမြဲတမ်း အမှတ်တရ ဖြစ်ကျန်ရစ်မယ့် သိပ်လှတဲ့ ညလေးတစ်ည ဖြစ်ပါစေနော်... ❤️

${her(0)} ကို သိပ်ချစ်သော...
ကိုယ် ❤️`;

export const Page7LoveLetter: React.FC<Page7Props> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < FULL_LOVE_LETTER_MM.length) {
        setTypedText(FULL_LOVE_LETTER_MM.slice(0, index + 1));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 45); // Typing effect speed

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl text-white text-xs font-semibold border border-white/30 shadow-sm mb-3">
          <Feather className="w-3.5 h-3.5 text-amber-200" />
          {her(1)} အတွက် သီးသန့် ချစ်စာလွှာ 📜
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-myanmar leading-tight drop-shadow-sm">
          စာအိတ်ကလေးကို နှိပ်ပြီး ဖတ်ကြည့်ပါ ✉️❤️
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed-envelope"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center justify-center my-10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenLetter}
              className="w-72 sm:w-80 h-52 bg-[#faedcd] dark:bg-[#2b1700] text-[#3d2314] dark:text-[#faedcd] backdrop-blur-2xl rounded-[32px] shadow-2xl border-2 border-amber-300 flex flex-col items-center justify-center p-6 cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-full bg-[#3d2314] flex items-center justify-center mb-3 border border-amber-200 shadow-inner">
                <Mail className="w-8 h-8 text-amber-200 animate-bounce" />
              </div>
              <span className="text-lg font-extrabold font-myanmar text-[#3d2314] dark:text-amber-200">စာအိတ်ဖွင့်ရန် နှိပ်ပါ ✉️</span>
              <span className="text-xs text-[#5c3821] dark:text-amber-100/80 mt-1 font-myanmar">
                ({her(0)} အတွက် သီးသန့် ရေးသားထားသော စာ)
              </span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="open-letter"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-[#faedcd] dark:bg-[#2a1306] backdrop-blur-3xl p-6 sm:p-10 rounded-[36px] border-2 border-amber-300 shadow-2xl relative my-6 text-[#3d2314] dark:text-[#faedcd]"
          >
            <div className="absolute top-4 right-4 flex items-center gap-1 text-[#8c5638] dark:text-amber-300 text-xs font-bold font-myanmar">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ကိုယ်တိုင်ရေး သဝဏ်လွှာ</span>
            </div>

            <div className="text-[#3d2314] dark:text-[#faedcd] font-myanmar leading-relaxed text-sm sm:text-base whitespace-pre-line min-h-[280px]">
              {typedText}
              {!isTypingDone && <span className="animate-pulse text-amber-600 font-bold ml-1">|</span>}
            </div>

            {isTypingDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 pt-4 border-t border-amber-300/40 flex justify-end"
              >
                <div className="text-right">
                  <div className="w-12 h-12 bg-[#3d2314] rounded-full flex items-center justify-center ml-auto mb-1 border border-amber-200 shadow-md">
                    <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
                  </div>
                  <span className="text-xs text-[#5c3821] dark:text-amber-200 font-bold font-myanmar">
                    ထာဝရ ချစ်ခြင်းများစွာဖြင့်...
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      {isOpen && (
        <div className="mt-8 text-center">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-8 py-4 text-lg font-extrabold text-[#3d2314] bg-[#faedcd] rounded-[24px] shadow-lg hover:bg-[#fefae0] transition-all font-myanmar cursor-pointer inline-flex items-center gap-2"
          >
            <span>Date အတည်ပြုချက် ကြည့်မယ် 💖</span>
            <ArrowRight className="w-5 h-5 text-[#3d2314]" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

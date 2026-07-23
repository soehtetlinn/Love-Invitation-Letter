import React, { useState } from 'react';
import { motion } from 'motion/react';
import { REASONS_WHY_I_LOVE_YOU } from '../../data/reasons';
import { Sparkles, Heart, Smile, HeartHandshake, Music, Gem, ArrowRight, RotateCw } from 'lucide-react';

interface Page6Props {
  onNext: () => void;
}

export const Page6Reasons: React.FC<Page6Props> = ({ onNext }) => {
  const [flippedMap, setFlippedMap] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const flippedCount = Object.values(flippedMap).filter(Boolean).length;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smile':
        return <Smile className="w-8 h-8 text-white" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-8 h-8 text-white" />;
      case 'Music':
        return <Music className="w-8 h-8 text-white" />;
      case 'Gem':
        return <Gem className="w-8 h-8 text-white" />;
      default:
        return <Heart className="w-8 h-8 text-white fill-white" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl text-white text-xs font-semibold border border-white/30 shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          ရင်ထဲက စကားများ 💌
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-myanmar leading-tight drop-shadow-sm">
          ကိုယ် တစ်ခွန်း ကို ချစ်ရတဲ့ အကြောင်းအရင်းများ 💌
        </h2>
        <p className="text-xs sm:text-sm text-white/80 mt-2 font-myanmar">
          ကတ်ကလေးများကို လှန်ကြည့်ပြီး ကိုယ့်ရဲ့ ရင်ခုန်သံတွေကို ဖတ်ကြည့်ပါ... ({flippedCount}/{REASONS_WHY_I_LOVE_YOU.length})
        </p>
      </div>

      {/* 3D Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {REASONS_WHY_I_LOVE_YOU.map((reason) => {
          const isFlipped = !!flippedMap[reason.id];

          return (
            <div
              key={reason.id}
              className="h-64 perspective-1000 cursor-pointer"
              onClick={() => toggleFlip(reason.id)}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full h-full rounded-[32px] shadow-xl transition-all"
              >
                {/* FRONT OF CARD */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className="absolute inset-0 rounded-[32px] bg-white/20 backdrop-blur-2xl p-6 text-white flex flex-col justify-between border border-white/40 shadow-xl"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/30 backdrop-blur-md rounded-2xl border border-white/30">
                      {renderIcon(reason.iconName)}
                    </div>
                    <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-bold flex items-center gap-1 font-myanmar border border-white/30">
                      <RotateCw className="w-3 h-3 text-amber-200" /> လှန်ရန်
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black font-myanmar mb-2 text-white">
                      {reason.titleMm}
                    </h3>
                    <p className="text-xs text-white/80 font-myanmar line-clamp-2">
                      {reason.shortMm}
                    </p>
                  </div>
                </div>

                {/* BACK OF CARD */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className="absolute inset-0 rounded-[32px] bg-[#faedcd] dark:bg-[#2a1306] backdrop-blur-3xl p-6 border-2 border-amber-300 text-[#3d2314] dark:text-[#faedcd] flex flex-col justify-between shadow-2xl"
                >
                  <div className="flex items-center gap-2 text-[#5c3821] dark:text-amber-200 font-bold text-sm font-myanmar border-b border-amber-300/40 pb-2">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>{reason.titleMm}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-myanmar leading-relaxed text-[#3d2314] dark:text-[#faedcd] my-auto font-medium">
                    {reason.fullMessageMm}
                  </p>

                  <div className="text-[10px] text-[#8c5638] dark:text-amber-300 font-bold text-right font-myanmar">
                    ~ ကိုယ့်ရဲ့ ရင်ထဲမှ ❤️
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Next Button */}
      <div className="mt-10 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-8 py-4 text-lg font-extrabold text-[#3d2314] bg-[#faedcd] rounded-[24px] shadow-lg hover:bg-[#fefae0] transition-all font-myanmar cursor-pointer inline-flex items-center gap-2"
        >
          <span>ချစ်စာလွှာ ဖတ်ကြည့်မယ် ✉️</span>
          <ArrowRight className="w-5 h-5 text-[#3d2314]" />
        </motion.button>
      </div>
    </div>
  );
};

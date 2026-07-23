import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOVE_TIMELINE_MEMORIES } from '../../data/timeline';
import { MemoryItem } from '../../types';
import { her } from '../../data/partner';
import { Sparkles, Heart, MapPin, Calendar, X, ArrowRight } from 'lucide-react';

interface Page5Props {
  onNext: () => void;
}

export const Page5LoveStory: React.FC<Page5Props> = ({ onNext }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 select-none">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl text-white text-xs font-semibold border border-white/30 shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          တို့နှစ်ယောက်ရဲ့ ချစ်ခြင်းကမ္ဘာ 💖
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-myanmar leading-tight drop-shadow-sm">
          {her(1)} နဲ့ ကိုယ် ရဲ့ အမှတ်တရ လမ်းကလေး 💖
        </h2>
        <p className="text-xs sm:text-sm text-white/80 mt-2 font-myanmar">
          ဆုံတွေ့ခဲ့တဲ့ စက္ကန့်လေးကနေ ဒီနေ့အထိ အဖိုးတန်ခဲ့သော အချိန်များ...
        </p>
      </div>

      {/* Timeline Vertical */}
      <div className="relative border-l-2 border-white/40 ml-4 sm:ml-32 space-y-8 my-8">
        {LOVE_TIMELINE_MEMORIES.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative pl-6 sm:pl-8 group cursor-pointer"
            onClick={() => setSelectedMemory(item)}
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#faedcd] text-[#3d2314] border-2 border-amber-200 shadow-md flex items-center justify-center text-xs group-hover:scale-125 transition-transform">
              <Heart className="w-3.5 h-3.5 fill-[#3d2314]" />
            </div>

            {/* Date Tag Left on Desktop */}
            <div className="hidden sm:block absolute -left-32 top-2 text-right w-24">
              <span className="text-xs font-bold text-white font-myanmar block">
                {item.dateMm}
              </span>
            </div>

            {/* Card Content */}
            <div className="bg-white/25 dark:bg-white/10 backdrop-blur-3xl p-5 rounded-[28px] border border-white/40 dark:border-white/20 shadow-xl hover:bg-white/30 transition-all text-white">
              <div className="sm:hidden text-xs font-bold text-white/90 font-myanmar mb-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {item.dateMm}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-32 h-28 rounded-2xl overflow-hidden flex-shrink-0 relative border border-white/30">
                  <img
                    src={item.imageUrl}
                    alt={item.titleMm}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-md text-amber-200 text-[9px] px-2 py-0.5 rounded-full font-bold">
                    {item.tagMm}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-white font-myanmar mb-1">
                    {item.titleMm}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-myanmar line-clamp-3 leading-relaxed">
                    {item.descriptionMm}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-amber-200 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-white/80" />
                      {item.locationMm}
                    </span>
                    <span className="text-white underline font-bold font-myanmar">
                      အပြည့်အဝ ကြည့်မယ် ✨
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white/30 dark:bg-black/40 backdrop-blur-3xl max-w-lg w-full rounded-[36px] p-6 sm:p-8 border border-white/40 shadow-2xl relative text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-56 rounded-2xl overflow-hidden mb-4 relative border border-white/30">
                <img
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.titleMm}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-xs font-bold text-amber-200 font-myanmar mb-1">
                {selectedMemory.dateMm} • {selectedMemory.locationMm}
              </div>

              <h3 className="text-xl font-extrabold text-white font-myanmar mb-3">
                {selectedMemory.titleMm}
              </h3>

              <p className="text-sm text-white/90 font-myanmar leading-relaxed">
                {selectedMemory.descriptionMm}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      <div className="mt-10 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-8 py-4 text-lg font-extrabold text-[#3d2314] bg-[#faedcd] rounded-[24px] shadow-lg hover:bg-[#fefae0] transition-all font-myanmar cursor-pointer inline-flex items-center gap-2"
        >
          <span>နောက်ထပ် ချစ်စရာ အကြောင်းလေးများ ဖတ်မယ် 💌</span>
          <ArrowRight className="w-5 h-5 text-[#3d2314]" />
        </motion.button>
      </div>
    </div>
  );
};

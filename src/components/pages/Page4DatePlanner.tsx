import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DateSelection, RomanticLocation } from '../../types';
import { ROMANTIC_LOCATIONS } from '../../data/locations';
import { Calendar as CalendarIcon, Clock, MapPin, Star, ExternalLink, Check, Sparkles, Filter, ChevronRight } from 'lucide-react';

interface Page4Props {
  selection: DateSelection;
  onChangeSelection: (newSel: Partial<DateSelection>) => void;
  onNext: () => void;
}

export const Page4DatePlanner: React.FC<Page4Props> = ({ selection, onChangeSelection, onNext }) => {
  const [activeTab, setActiveTab] = useState<'date' | 'time' | 'location'>('date');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewLocation, setPreviewLocation] = useState<RomanticLocation | null>(null);

  // Default to today or next Saturday if empty
  const todayStr = new Date().toISOString().split('T')[0];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSelection({ date: e.target.value });
  };

  const timeOptions = [
    { key: 'sunset', labelMm: '🌅 နေဝင်ချိန် ညနေစာ (Sunset)', time: '17:30 - 19:30' },
    { key: 'dinner', labelMm: '🍽️ ညစာ သီးသန့် (Romantic Dinner)', time: '19:00 - 21:00' },
    { key: 'nightwalk', labelMm: '🌙 ညဘက် လမ်းလျှောက် (Night Walk)', time: '20:30 - 22:30' },
    { key: 'dessert', labelMm: '🍰 မုန့်စား စကားပြော (Dessert & Coffee)', time: '16:00 - 18:00' },
  ];

  const categories = [
    { key: 'all', labelMm: 'အားလုံး 🌟' },
    { key: 'rooftop', labelMm: 'Rooftop 🏙️' },
    { key: 'river', labelMm: 'ကျောက်ဖယားမြစ်ဘေး 🚢' },
    { key: 'dinner', labelMm: 'ညစာ 🍽️' },
    { key: 'park', labelMm: 'ပန်းခြံ 🌳' },
    { key: 'cafe', labelMm: 'ကဖေး ☕' },
  ];

  const filteredLocations = selectedCategory === 'all'
    ? ROMANTIC_LOCATIONS
    : ROMANTIC_LOCATIONS.filter((loc) => loc.category === selectedCategory);

  const selectedLocObj = ROMANTIC_LOCATIONS.find((l) => l.id === selection.locationId);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-4 select-none">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl text-white text-xs font-semibold border border-white/30 shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          တစ်ခွန်း ရဲ့ စိတ်ကြိုက် Date အစီအစဉ် 💖
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-myanmar leading-tight drop-shadow-sm">
          ဒီနေ့ရဲ့ Date ကို တစ်ခွန်း ရွေးပေးနော် ❤️
        </h2>
        <p className="text-xs sm:text-sm text-white/80 mt-2 font-myanmar">
          ရက်စွဲ၊ အချိန်နဲ့ သွားချင်တဲ့ နေရာလေးကို စိတ်ကြိုက် ရွေးချယ်ပေးပါ...
        </p>
      </div>

      {/* Step Tabs Header */}
      <div className="flex justify-center gap-2 mb-8 bg-white/20 dark:bg-white/10 backdrop-blur-xl p-1.5 rounded-2xl border border-white/30 shadow-sm max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('date')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-myanmar transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'date'
              ? 'bg-[#faedcd] text-[#3d2314] shadow-md'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <CalendarIcon className="w-4 h-4" />
          <span>၁။ ရက်စွဲ</span>
          {selection.date && <Check className="w-3.5 h-3.5 text-amber-300" />}
        </button>

        <button
          onClick={() => setActiveTab('time')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-myanmar transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'time'
              ? 'bg-[#faedcd] text-[#3d2314] shadow-md'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>၂။ အချိန်</span>
          {selection.time && <Check className="w-3.5 h-3.5 text-amber-300" />}
        </button>

        <button
          onClick={() => setActiveTab('location')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-myanmar transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'location'
              ? 'bg-[#faedcd] text-[#3d2314] shadow-md'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>၃။ နေရာ</span>
          {selection.locationId && <Check className="w-3.5 h-3.5 text-amber-300" />}
        </button>
      </div>

      {/* Tab Content Panels */}
      <div className="bg-white/25 dark:bg-white/10 backdrop-blur-3xl p-6 sm:p-8 rounded-[36px] border border-white/40 dark:border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] min-h-[380px] text-white">
        {/* TAB 1: DATE */}
        {activeTab === 'date' && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="max-w-md mx-auto text-center">
            <CalendarIcon className="w-12 h-12 text-white mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-white font-myanmar mb-2">
              ဘယ်နေ့ သွားကြမလဲ အချစ်? 🗓️
            </h3>
            <p className="text-xs text-white/80 mb-6 font-myanmar">
              အပတ်စဉ် စနေ/တနင်္ဂနွေနေ့တွေမှာ သွားရတာ ပိုရိုမန်းတစ်ဆန်ပါတယ် ❤️
            </p>

            <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-white/30 mb-6">
              <label className="block text-xs font-bold text-white mb-2 font-myanmar text-left">
                ရက်စွဲ ရွေးချယ်ပါ:
              </label>
              <input
                type="date"
                min={todayStr}
                value={selection.date}
                onChange={handleDateChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-[#faedcd] text-[#3d2314] font-extrabold focus:outline-none focus:ring-2 focus:ring-amber-300 text-center shadow-inner"
              />
            </div>

            <div className="p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-xs text-white font-myanmar flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-200 flex-shrink-0" />
              <span>စနေ/တနင်္ဂနွေနေ့တွေမှာ ဘန်ကောက်မြို့ရဲ့ နေဝင်ချိန်ညအလှဟာ အထူးသဖြင့် ပိုမိုလှပပါတယ် ✨</span>
            </div>

            <button
              onClick={() => setActiveTab('time')}
              className="mt-8 px-8 py-3.5 bg-[#faedcd] text-[#3d2314] font-extrabold rounded-[24px] shadow-lg hover:bg-[#fefae0] hover:scale-105 transition-all font-myanmar cursor-pointer inline-flex items-center gap-2"
            >
              <span>ချိန်စက်မှု ရွေးမယ်</span>
              <ChevronRight className="w-4 h-4 text-[#3d2314]" />
            </button>
          </motion.div>
        )}

        {/* TAB 2: TIME */}
        {activeTab === 'time' && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="max-w-md mx-auto text-center">
            <Clock className="w-12 h-12 text-white mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-white font-myanmar mb-2">
              ဘယ်အချိန် သွားချင်လဲ? ⏰
            </h3>
            <p className="text-xs text-white/80 mb-6 font-myanmar">
              အောက်ပါ အကြံပြုထားသော အချိန်ဇယားများမှ ရွေးချယ်ပါ:
            </p>

            <div className="space-y-3 text-left">
              {timeOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => onChangeSelection({ timeCategory: opt.key as DateSelection['timeCategory'], time: opt.time })}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    selection.timeCategory === opt.key
                      ? 'border-amber-200 bg-[#faedcd] text-[#3d2314] shadow-lg scale-[1.02]'
                      : 'border-white/30 bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <div>
                    <div className={`font-bold font-myanmar text-sm sm:text-base ${selection.timeCategory === opt.key ? 'text-[#3d2314]' : 'text-white'}`}>
                      {opt.labelMm}
                    </div>
                    <div className={`text-xs mt-0.5 ${selection.timeCategory === opt.key ? 'text-[#5c3821]' : 'text-white/80'}`}>
                      {opt.time}
                    </div>
                  </div>
                  {selection.timeCategory === opt.key && (
                    <div className="w-6 h-6 rounded-full bg-[#3d2314] text-amber-200 flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('location')}
              className="mt-8 px-8 py-3.5 bg-[#faedcd] text-[#3d2314] font-extrabold rounded-[24px] shadow-lg hover:bg-[#fefae0] hover:scale-105 transition-all font-myanmar cursor-pointer inline-flex items-center gap-2"
            >
              <span>နေရာ ရွေးမယ်</span>
              <ChevronRight className="w-4 h-4 text-[#3d2314]" />
            </button>
          </motion.div>
        )}

        {/* TAB 3: LOCATION */}
        {activeTab === 'location' && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
              <Filter className="w-4 h-4 text-amber-200 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-myanmar whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.key
                      ? 'bg-[#faedcd] text-[#3d2314] shadow-md'
                      : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
                  }`}
                >
                  {cat.labelMm}
                </button>
              ))}
            </div>

            {/* Location Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[460px] overflow-y-auto p-1 pr-2">
              {filteredLocations.map((loc) => {
                const isSelected = selection.locationId === loc.id;
                return (
                  <motion.div
                    key={loc.id}
                    whileHover={{ y: -4 }}
                    onClick={() => onChangeSelection({ locationId: loc.id })}
                    className={`relative rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${
                      isSelected
                        ? 'border-white ring-2 ring-white bg-white/30 backdrop-blur-2xl shadow-xl'
                        : 'border-white/30 bg-white/10 backdrop-blur-md hover:border-white/50'
                    }`}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={loc.imageUrl}
                        alt={loc.nameMm}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-300" /> {loc.rating}.0
                      </span>
                      <span className="absolute bottom-2 left-2 text-white font-bold text-xs truncate max-w-[85%] font-myanmar">
                        {loc.nameMm}
                      </span>
                    </div>

                    <div className="p-3">
                      <p className="text-[11px] text-white/90 line-clamp-2 font-myanmar mb-2">
                        {loc.taglineMm}
                      </p>

                      <div className="flex items-center justify-between text-[11px] font-semibold text-white/80 pt-2 border-t border-white/20">
                        <span>💰 {loc.budgetMm}</span>
                        <a
                          href={loc.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-0.5 text-amber-200 hover:underline"
                        >
                          <span>Map</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 left-2 bg-[#faedcd] text-[#3d2314] rounded-full p-1 shadow-md border border-amber-300">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Selected Summary & Next Button */}
      {selectedLocObj && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-5 bg-white/25 backdrop-blur-3xl border border-white/40 rounded-[28px] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-myanmar"
        >
          <div className="text-center sm:text-left">
            <div className="text-xs text-white/80">ရွေးချယ်ထားသော Date အချက်အလက်:</div>
            <div className="font-extrabold text-sm sm:text-base text-white">
              📅 {selection.date || todayStr} | ⏰ {selection.time}
            </div>
            <div className="text-xs font-semibold text-amber-200">
              📍 {selectedLocObj.nameMm}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#faedcd] text-[#3d2314] font-extrabold rounded-[24px] shadow-lg hover:bg-[#fefae0] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
          >
            <span>အတည်ပြုပြီး ဆက်သွားမယ် ✨</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

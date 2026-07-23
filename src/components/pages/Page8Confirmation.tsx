import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import QRCode from 'qrcode';
import { DateSelection } from '../../types';
import { ROMANTIC_LOCATIONS } from '../../data/locations';
import { DEFAULT_PARTNER_NAME, PARTNER_NAME_HINT, her } from '../../data/partner';
import { submitInquiry } from '../../lib/inquiriesApi';
import { Heart, Sparkles, Calendar, Clock, MapPin, Download, CheckCircle2, Ticket, QrCode as QrIcon, User } from 'lucide-react';

interface Page8Props {
  selection: DateSelection;
  onChangeSelection: (newSel: Partial<DateSelection>) => void;
}

export const Page8Confirmation: React.FC<Page8Props> = ({ selection, onChangeSelection }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement | null>(null);

  const selectedLoc = ROMANTIC_LOCATIONS.find((l) => l.id === selection.locationId) || ROMANTIC_LOCATIONS[0];
  const partnerName = selection.partnerName || DEFAULT_PARTNER_NAME;

  useEffect(() => {
    // Generate QR code pointing back to current URL
    const currentUrl = window.location.href;
    QRCode.toDataURL(currentUrl, { margin: 1, width: 140, color: { dark: '#3D2314', light: '#FAEDCD' } })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error(err));
  }, []);

  const handleConfirm = async () => {
    setIsConfirmed(true);

    try {
      await submitInquiry({
        ...selection,
        partnerName,
        locationName: selectedLoc.nameMm || selectedLoc.nameEn,
        locationAddress: selectedLoc.addressMm,
      });
    } catch (err) {
      console.error('Failed to save inquiry:', err);
    }

    // Huge Heart Rain & Fireworks Explosion
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: ['#FF6FAE', '#FFD6E7', '#FF1493', '#E8A3A8', '#FFD700'],
      });
      confetti({
        particleCount: 10,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: ['#FF6FAE', '#FFD6E7', '#FF1493', '#E8A3A8', '#FFD700'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(ticketRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `Date_Night_Ticket_${partnerName.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download ticket:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl text-white text-xs font-semibold border border-white/30 shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          အတည်ပြုခြင်းနှင့် လက်မှတ် ✨
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-myanmar leading-tight drop-shadow-sm">
          {her(0)} နဲ့ Date Night အတည်ပြုချက် 💖
        </h2>
        <p className="text-xs sm:text-sm text-white/80 mt-2 font-myanmar">
          {her(1)} ရွေးချယ်ထားသော အစီအစဉ်များ အဆင်သင့်ဖြစ်ပါပြီ...
        </p>
      </div>

      {!isConfirmed ? (
        /* Summary Card Before Confirmation */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/25 dark:bg-white/10 backdrop-blur-3xl p-6 sm:p-8 rounded-[36px] border border-white/40 dark:border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] space-y-6 text-white"
        >
          {/* Her Name Input */}
          <div className="bg-white/20 backdrop-blur-xl p-4 rounded-2xl border border-white/30">
            <label className="block text-xs font-bold text-white mb-1.5 font-myanmar flex items-center gap-1.5">
              <User className="w-4 h-4 text-white" />
              အချစ်ဆုံး {her(1)} ရဲ့ နာမည်/ခေါ်စနိုး နာမည်လေး ထည့်ပါ:
            </label>
            <input
              type="text"
              value={selection.partnerName || ''}
              onChange={(e) => onChangeSelection({ partnerName: e.target.value })}
              placeholder={`ဥပမာ - ${PARTNER_NAME_HINT} / အချစ် / Darling`}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#faedcd] text-[#3d2314] font-bold font-myanmar focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm shadow-inner"
            />
          </div>

          {/* Details Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-white flex-shrink-0" />
              <div>
                <div className="text-[10px] text-amber-200 font-bold uppercase">Date</div>
                <div className="text-sm font-extrabold text-white font-myanmar">
                  {selection.date || '၂၀၂၆-၀၇-၂၅'}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center gap-3">
              <Clock className="w-8 h-8 text-white flex-shrink-0" />
              <div>
                <div className="text-[10px] text-amber-200 font-bold uppercase">Time</div>
                <div className="text-sm font-extrabold text-white font-myanmar">
                  {selection.time || '18:30'}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-white flex-shrink-0" />
              <div>
                <div className="text-[10px] text-amber-200 font-bold uppercase">Location</div>
                <div className="text-sm font-extrabold text-white font-myanmar truncate max-w-[140px]">
                  {selectedLoc.nameMm}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Location Card */}
          <div className="rounded-2xl border border-white/30 overflow-hidden flex flex-col sm:flex-row bg-white/20 backdrop-blur-xl">
            <div className="sm:w-2/5 h-40 sm:h-auto overflow-hidden relative border-r border-white/20">
              <img
                src={selectedLoc.imageUrl}
                alt={selectedLoc.nameMm}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 sm:w-3/5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] bg-white/30 text-white font-bold px-2.5 py-0.5 rounded-full border border-white/30">
                  {selectedLoc.category.toUpperCase()}
                </span>
                <h4 className="text-lg font-bold text-white font-myanmar mt-1">
                  {selectedLoc.nameMm}
                </h4>
                <p className="text-xs text-white/80 font-myanmar mt-1">
                  {selectedLoc.descriptionMm}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/20 text-xs font-semibold text-white/90 font-myanmar">
                📍 {selectedLoc.addressMm} • 💰 {selectedLoc.budgetMm}
              </div>
            </div>
          </div>

          {/* Emotional Message */}
          <div className="text-center py-2">
            <p className="text-base sm:text-lg font-bold text-white font-myanmar drop-shadow-sm">
              "ကိုယ် {her(0)} နဲ့ ဒီနေ့လေးကို အရမ်းစောင့်မျှော်နေပါတယ် ❤️"
            </p>
          </div>

          {/* Large Confirm Button */}
          <div className="text-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConfirm}
              className="w-full sm:w-auto px-10 py-4 text-xl font-extrabold text-[#3d2314] bg-[#faedcd] rounded-[24px] shadow-lg hover:bg-[#fefae0] transition-all font-myanmar cursor-pointer flex items-center justify-center gap-2 mx-auto"
            >
              <span>အချစ်နဲ့ Confirm လုပ်မယ် 💖</span>
            </motion.button>
          </div>
        </motion.div>
      ) : (
        /* After Confirmation: Grand Fireworks Celebration & Digital Ticket */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          {/* Confirmed Celebration Header */}
          <div className="text-center bg-white/25 backdrop-blur-3xl text-white p-6 rounded-[32px] border border-white/40 shadow-xl font-myanmar">
            <h3 className="text-3xl font-black mb-2 animate-bounce drop-shadow-sm">
              {her(1)} ကို အရမ်းချစ်တယ် ❤️
            </h3>
            <p className="text-sm text-white/90">
              တို့နှစ်ယောက်ရဲ့ Date Night လက်မှတ်လေး ထွက်ရှိလာပါပြီ!
            </p>
          </div>

          {/* Downloadable Digital Ticket Element */}
          <div className="flex justify-center">
            <div
              ref={ticketRef}
              className="w-full max-w-md bg-[#2b1404] backdrop-blur-2xl text-amber-100 p-6 sm:p-8 rounded-[36px] border-4 border-amber-300 shadow-2xl relative overflow-hidden font-myanmar"
              style={{
                backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(212, 163, 115, 0.2) 0%, transparent 40%)',
              }}
            >
              {/* Luxury Watermark & Gold Accents */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full border-8 border-amber-400/20 pointer-events-none" />
              <div className="absolute top-3 right-4 text-[10px] bg-amber-300 text-[#3d2314] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Ticket className="w-3 h-3" /> Reserved For Two
              </div>

              {/* Ticket Title */}
              <div className="border-b-2 border-dashed border-amber-300/40 pb-4 mb-4">
                <div className="text-xs text-amber-300 font-bold tracking-widest uppercase">
                  SPECIAL VIP DATE PASS
                </div>
                <h3 className="text-2xl font-black text-amber-50 mt-1">
                  DATE NIGHT TICKET 💖
                </h3>
              </div>

              {/* Ticket Details Grid */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-amber-300/20">
                  <span className="text-amber-200/80 text-xs">For My Love:</span>
                  <span className="font-extrabold text-amber-200 text-base">{partnerName}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-amber-300/20">
                  <span className="text-amber-200/80 text-xs">Date:</span>
                  <span className="font-bold text-white">{selection.date || '၂၀၂၆-၀၇-၂၅'}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-amber-300/20">
                  <span className="text-amber-200/80 text-xs">Time:</span>
                  <span className="font-bold text-white">{selection.time || '18:30'}</span>
                </div>

                <div className="py-1 border-b border-amber-300/20">
                  <div className="text-amber-200/80 text-xs mb-0.5">Location:</div>
                  <div className="font-extrabold text-amber-200 text-sm">
                    {selectedLoc.nameMm}
                  </div>
                  <div className="text-[11px] text-amber-100/70 mt-0.5">
                    {selectedLoc.addressMm}
                  </div>
                </div>
              </div>

              {/* Bottom QR Code & Pass ID */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-amber-300/40 flex items-center justify-between">
                <div>
                  <div className="text-[9px] text-amber-200/80 uppercase tracking-widest">
                    PASS CODE
                  </div>
                  <div className="text-xs font-mono font-bold text-amber-300">
                    LOVE-2026-FOREVER
                  </div>
                  <div className="text-[10px] text-amber-100/80 mt-1">
                    Valid for Lifetime Happiness ❤️
                  </div>
                </div>

                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    className="w-16 h-16 rounded-xl border-2 border-amber-300 shadow-md bg-[#faedcd] p-1"
                  />
                ) : (
                  <QrIcon className="w-12 h-12 text-amber-300" />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadTicket}
              disabled={isDownloading}
              className="px-8 py-4 text-base font-extrabold text-[#3d2314] bg-[#faedcd] rounded-[24px] shadow-lg hover:bg-[#fefae0] transition-all font-myanmar cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5 text-[#3d2314]" />
              <span>{isDownloading ? 'ဒေါင်းလုဒ်ဆွဲနေပါသည်...' : 'Ticket ဒေါင်းလုဒ်ဆွဲမယ် 📲 (PNG)'}</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

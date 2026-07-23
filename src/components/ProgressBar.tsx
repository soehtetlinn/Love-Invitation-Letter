import React from 'react';
import { Heart, Lock, CheckCircle2 } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
  maxUnlockedStep: number;
}

const STEP_TITLES_MM: Record<number, string> = {
  1: 'မိတ်ဆက် 💌',
  2: 'စာအိတ် ✉️',
  3: 'ဖိတ်ခေါ်ချက် 🥺',
  4: 'Date အစီအစဉ် 🗓️',
  5: 'တို့အမှတ်တရ 💖',
  6: 'ချစ်ရတဲ့အကြောင်း 💌',
  7: 'ချစ်စာလွှာ 📜',
  8: 'အတည်ပြုချက် 💖',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  onStepClick,
  maxUnlockedStep,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-3 z-30 relative select-none">
      <div className="flex items-center justify-between mb-1.5 text-xs font-semibold text-white">
        <span className="flex items-center gap-1.5 bg-white/20 dark:bg-white/10 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/30 shadow-md">
          <Heart className="w-3.5 h-3.5 text-white fill-white animate-pulse" />
          <span>❤️ Step {currentStep} / {totalSteps}</span>
        </span>
        <span className="text-[11px] font-medium bg-white/20 backdrop-blur-xl text-white px-3 py-1 rounded-full border border-white/30 shadow-sm">
          {STEP_TITLES_MM[currentStep] || ''}
        </span>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-black/30 backdrop-blur-md rounded-full h-3 p-0.5 border border-amber-200/20 shadow-inner overflow-hidden relative">
        <div
          className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 h-full rounded-full transition-all duration-700 ease-out shadow-md shadow-amber-300/40"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center mt-2 px-0.5">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCurrent = step === currentStep;
          const isCompleted = step < currentStep;
          const isUnlocked = step <= maxUnlockedStep;

          return (
            <button
              key={step}
              disabled={!isUnlocked}
              onClick={() => isUnlocked && onStepClick && onStepClick(step)}
              className={`relative group flex items-center justify-center transition-all duration-300 ${
                isUnlocked ? 'cursor-pointer hover:scale-125' : 'cursor-not-allowed opacity-40'
              }`}
              title={STEP_TITLES_MM[step]}
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all shadow-sm ${
                  isCurrent
                    ? 'bg-[#faedcd] text-[#3d2314] ring-2 ring-amber-200/80 scale-110 shadow-lg'
                    : isCompleted
                    ? 'bg-amber-100/30 text-amber-100 backdrop-blur-md border border-amber-200/30'
                    : 'bg-white/10 text-white/50 backdrop-blur-xs border border-white/20'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-200" />
                ) : isUnlocked ? (
                  step
                ) : (
                  <Lock className="w-2.5 h-2.5 text-white/50" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

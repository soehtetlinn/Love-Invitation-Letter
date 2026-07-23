import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DateSelection } from './types';
import { FloatingParticles } from './components/FloatingParticles';
import { FloatingCursor } from './components/FloatingCursor';
import { AudioPlayerWidget } from './components/AudioPlayerWidget';
import { ProgressBar } from './components/ProgressBar';
import { EasterEggToast } from './components/EasterEggToast';

import { Page1Intro } from './components/pages/Page1Intro';
import { Page2Envelope } from './components/pages/Page2Envelope';
import { Page3Proposal } from './components/pages/Page3Proposal';
import { Page4DatePlanner } from './components/pages/Page4DatePlanner';
import { Page5LoveStory } from './components/pages/Page5LoveStory';
import { Page6Reasons } from './components/pages/Page6Reasons';
import { Page7LoveLetter } from './components/pages/Page7LoveLetter';
import { Page8Confirmation } from './components/pages/Page8Confirmation';

import { Moon, Sun, Heart, Sparkles } from 'lucide-react';
import { DEFAULT_PARTNER_NAME } from './data/partner';
import { randomRomanticQuote } from './data/quotes';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [easterEggToast, setEasterEggToast] = useState<string | null>(null);

  const [dateSelection, setDateSelection] = useState<DateSelection>({
    date: new Date().toISOString().split('T')[0],
    time: '18:30',
    timeCategory: 'sunset',
    locationId: 'vertigo-rooftop',
    partnerName: DEFAULT_PARTNER_NAME,
  });

  const handleNextStep = () => {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, 8);
      if (next > maxUnlockedStep) {
        setMaxUnlockedStep(next);
      }
      return next;
    });
  };

  const handleStepClick = (step: number) => {
    if (step <= maxUnlockedStep) {
      setCurrentStep(step);
    }
  };

  const updateDateSelection = (newSel: Partial<DateSelection>) => {
    setDateSelection((prev) => ({ ...prev, ...newSel }));
  };

  const handleHeaderHeartClick = () => {
    setEasterEggToast((prev) => randomRomanticQuote(prev));
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_#4a2612_0%,_#1c0c04_100%)] dark:bg-[radial-gradient(ellipse_at_center,_#2b1306_0%,_#0a0301_100%)] text-white transition-colors duration-500 relative overflow-x-hidden font-sans">
        {/* Ambient Decorative Glass Chocolate & Gold Glows */}
        <div className="absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-80 sm:w-96 h-80 sm:h-96 bg-amber-900/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-72 sm:w-80 h-72 sm:h-80 bg-yellow-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Particles Canvas */}
        <FloatingParticles />

        {/* Interactive Floating Hearts Cursor */}
        <FloatingCursor />

        {/* Floating Audio Player */}
        <AudioPlayerWidget />

        {/* Easter Egg Toast Notification */}
        <EasterEggToast
          message={easterEggToast}
          onClose={() => setEasterEggToast(null)}
        />

        {/* Top Floating Bar */}
        <header className="relative z-30 pt-4 px-4 max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handleHeaderHeartClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/40 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all text-white text-xs font-bold font-myanmar"
            title="အချစ်နှလုံးသားလေး"
          >
            <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
            <span>ဒါလေးကိုနှိပ်ကြည့်</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          </button>

          {/* Night Mode / Day Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/40 shadow-lg cursor-pointer hover:scale-110 transition-transform text-white"
            title="Theme Toggle"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-white" />}
          </button>
        </header>

        {/* Story Progress Indicator */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={8}
          maxUnlockedStep={maxUnlockedStep}
          onStepClick={handleStepClick}
        />

        {/* Main Story Container with Smooth Page Transitions */}
        <main className="relative z-10 container mx-auto pb-20 pt-2 min-h-[70vh] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Page1Intro
                  onNext={handleNextStep}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Page2Envelope
                  onNext={handleNextStep}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Page3Proposal
                  onNext={handleNextStep}
                  onTriggerToast={(msg) => setEasterEggToast(msg)}
                />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Page4DatePlanner
                  selection={dateSelection}
                  onChangeSelection={updateDateSelection}
                  onNext={handleNextStep}
                />
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Page5LoveStory onNext={handleNextStep} />
              </motion.div>
            )}

            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Page6Reasons onNext={handleNextStep} />
              </motion.div>
            )}

            {currentStep === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Page7LoveLetter
                  onNext={handleNextStep}
                />
              </motion.div>
            )}

            {currentStep === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Page8Confirmation
                  selection={dateSelection}
                  onChangeSelection={updateDateSelection}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

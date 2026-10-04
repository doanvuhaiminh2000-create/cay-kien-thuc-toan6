import React, { useState, useEffect, useRef } from 'react';
import { FruitContent, BRANCHES } from '../content.ts';
import { MathIllustration } from './MathIllustration.tsx';
import { X, ArrowRight, ArrowLeft, Bookmark, Lightbulb, Compass, Sparkles, BookOpen } from 'lucide-react';

interface KnowledgeModalProps {
  fruit: FruitContent | null;
  onClose: () => void;
  onNextFruit: () => void;
  onPrevFruit: () => void;
  onCompleteFruit?: (fruitId: number) => void;
  animate?: boolean;
}

export const KnowledgeModal: React.FC<KnowledgeModalProps> = ({
  fruit,
  onClose,
  onNextFruit,
  onPrevFruit,
  onCompleteFruit,
  animate = true,
}) => {
  // Active tier: 1 | 2 | 3
  const [currentTier, setCurrentTier] = useState<1 | 2 | 3>(1);
  const touchStartXRef = useRef<number | null>(null);

  // Reset to tier 1 when opening a new fruit
  useEffect(() => {
    if (fruit) {
      setCurrentTier(1);
    }
  }, [fruit?.id]);

  // Trigger celebration when reaching Tier 3 (completion of all 3 tiers)
  useEffect(() => {
    if (fruit && currentTier === 3 && onCompleteFruit) {
      onCompleteFruit(fruit.id);
    }
  }, [fruit?.id, currentTier, onCompleteFruit]);

  // Keyboard navigation for presentation mode:
  // - Right Arrow or Space: Next tier; if tier 3 -> Next fruit
  // - Left Arrow: Prev tier; if tier 1 -> Prev fruit
  // - Esc: Close
  useEffect(() => {
    if (!fruit) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentTier < 3) {
          setCurrentTier((prev) => (prev + 1) as 1 | 2 | 3);
        } else {
          onNextFruit();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentTier > 1) {
          setCurrentTier((prev) => (prev - 1) as 1 | 2 | 3);
        } else {
          onPrevFruit();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fruit, currentTier, onClose, onNextFruit, onPrevFruit]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left -> next
        if (currentTier < 3) {
          setCurrentTier((prev) => (prev + 1) as 1 | 2 | 3);
        } else {
          onNextFruit();
        }
      } else {
        // Swiped right -> prev
        if (currentTier > 1) {
          setCurrentTier((prev) => (prev - 1) as 1 | 2 | 3);
        } else {
          onPrevFruit();
        }
      }
    }
    touchStartXRef.current = null;
  };

  if (!fruit) return null;

  const branch = BRANCHES[fruit.branchId];

  // Theme styling based on branch/fruit color
  const themeStyles = {
    red: {
      border: 'border-rose-400',
      headerBg: 'bg-rose-600',
      activeTab: 'bg-rose-600 text-white shadow-sm font-semibold',
      inactiveTab: 'bg-rose-50 text-rose-800 hover:bg-rose-100',
      pillBg: 'bg-rose-100 text-rose-900 border border-rose-200',
      accentText: 'text-rose-700',
      cardGlow: 'shadow-2xl shadow-rose-900/20',
      noteCard: 'bg-gradient-to-br from-amber-50 to-rose-50 border-2 border-rose-300 shadow-md text-rose-950',
      noteIcon: 'text-rose-600',
      nextBtn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md',
      prevBtn: 'bg-white hover:bg-rose-50 text-rose-700 border border-rose-300',
      indicatorDot: 'bg-rose-600',
    },
    purple: {
      border: 'border-purple-400',
      headerBg: 'bg-purple-700',
      activeTab: 'bg-purple-700 text-white shadow-sm font-semibold',
      inactiveTab: 'bg-purple-50 text-purple-800 hover:bg-purple-100',
      pillBg: 'bg-purple-100 text-purple-900 border border-purple-200',
      accentText: 'text-purple-700',
      cardGlow: 'shadow-2xl shadow-purple-900/20',
      noteCard: 'bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 shadow-md text-purple-950',
      noteIcon: 'text-purple-600',
      nextBtn: 'bg-purple-700 hover:bg-purple-800 text-white shadow-md',
      prevBtn: 'bg-white hover:bg-purple-50 text-purple-700 border border-purple-300',
      indicatorDot: 'bg-purple-600',
    },
    orange: {
      border: 'border-orange-400',
      headerBg: 'bg-amber-600',
      activeTab: 'bg-amber-600 text-white shadow-sm font-semibold',
      inactiveTab: 'bg-amber-50 text-amber-900 hover:bg-amber-100',
      pillBg: 'bg-amber-100 text-amber-900 border border-amber-200',
      accentText: 'text-amber-700',
      cardGlow: 'shadow-2xl shadow-orange-900/20',
      noteCard: 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-md text-amber-950',
      noteIcon: 'text-amber-600',
      nextBtn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-md',
      prevBtn: 'bg-white hover:bg-amber-50 text-amber-800 border border-amber-300',
      indicatorDot: 'bg-amber-600',
    },
  }[fruit.colorTheme];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300 overflow-y-auto"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`relative w-full max-w-4xl bg-white rounded-2xl md:rounded-3xl border-2 ${themeStyles.border} ${themeStyles.cardGlow} overflow-hidden flex flex-col max-h-[96vh] md:max-h-[90vh] my-auto selectable-text transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className={`${themeStyles.headerBg} text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between shrink-0`}>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
              {fruit.fruitNumber}
            </span>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-medium">
                Cành {branch.name}
              </div>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                {fruit.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              title="Đóng (Esc)"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3-TIER PROGRESS TABS */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <button
              onClick={() => setCurrentTier(1)}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                currentTier === 1 ? themeStyles.activeTab : themeStyles.inactiveTab
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Tầng 1 – Khái niệm</span>
            </button>

            <button
              onClick={() => setCurrentTier(2)}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                currentTier === 2 ? themeStyles.activeTab : themeStyles.inactiveTab
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Tầng 2 – Quy tắc & Công thức</span>
            </button>

            <button
              onClick={() => setCurrentTier(3)}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                currentTier === 3 ? themeStyles.activeTab : themeStyles.inactiveTab
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Tầng 3 – Ghi nhớ nhanh</span>
            </button>
          </div>

          {/* Quick Fruit Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <button
              onClick={onPrevFruit}
              className="px-2 py-1 rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 cursor-pointer"
              title="Quả trước"
            >
              ‹ Quả trước
            </button>
            <span className="font-mono text-slate-600 px-1">
              {fruit.fruitNumber}/10
            </span>
            <button
              onClick={onNextFruit}
              className="px-2 py-1 rounded bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 cursor-pointer"
              title="Quả tiếp theo"
            >
              Quả tiếp ›
            </button>
          </div>
        </div>

        {/* MODAL BODY (Spacious, large font, high contrast for projector) */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 flex flex-col justify-between">
          <div className="min-h-[200px]">
            {/* TẦNG 1: KHÁI NIỆM */}
            {currentTier === 1 && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-md ${themeStyles.pillBg}`}>
                    {fruit.tier1.title}
                  </span>
                  <span className="text-xs text-slate-400">| Trình chiếu lớp học</span>
                </div>

                <div className="bg-slate-50/70 p-5 sm:p-7 rounded-2xl border border-slate-200/80">
                  <p className="text-lg sm:text-2xl md:text-[26px] leading-relaxed md:leading-normal font-medium text-slate-800">
                    {fruit.tier1.text}
                  </p>
                </div>
              </div>
            )}

            {/* TẦNG 2: QUY TẮC VÀ CÔNG THỨC */}
            {currentTier === 2 && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-md ${themeStyles.pillBg}`}>
                    {fruit.tier2.title}
                  </span>
                  <span className="text-xs text-slate-400">| Quy tắc & Công thức trọng tâm</span>
                </div>

                <div className="bg-slate-50/70 p-5 sm:p-7 rounded-2xl border border-slate-200/80">
                  <p className="text-lg sm:text-2xl md:text-[25px] leading-relaxed md:leading-normal font-medium text-slate-800">
                    {fruit.tier2.text}
                  </p>
                </div>

                {/* SVG ILLUSTRATION IF SPECIFIED (Shapes, Symmetry, Angle, BarChart, Coin) */}
                {fruit.hasIllustration && (
                  <MathIllustration type={fruit.hasIllustration} animate={animate} />
                )}
              </div>
            )}

            {/* TẦNG 3: GHI NHỚ NHANH */}
            {currentTier === 3 && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs uppercase font-bold tracking-widest px-2.5 py-1 rounded-md ${themeStyles.pillBg}`}>
                    {fruit.tier3.title}
                  </span>
                  <span className="text-xs text-slate-400">| Bí kíp ghi nhớ cốt lõi</span>
                </div>

                {/* Prominent Note Card */}
                <div className={`p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl ${themeStyles.noteCard} relative overflow-hidden`}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white shadow-sm shrink-0">
                      <Bookmark className={`w-8 h-8 sm:w-10 sm:h-10 ${themeStyles.noteIcon}`} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm uppercase tracking-widest font-bold opacity-75 mb-2">
                        BÍ QUYẾT GHI NHỚ MẬT MÃ
                      </div>
                      <blockquote className="text-xl sm:text-3xl md:text-4xl font-extrabold leading-snug tracking-tight">
                        “{fruit.tier3.text}”
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER CONTROLS & NAVIGATION */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {/* Left: Previous step or fruit */}
            <div className="flex items-center gap-2">
              {currentTier > 1 ? (
                <button
                  onClick={() => setCurrentTier((prev) => (prev - 1) as 1 | 2 | 3)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer ${themeStyles.prevBtn}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>‹ Tầng trước</span>
                </button>
              ) : (
                <button
                  onClick={onPrevFruit}
                  className="px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>‹ Quả trước ({fruit.fruitNumber > 1 ? fruit.fruitNumber - 1 : 10})</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl font-medium text-sm text-slate-600 hover:bg-slate-100 transition-all cursor-pointer hidden sm:block"
              >
                Về cây kiến thức
              </button>
            </div>

            {/* Center: Step Dots */}
            <div className="flex items-center gap-2">
              <span
                onClick={() => setCurrentTier(1)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  currentTier === 1 ? `${themeStyles.indicatorDot} scale-125` : 'bg-slate-300'
                }`}
                title="Tầng 1"
              />
              <span
                onClick={() => setCurrentTier(2)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  currentTier === 2 ? `${themeStyles.indicatorDot} scale-125` : 'bg-slate-300'
                }`}
                title="Tầng 2"
              />
              <span
                onClick={() => setCurrentTier(3)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  currentTier === 3 ? `${themeStyles.indicatorDot} scale-125` : 'bg-slate-300'
                }`}
                title="Tầng 3"
              />
            </div>

            {/* Right: Next step or next fruit */}
            <div className="flex items-center gap-2">
              {currentTier < 3 ? (
                <button
                  onClick={() => setCurrentTier((prev) => (prev + 1) as 1 | 2 | 3)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer ${themeStyles.nextBtn}`}
                >
                  <span>Tiếp theo ›</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onNextFruit}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer ${themeStyles.nextBtn}`}
                >
                  <span>Quả tiếp theo ({fruit.fruitNumber < 10 ? fruit.fruitNumber + 1 : 1}) ›</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Classroom Keyboard Helper */}
          <div className="mt-3 text-center text-[11px] text-slate-400 select-none">
            💡 Phím tắt trình chiếu: [→] hoặc [Phím cách] để sang tầng tiếp • [←] quay lại • [Esc] để đóng quả
          </div>
        </div>
      </div>
    </div>
  );
};

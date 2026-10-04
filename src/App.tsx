import React, { useState, useEffect } from 'react';
import { FRUITS_DATA, FruitContent } from './content.ts';
import { TreePhotoInteractive } from './components/TreePhotoInteractive.tsx';
import { KnowledgeModal } from './components/KnowledgeModal.tsx';
import { AiSignModal } from './components/AiSignModal.tsx';
import { SparkleFireworks } from './components/SparkleFireworks.tsx';
import { Maximize, Minimize, Wind, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedFruit, setSelectedFruit] = useState<FruitContent | null>(null);
  const [isAiSignOpen, setIsAiSignOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fireworks celebration state
  const [showFireworks, setShowFireworks] = useState(false);
  const [fireworksTheme, setFireworksTheme] = useState<'red' | 'purple' | 'orange'>('red');

  // Track fruits that have already celebrated fireworks (only trigger on the FIRST completion)
  const [celebratedFruitIds, setCelebratedFruitIds] = useState<Set<number>>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('celebrated_fruit_ids');
        if (saved) return new Set(JSON.parse(saved));
      }
    } catch {}
    return new Set<number>();
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('celebrated_fruit_ids', JSON.stringify(Array.from(celebratedFruitIds)));
      }
    } catch {}
  }, [celebratedFruitIds]);

  // Preference for reduced motion: automatically disable wind & animations if user device prefers reduced motion
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return false;
      }
    } catch {}
    return true;
  });

  // Track which fruits have been viewed
  const [viewedFruitIds, setViewedFruitIds] = useState<Set<number>>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('viewed_fruit_ids');
        if (saved) return new Set(JSON.parse(saved));
      }
    } catch {}
    return new Set<number>();
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('viewed_fruit_ids', JSON.stringify(Array.from(viewedFruitIds)));
      }
    } catch {}
  }, [viewedFruitIds]);

  // Safe Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      try {
        setIsFullscreen(!!document.fullscreenElement);
      } catch {}
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          const p = document.documentElement.requestFullscreen();
          if (p && p.catch) p.catch(() => {});
        }
      } else {
        if (document.exitFullscreen) {
          const p = document.exitFullscreen();
          if (p && p.catch) p.catch(() => {});
        }
      }
    } catch {}
  };

  const handleSelectFruit = (fruit: FruitContent) => {
    setSelectedFruit(fruit);
    setViewedFruitIds((prev) => {
      const next = new Set(prev);
      next.add(fruit.id);
      return next;
    });
  };

  const handleNextFruit = () => {
    if (!selectedFruit) return;
    const currentIndex = FRUITS_DATA.findIndex((f) => f.id === selectedFruit.id);
    const nextIndex = (currentIndex + 1) % FRUITS_DATA.length;
    handleSelectFruit(FRUITS_DATA[nextIndex]);
  };

  const handlePrevFruit = () => {
    if (!selectedFruit) return;
    const currentIndex = FRUITS_DATA.findIndex((f) => f.id === selectedFruit.id);
    const prevIndex = (currentIndex - 1 + FRUITS_DATA.length) % FRUITS_DATA.length;
    handleSelectFruit(FRUITS_DATA[prevIndex]);
  };

  const handleCompleteFruit = (fruitId: number) => {
    if (!animationsEnabled) return;
    if (celebratedFruitIds.has(fruitId)) return;

    const fruit = FRUITS_DATA.find((f) => f.id === fruitId);
    if (!fruit) return;

    setFireworksTheme(fruit.colorTheme);
    setShowFireworks(true);

    setCelebratedFruitIds((prev) => {
      const next = new Set(prev);
      next.add(fruitId);
      return next;
    });

    setTimeout(() => {
      setShowFireworks(false);
    }, 2800);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none font-sans text-slate-900 bg-sky-950">
      {/* Gentle mini fireworks sparkle effect on first completion */}
      <SparkleFireworks
        active={showFireworks && animationsEnabled}
        colorTheme={fireworksTheme}
        onComplete={() => setShowFireworks(false)}
      />

      {/* 1. THANH MENU TRÊN CÙNG:
          - BÊN TRÁI: 2 dòng chữ (Dòng 1: CÂY KIẾN THỨC TOÁN 6; Dòng 2: Hướng dẫn bấm quả)
          - BÊN PHẢI: Căn giữa theo chiều dọc (Nút "Em làm chủ AI", Nút Hiệu ứng, Nút Toàn màn hình) */}
      <header className="absolute top-0 left-0 right-0 z-30 w-full bg-white/20 hover:bg-white/25 backdrop-blur-md border-b border-white/20 px-3 sm:px-6 py-2 flex items-center justify-between shadow-xs transition-colors text-white">
        {/* Góc trái: 2 dòng chữ */}
        <div className="flex flex-col text-left select-none pr-2">
          {/* Dòng 1: Tiêu đề lớn vừa phải, đậm 800, bóng đổ nhẹ */}
          <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-wide text-white uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] leading-tight whitespace-nowrap">
            CÂY KIẾN THỨC TOÁN 6
          </span>
          {/* Dòng 2: Hướng dẫn, độ mờ 85%, cỡ nhỏ */}
          <span className="text-[11px] sm:text-xs text-white/85 font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-tight mt-0.5 whitespace-nowrap">
            <span className="hidden sm:inline">Chạm hoặc bấm vào từng quả trên cây để khám phá 3 tầng kiến thức</span>
            <span className="sm:hidden">Chạm vào quả để khám phá</span>
          </span>
        </div>

        {/* Góc phải: Căn giữa theo chiều dọc */}
        <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0">
          {/* Nút "Em làm chủ AI": viền vàng nhẹ, gọn, không xuống dòng */}
          <button
            onClick={() => setIsAiSignOpen(true)}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-amber-400/90 hover:bg-amber-300 text-amber-950 border border-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-98"
            title="Mở chuyên đề: Em làm chủ AI"
            aria-label="Mở chuyên đề: Em làm chủ AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-900 shrink-0" />
            <span>Em làm chủ AI</span>
          </button>

          {/* Nút bật/tắt hiệu ứng */}
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className={`p-1.5 sm:p-2 rounded-lg border backdrop-blur-xs transition-colors cursor-pointer ${
              animationsEnabled
                ? 'bg-emerald-500/35 text-white border-emerald-300/60 hover:bg-emerald-500/50'
                : 'bg-black/30 text-white/70 border-white/20 hover:bg-black/50'
            }`}
            title={animationsEnabled ? 'Tắt hiệu ứng chuyển động' : 'Bật hiệu ứng chuyển động'}
            aria-label={animationsEnabled ? 'Tắt hiệu ứng chuyển động' : 'Bật hiệu ứng chuyển động'}
          >
            <Wind className={`w-4 h-4 ${animationsEnabled ? 'text-emerald-200' : 'text-slate-300'}`} />
          </button>

          {/* Nút toàn màn hình */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 sm:p-2 rounded-lg bg-black/35 hover:bg-black/55 text-white border border-white/25 shadow-xs backdrop-blur-xs transition-colors cursor-pointer"
            title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Toàn màn hình'}
            aria-label={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Toàn màn hình'}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4" />
            ) : (
              <Maximize className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* 2. MAIN VIEWPORT: VÙNG TRỜI PHÍA TRÊN CÂY ĐỂ TRỐNG THOÁNG ĐÃNG
          ẢNH NỀN TREE_IMAGE PHỦ KÍN 100% TOÀN MÀN HÌNH VỚI 11 QUẢ TÁO & HIỆU ỨNG */}
      <main className="relative z-10 w-full h-full">
        <TreePhotoInteractive
          onSelectFruit={handleSelectFruit}
          viewedFruitIds={viewedFruitIds}
          animate={animationsEnabled}
          isPaused={!!selectedFruit || isAiSignOpen}
        />
      </main>

      {/* 3. DÒNG CHÚ THÍCH MÀU Ở GÓC DƯỚI BÊN PHẢI MÀN HÌNH ĐỔI THEO MÀU VIỀN CHỮ:
          ● Số và Đại số (#5c0a10) ● Hình học và Đo lường (#3a1260) ● Thống kê và Xác suất (#6a2e00) */}
      <div className="absolute bottom-8 right-3 sm:right-5 z-20 pointer-events-none hidden xs:block">
        <div className="text-xs text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-semibold flex items-center gap-2 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/15">
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block border border-white/60 shadow-xs"
              style={{ backgroundColor: '#5c0a10' }}
            />
            <span>Số và Đại số</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block border border-white/60 shadow-xs"
              style={{ backgroundColor: '#3a1260' }}
            />
            <span>Hình học và Đo lường</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block border border-white/60 shadow-xs"
              style={{ backgroundColor: '#6a2e00' }}
            />
            <span>Thống kê và Xác suất</span>
          </span>
        </div>
      </div>

      {/* 4. KNOWLEDGE MODAL (3 TIERS) */}
      <KnowledgeModal
        fruit={selectedFruit}
        onClose={() => setSelectedFruit(null)}
        onNextFruit={handleNextFruit}
        onPrevFruit={handlePrevFruit}
        onCompleteFruit={handleCompleteFruit}
        animate={animationsEnabled}
      />

      {/* 5. "EM LÀM CHỦ AI" TRANG TOÀN MÀN HÌNH */}
      <AiSignModal
        isOpen={isAiSignOpen}
        onClose={() => setIsAiSignOpen(false)}
      />

      {/* 6. CHÂN TRANG: CHỈ GHI ĐÚNG DÒNG THEO YÊU CẦU */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 w-full bg-black/30 backdrop-blur-md border-t border-white/10 py-1.5 px-4 text-center text-xs text-white/90">
        <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-normal text-xs">
          Sản phẩm của lớp 6/23 – Trường THCS Lương Thế Vinh
        </span>
      </footer>
    </div>
  );
}

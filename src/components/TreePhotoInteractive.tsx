import React, { useState, useEffect, useRef } from 'react';
import { TREE_IMAGE } from '../treeImage.ts';
import { FRUITS_DATA, FruitContent } from '../content.ts';
import { Check } from 'lucide-react';

export interface AppleZone {
  id: number;
  label: string; // Tên rút gọn hiển thị trong quả
  fullTitle: string; // Tên đầy đủ hiển thị trong tooltip khi hover/chạm
  category: 'algebra' | 'geometry' | 'statistics';
  strokeColor: string; // Màu viền chữ theo mạch kiến thức
  x: number; // percentage of image width
  y: number; // percentage of image height
  fruitId: number; // 1 to 11
}

export const APPLE_ZONES: AppleZone[] = [
  // SỐ VÀ ĐẠI SỐ (Viền đỏ đậm #5c0a10)
  {
    id: 1,
    label: 'Số tự nhiên',
    fullTitle: 'Số tự nhiên và phép tính',
    category: 'algebra',
    strokeColor: '#5c0a10',
    x: 41.5,
    y: 23.4,
    fruitId: 1,
  },
  {
    id: 2,
    label: 'Chia hết',
    fullTitle: 'Tính chia hết trong tập hợp số tự nhiên',
    category: 'algebra',
    strokeColor: '#5c0a10',
    x: 47.3,
    y: 37.5,
    fruitId: 2,
  },
  {
    id: 3,
    label: 'Số nguyên',
    fullTitle: 'Số nguyên',
    category: 'algebra',
    strokeColor: '#5c0a10',
    x: 35.4,
    y: 39.8,
    fruitId: 3,
  },
  {
    id: 4,
    label: 'Phân số',
    fullTitle: 'Phân số',
    category: 'algebra',
    strokeColor: '#5c0a10',
    x: 45.4,
    y: 55.3,
    fruitId: 4,
  },
  {
    id: 5,
    label: 'Số thập phân',
    fullTitle: 'Số thập phân',
    category: 'algebra',
    strokeColor: '#5c0a10',
    x: 34.6,
    y: 57.4,
    fruitId: 5,
  },
  {
    id: 6,
    label: 'Tỉ số %',
    fullTitle: 'Tỉ số và phần trăm',
    category: 'algebra',
    strokeColor: '#5c0a10',
    x: 52.2,
    y: 25.0,
    fruitId: 6,
  },

  // HÌNH HỌC VÀ ĐO LƯỜNG (Viền tím đậm #3a1260)
  {
    id: 7,
    label: 'Hình phẳng',
    fullTitle: 'Hình học trực quan – Các hình phẳng cơ bản',
    category: 'geometry',
    strokeColor: '#3a1260',
    x: 61.2,
    y: 24.8,
    fruitId: 7,
  },
  {
    id: 8,
    label: 'Đối xứng',
    fullTitle: 'Tính đối xứng của hình phẳng trong tự nhiên',
    category: 'geometry',
    strokeColor: '#3a1260',
    x: 58.7,
    y: 40.0,
    fruitId: 8,
  },
  {
    id: 9,
    label: 'Đường & Góc',
    fullTitle: 'Điểm, đường thẳng và góc',
    category: 'geometry',
    strokeColor: '#3a1260',
    x: 66.8,
    y: 39.3,
    fruitId: 9,
  },

  // THỐNG KÊ VÀ XÁC SUẤT (Viền nâu cam đậm #6a2e00)
  {
    id: 10,
    label: 'Biểu đồ',
    fullTitle: 'Thu thập và biểu diễn dữ liệu – Biểu đồ',
    category: 'statistics',
    strokeColor: '#6a2e00',
    x: 58.7,
    y: 55.3,
    fruitId: 10,
  },
  {
    id: 11,
    label: 'Xác suất',
    fullTitle: 'Xác suất thực nghiệm',
    category: 'statistics',
    strokeColor: '#6a2e00',
    x: 68.8,
    y: 56.1,
    fruitId: 11,
  },
];

const IMAGE_RATIO = 1920 / 1072; // ~1.7910447

// 12 Hạt nắng lơ lửng
const SUN_MOTES = [
  { x: 48, y: 22, size: 4, dur: 5.2, delay: 0.2 },
  { x: 55, y: 32, size: 5, dur: 6.0, delay: 1.5 },
  { x: 62, y: 18, size: 3.5, dur: 4.8, delay: 2.1 },
  { x: 74, y: 28, size: 4.5, dur: 5.6, delay: 0.8 },
  { x: 80, y: 20, size: 6, dur: 6.4, delay: 3.0 },
  { x: 88, y: 25, size: 4, dur: 5.0, delay: 1.2 },
  { x: 38, y: 45, size: 3.5, dur: 5.8, delay: 2.7 },
  { x: 42, y: 62, size: 5, dur: 6.2, delay: 0.5 },
  { x: 50, y: 52, size: 4, dur: 4.6, delay: 1.9 },
  { x: 65, y: 48, size: 4.5, dur: 5.4, delay: 3.3 },
  { x: 70, y: 65, size: 3.5, dur: 6.1, delay: 0.4 },
  { x: 82, y: 42, size: 5, dur: 5.5, delay: 2.4 },
];

// 8 Chiếc lá bay
const LEAF_ITEMS = [
  { id: 1, type: 'across', x: 38, y: 28, size: 18, delay: 0, dur: 8.5 },
  { id: 2, type: 'across', x: 32, y: 38, size: 16, delay: 3.2, dur: 9.0 },
  { id: 3, type: 'across', x: 44, y: 22, size: 19, delay: 5.5, dur: 8.0 },
  { id: 4, type: 'across', x: 40, y: 48, size: 15, delay: 1.8, dur: 9.5 },
  { id: 5, type: 'across', x: 46, y: 34, size: 17, delay: 7.0, dur: 8.2 },
  { id: 6, type: 'down', x: 48, y: 42, size: 18, delay: 2.5, dur: 8.0 },
  { id: 7, type: 'down', x: 56, y: 36, size: 16, delay: 6.5, dur: 7.5 },
  { id: 8, type: 'down', x: 64, y: 44, size: 17, delay: 4.0, dur: 8.8 },
];

interface TreePhotoInteractiveProps {
  onSelectFruit: (fruit: FruitContent) => void;
  viewedFruitIds: Set<number>;
  animate?: boolean;
  isPaused?: boolean;
}

export const TreePhotoInteractive: React.FC<TreePhotoInteractiveProps> = ({
  onSelectFruit,
  viewedFruitIds,
  animate = true,
  isPaused = false,
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isGust, setIsGust] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [stageDimensions, setStageDimensions] = useState<{
    width: number;
    height: number;
    mode: 'cover' | 'contain';
  }>({
    width: 1920,
    height: 1072,
    mode: 'cover',
  });

  // Mobile detection (< 768px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cơn gió ngẫu nhiên mỗi 8-10s kéo dài 1.5s
  useEffect(() => {
    if (!animate || isPaused) {
      setIsGust(false);
      return;
    }

    let gustTimeout: NodeJS.Timeout;
    let nextTimeout: NodeJS.Timeout;

    const scheduleNextGust = () => {
      const waitTime = 8000 + Math.random() * 2000;
      nextTimeout = setTimeout(() => {
        setIsGust(true);
        gustTimeout = setTimeout(() => {
          setIsGust(false);
          scheduleNextGust();
        }, 1500);
      }, waitTime);
    };

    scheduleNextGust();

    return () => {
      clearTimeout(nextTimeout);
      clearTimeout(gustTimeout);
    };
  }, [animate, isPaused]);

  // Dimension scaling calculation
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      if (w <= 0 || h <= 0) return;

      const parentRatio = w / h;
      const isExtreme = parentRatio < 1.15 || parentRatio > 2.25;
      const targetMode: 'cover' | 'contain' = isExtreme ? 'contain' : 'cover';

      let stageW = w;
      let stageH = h;

      if (targetMode === 'cover') {
        if (parentRatio >= IMAGE_RATIO) {
          stageW = w;
          stageH = w / IMAGE_RATIO;
        } else {
          stageH = h;
          stageW = h * IMAGE_RATIO;
        }
      } else {
        if (parentRatio >= IMAGE_RATIO) {
          stageH = h;
          stageW = h * IMAGE_RATIO;
        } else {
          stageW = w;
          stageH = w / IMAGE_RATIO;
        }
      }

      setStageDimensions({
        width: Math.round(stageW),
        height: Math.round(stageH),
        mode: targetMode,
      });
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleAppleClick = (apple: AppleZone) => {
    const fruit = FRUITS_DATA.find((f) => f.id === apple.fruitId);
    if (fruit) {
      onSelectFruit(fruit);
    }
  };

  if (hasError || !TREE_IMAGE) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900 text-red-500 font-bold text-base md:text-xl p-4 text-center">
        KHÔNG TẢI ĐƯỢC ẢNH NỀN
      </div>
    );
  }

  // Apple diameter: 5.5% of stage width
  const circleSize = stageDimensions.width * 0.055;

  // Font size inside apple: ~0.85% of image width, min 10px
  const appleFontSize = Math.max(10, Math.round(stageDimensions.width * 0.0085));

  // Center vertical offset inside apple: ~0.5% of stage height downwards
  const appleTextOffsetY = Math.round(stageDimensions.height * 0.005);

  // Butterfly size: ~4.5% of stage width, min 48px
  const butterflyWidth = Math.max(48, Math.round(stageDimensions.width * 0.045));
  const butterflyHeight = Math.round(butterflyWidth * 0.8);

  // Displacement scales: canopy 4 (8 in gust), grass 3.5 (7.5 in gust)
  const canopyDisplacementScale = isGust ? 8 : 4;
  const grassDisplacementScale = isGust ? 7.5 : 3.5;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none flex items-center justify-center"
    >
      {/* 1. Blurred background only when in contain mode */}
      {stageDimensions.mode === 'contain' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={TREE_IMAGE}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover scale-110 filter blur-2xl opacity-60"
          />
          <div className="absolute inset-0 bg-sky-950/20" />
        </div>
      )}

      {/* 2. THE MAIN STAGE CONTAINER (Shared 1:1 coordinate space for image and all layers) */}
      <div
        className="absolute shrink-0"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${stageDimensions.width}px`,
          height: `${stageDimensions.height}px`,
        }}
      >
        {/* LỚP 1: ẢNH GỐC ĐỨNG YÊN (Thân cây, bầu trời luôn vững chãi) */}
        <img
          src={TREE_IMAGE}
          alt="Cây kiến thức Toán 6"
          onError={() => setHasError(true)}
          className="w-full h-full object-fill pointer-events-none select-none"
        />

        {/* LỚP 2: TÁN LÁ VÀ 3 VÙNG HOA CỎ LAY ĐỘNG THEO GIÓ (SVG feTurbulence + feDisplacementMap) */}
        {animate && !isMobile && !isPaused && (
          <svg
            viewBox="0 0 1920 1072"
            className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
            aria-hidden="true"
          >
            <defs>
              {/* BỘ LỌC GIÓ CHO TÁN LÁ */}
              <filter id="canopyWindFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012 0.018"
                  numOctaves="2"
                  result="canopyNoise"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="12s"
                    values="0.010 0.016; 0.014 0.022; 0.010 0.016"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="canopyNoise"
                  scale={canopyDisplacementScale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              {/* BỘ LỌC 1: HOA CỎ GÓC TRÁI DƯỚI (x: 0-28%, y: 72-100%) - dur 7.2s */}
              <filter id="grassLeftFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.016 0.024"
                  numOctaves="2"
                  result="noiseL"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="7.2s"
                    values="0.014 0.021; 0.018 0.027; 0.014 0.021"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noiseL"
                  scale={grassDisplacementScale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              {/* BỘ LỌC 2: HOA CỎ GÓC PHẢI DƯỚI (x: 68-100%, y: 72-100%) - dur 8.4s */}
              <filter id="grassRightFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.018 0.022"
                  numOctaves="2"
                  result="noiseR"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="8.4s"
                    values="0.015 0.019; 0.020 0.026; 0.015 0.019"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noiseR"
                  scale={grassDisplacementScale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              {/* BỘ LỌC 3: DẢI CỎ GIỮA (x: 28-68%, y: 85-100%) - dur 6.6s */}
              <filter id="grassCenterFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.015 0.025"
                  numOctaves="2"
                  result="noiseC"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="6.6s"
                    values="0.013 0.022; 0.017 0.028; 0.013 0.022"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noiseC"
                  scale={grassDisplacementScale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              {/* MẶT NẠ TÁN CÂY: Tâm (51%, 38%) = (979.2, 407.36), Bán kính ngang 25% = 480, dọc 31% = 332.32 */}
              <radialGradient id="canopyMaskGrad" cx="51%" cy="38%" r="30%" fx="51%" fy="38%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
                <stop offset="60%" stopColor="#ffffff" stopOpacity={1} />
                <stop offset="85%" stopColor="#ffffff" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </radialGradient>
              <mask id="canopyFeatherMask" maskUnits="userSpaceOnUse">
                <ellipse cx="979.2" cy="407.36" rx="480" ry="332.32" fill="url(#canopyMaskGrad)" />
              </mask>

              {/* MẶT NẠ 1: VÙNG HOA CỎ TRÁI (x 0–28% = 537.6, y 72–100% = 771.84 - 1072) */}
              <radialGradient id="grassLGrad" cx="12%" cy="92%" r="24%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
                <stop offset="65%" stopColor="#ffffff" stopOpacity={0.9} />
                <stop offset="88%" stopColor="#ffffff" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </radialGradient>
              <mask id="grassLMask" maskUnits="userSpaceOnUse">
                <rect x="0" y="771.84" width="537.6" height="300.16" fill="url(#grassLGrad)" />
              </mask>

              {/* MẶT NẠ 2: VÙNG HOA CỎ PHẢI (x 68–100% = 1305.6 - 1920, y 72–100% = 771.84 - 1072) */}
              <radialGradient id="grassRGrad" cx="86%" cy="92%" r="24%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
                <stop offset="65%" stopColor="#ffffff" stopOpacity={0.9} />
                <stop offset="88%" stopColor="#ffffff" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </radialGradient>
              <mask id="grassRMask" maskUnits="userSpaceOnUse">
                <rect x="1305.6" y="771.84" width="614.4" height="300.16" fill="url(#grassRGrad)" />
              </mask>

              {/* MẶT NẠ 3: DẢI CỎ GIỮA (x 28–68% = 537.6 - 1305.6, y 85–100% = 911.2 - 1072) */}
              <linearGradient id="grassCGrad" x1="0" y1="911.2" x2="0" y2="970" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
              </linearGradient>
              <mask id="grassCMask" maskUnits="userSpaceOnUse">
                <rect x="537.6" y="911.2" width="768" height="160.8" fill="url(#grassCGrad)" />
              </mask>
            </defs>

            {/* Lớp tán cây rung rinh */}
            <image
              href={TREE_IMAGE}
              x="0"
              y="0"
              width="1920"
              height="1072"
              filter="url(#canopyWindFilter)"
              mask="url(#canopyFeatherMask)"
            />

            {/* Lớp 1: Hoa cỏ góc trái dưới lay động */}
            <image
              href={TREE_IMAGE}
              x="0"
              y="0"
              width="1920"
              height="1072"
              filter="url(#grassLeftFilter)"
              mask="url(#grassLMask)"
            />

            {/* Lớp 2: Hoa cỏ góc phải dưới lay động */}
            <image
              href={TREE_IMAGE}
              x="0"
              y="0"
              width="1920"
              height="1072"
              filter="url(#grassRightFilter)"
              mask="url(#grassRMask)"
            />

            {/* Lớp 3: Dải cỏ giữa lay động */}
            <image
              href={TREE_IMAGE}
              x="0"
              y="0"
              width="1920"
              height="1072"
              filter="url(#grassCenterFilter)"
              mask="url(#grassCMask)"
            />
          </svg>
        )}

        {/* LỚP 3: MẶT TRỜI QUẦNG SÁNG MỀM */}
        {animate && (
          <div
            className="absolute pointer-events-none rounded-full z-15 animate-sun-pulse"
            style={{
              left: '86%',
              top: '15%',
              width: '18%',
              aspectRatio: '1 / 1',
              background:
                'radial-gradient(circle, rgba(254, 240, 138, 0.5) 0%, rgba(253, 224, 71, 0.22) 40%, rgba(253, 224, 71, 0) 72%)',
            }}
          />
        )}

        {/* LỚP 4: HẠT NẮNG NHỎ LƠ LỬNG */}
        {animate && !isPaused && (
          <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
            {SUN_MOTES.map((mote, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-amber-200/70 shadow-[0_0_5px_rgba(253,224,71,0.8)] animate-sun-mote"
                style={{
                  left: `${mote.x}%`,
                  top: `${mote.y}%`,
                  width: `${mote.size}px`,
                  height: `${mote.size}px`,
                  animationDuration: `${mote.dur}s`,
                  animationDelay: `${mote.delay}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* LỚP 5: LÁ XANH NHỎ BAY THEO GIÓ */}
        {animate && !isPaused && (
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {LEAF_ITEMS.map((leaf) => {
              const speedMultiplier = isGust ? 0.55 : 1;
              const duration = leaf.dur * speedMultiplier;

              return (
                <div
                  key={leaf.id}
                  className={`absolute ${
                    leaf.type === 'across' ? 'animate-leaf-across' : 'animate-leaf-down'
                  }`}
                  style={{
                    left: `${leaf.x}%`,
                    top: `${leaf.y}%`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${leaf.delay}s`,
                  }}
                >
                  <svg
                    width={leaf.size}
                    height={leaf.size}
                    viewBox="0 0 32 32"
                    className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] transform rotate-12"
                  >
                    <path
                      d="M16 2 C26 6 30 18 16 30 C2 18 6 6 16 2 Z"
                      fill="#22c55e"
                    />
                    <path
                      d="M16 4 Q16 18 16 28"
                      stroke="#064e3b"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      fill="none"
                      opacity={0.5}
                    />
                  </svg>
                </div>
              );
            })}
          </div>
        )}

        {/* LỚP 6: 3 CHÚ BƯỚM THEO ĐÚNG MẪU SVG YÊU CẦU (Tím, Hồng, Vàng - Thân cam, vỗ cánh co giãn 50,44) */}
        {animate && !isPaused && (
          <div className="absolute inset-0 pointer-events-none z-22 overflow-hidden">
            {/* 1. BƯỚM TÍM: c1: #f3e8ff, c2: #a855f7, c3: #6b21a8 */}
            <div
              className="absolute animate-bf-purple"
              style={{
                left: '18%',
                top: '82%',
              }}
            >
              <svg
                width={butterflyWidth}
                height={butterflyHeight}
                viewBox="0 0 100 80"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))' }}
              >
                <defs>
                  <radialGradient id="wing-purple" cx="35%" cy="30%" r="80%">
                    <stop offset="0%" stopColor="#f3e8ff" />
                    <stop offset="55%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6b21a8" />
                  </radialGradient>
                  <linearGradient id="body-purple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#c2410c" />
                  </linearGradient>
                </defs>
                <g className="wing-right wing-flap-purple">
                  <path d="M50 38 C58 10, 92 4, 94 22 C96 38, 72 44, 50 42 Z" fill="url(#wing-purple)" stroke="#6b21a8" strokeWidth={1.2} />
                  <path d="M50 44 C66 44, 84 52, 78 66 C72 78, 56 66, 50 50 Z" fill="url(#wing-purple)" stroke="#6b21a8" strokeWidth={1.2} />
                  <circle cx="80" cy="21" r="5" fill="#fff" opacity={0.55} />
                  <circle cx="69" cy="58" r="3.5" fill="#fff" opacity={0.5} />
                </g>
                <g transform="translate(100,0) scale(-1,1)">
                  <g className="wing-left wing-flap-purple">
                    <path d="M50 38 C58 10, 92 4, 94 22 C96 38, 72 44, 50 42 Z" fill="url(#wing-purple)" stroke="#6b21a8" strokeWidth={1.2} />
                    <path d="M50 44 C66 44, 84 52, 78 66 C72 78, 56 66, 50 50 Z" fill="url(#wing-purple)" stroke="#6b21a8" strokeWidth={1.2} />
                    <circle cx="80" cy="21" r="5" fill="#fff" opacity={0.55} />
                    <circle cx="69" cy="58" r="3.5" fill="#fff" opacity={0.5} />
                  </g>
                </g>
                <ellipse cx="50" cy="47" rx={3.2} ry={13} fill="url(#body-purple)" />
                <circle cx="50" cy="32" r={3.6} fill="#c2410c" />
                <path d="M49 30 Q44 18 39 15" stroke="#7c2d12" strokeWidth={1.3} fill="none" strokeLinecap="round" />
                <path d="M51 30 Q56 18 61 15" stroke="#7c2d12" strokeWidth={1.3} fill="none" strokeLinecap="round" />
                <circle cx="39" cy="15" r={1.8} fill="#7c2d12" />
                <circle cx="61" cy="15" r={1.8} fill="#7c2d12" />
              </svg>
            </div>

            {/* 2. BƯỚM HỒNG: c1: #fce7f3, c2: #ec4899, c3: #9d174d (Ẩn trên mobile) */}
            {!isMobile && (
              <div
                className="absolute animate-bf-pink"
                style={{
                  left: '80%',
                  top: '80%',
                }}
              >
                <svg
                  width={butterflyWidth}
                  height={butterflyHeight}
                  viewBox="0 0 100 80"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))' }}
                >
                  <defs>
                    <radialGradient id="wing-pink" cx="35%" cy="30%" r="80%">
                      <stop offset="0%" stopColor="#fce7f3" />
                      <stop offset="55%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#9d174d" />
                    </radialGradient>
                    <linearGradient id="body-pink" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#c2410c" />
                    </linearGradient>
                  </defs>
                  <g className="wing-right wing-flap-pink">
                    <path d="M50 38 C58 10, 92 4, 94 22 C96 38, 72 44, 50 42 Z" fill="url(#wing-pink)" stroke="#9d174d" strokeWidth={1.2} />
                    <path d="M50 44 C66 44, 84 52, 78 66 C72 78, 56 66, 50 50 Z" fill="url(#wing-pink)" stroke="#9d174d" strokeWidth={1.2} />
                    <circle cx="80" cy="21" r="5" fill="#fff" opacity={0.55} />
                    <circle cx="69" cy="58" r="3.5" fill="#fff" opacity={0.5} />
                  </g>
                  <g transform="translate(100,0) scale(-1,1)">
                    <g className="wing-left wing-flap-pink">
                      <path d="M50 38 C58 10, 92 4, 94 22 C96 38, 72 44, 50 42 Z" fill="url(#wing-pink)" stroke="#9d174d" strokeWidth={1.2} />
                      <path d="M50 44 C66 44, 84 52, 78 66 C72 78, 56 66, 50 50 Z" fill="url(#wing-pink)" stroke="#9d174d" strokeWidth={1.2} />
                      <circle cx="80" cy="21" r="5" fill="#fff" opacity={0.55} />
                      <circle cx="69" cy="58" r="3.5" fill="#fff" opacity={0.5} />
                    </g>
                  </g>
                  <ellipse cx="50" cy="47" rx={3.2} ry={13} fill="url(#body-pink)" />
                  <circle cx="50" cy="32" r={3.6} fill="#c2410c" />
                  <path d="M49 30 Q44 18 39 15" stroke="#7c2d12" strokeWidth={1.3} fill="none" strokeLinecap="round" />
                  <path d="M51 30 Q56 18 61 15" stroke="#7c2d12" strokeWidth={1.3} fill="none" strokeLinecap="round" />
                  <circle cx="39" cy="15" r={1.8} fill="#7c2d12" />
                  <circle cx="61" cy="15" r={1.8} fill="#7c2d12" />
                </svg>
              </div>
            )}

            {/* 3. BƯỚM VÀNG: c1: #fef9c3, c2: #facc15, c3: #a16207 (Ẩn trên mobile) */}
            {!isMobile && (
              <div
                className="absolute animate-bf-yellow"
                style={{
                  left: '42%',
                  top: '86%',
                }}
              >
                <svg
                  width={butterflyWidth}
                  height={butterflyHeight}
                  viewBox="0 0 100 80"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))' }}
                >
                  <defs>
                    <radialGradient id="wing-yellow" cx="35%" cy="30%" r="80%">
                      <stop offset="0%" stopColor="#fef9c3" />
                      <stop offset="55%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#a16207" />
                    </radialGradient>
                    <linearGradient id="body-yellow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#c2410c" />
                    </linearGradient>
                  </defs>
                  <g className="wing-right wing-flap-yellow">
                    <path d="M50 38 C58 10, 92 4, 94 22 C96 38, 72 44, 50 42 Z" fill="url(#wing-yellow)" stroke="#a16207" strokeWidth={1.2} />
                    <path d="M50 44 C66 44, 84 52, 78 66 C72 78, 56 66, 50 50 Z" fill="url(#wing-yellow)" stroke="#a16207" strokeWidth={1.2} />
                    <circle cx="80" cy="21" r="5" fill="#fff" opacity={0.55} />
                    <circle cx="69" cy="58" r="3.5" fill="#fff" opacity={0.5} />
                  </g>
                  <g transform="translate(100,0) scale(-1,1)">
                    <g className="wing-left wing-flap-yellow">
                      <path d="M50 38 C58 10, 92 4, 94 22 C96 38, 72 44, 50 42 Z" fill="url(#wing-yellow)" stroke="#a16207" strokeWidth={1.2} />
                      <path d="M50 44 C66 44, 84 52, 78 66 C72 78, 56 66, 50 50 Z" fill="url(#wing-yellow)" stroke="#a16207" strokeWidth={1.2} />
                      <circle cx="80" cy="21" r="5" fill="#fff" opacity={0.55} />
                      <circle cx="69" cy="58" r="3.5" fill="#fff" opacity={0.5} />
                    </g>
                  </g>
                  <ellipse cx="50" cy="47" rx={3.2} ry={13} fill="url(#body-yellow)" />
                  <circle cx="50" cy="32" r={3.6} fill="#c2410c" />
                  <path d="M49 30 Q44 18 39 15" stroke="#7c2d12" strokeWidth={1.3} fill="none" strokeLinecap="round" />
                  <path d="M51 30 Q56 18 61 15" stroke="#7c2d12" strokeWidth={1.3} fill="none" strokeLinecap="round" />
                  <circle cx="39" cy="15" r={1.8} fill="#7c2d12" />
                  <circle cx="61" cy="15" r={1.8} fill="#7c2d12" />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* LỚP 7: BIỂN "TOÁN 6" TRÊN THÂN CÂY */}
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: '50.7%',
            top: '72.0%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative px-3 py-1 sm:px-5 sm:py-1.5 rounded-lg bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-2 border-amber-900/90 shadow-xl flex items-center justify-center gap-1.5 sm:gap-2 text-amber-100">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-950 border border-amber-500/50" />
            <span className="text-xs sm:text-base md:text-lg font-black tracking-widest uppercase text-amber-100 drop-shadow-md whitespace-nowrap">
              TOÁN 6
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-950 border border-amber-500/50" />
          </div>
        </div>

        {/* LỚP 8: 11 QUẢ TÁO KIẾN THỨC
            - KHÔNG CÒN VÒNG TRÒN VIỀN MÀU
            - KHÔNG CÒN NHÃN DƯỚI QUẢ
            - CHỮ NẰM CHÍNH GIỮA THÂN QUẢ TÁO (viền dày màu tối, bóng đổ mềm)
            - RÊ CHUỘT / CHẠM:
              + Quả phóng to nhẹ 8%, sáng hơn (brightness 1.1), GIỮ NGUYÊN MÀU ĐỎ
              + Quầng sáng vàng ấm PHÍA SAU quả (z-0, độ mờ tối đa 50%)
              + Chú thích tên đầy đủ hiện PHÍA DƯỚI quả táo (không bao giờ đè menu)
            - HUY HIỆU ĐÃ XEM Ở GÓC TRÊN BÊN PHẢI */}
        {APPLE_ZONES.map((apple, index) => {
          const isViewed = viewedFruitIds.has(apple.fruitId);
          const isHovered = hoveredId === apple.id;

          const swayClass = animate
            ? isGust
              ? 'animate-apple-gust'
              : 'animate-apple-sway'
            : '';

          const swayDuration = `${3.2 + (index % 4) * 0.4}s`;
          const swayDelay = `${index * 0.28}s`;

          return (
            <div
              key={apple.id}
              className="absolute z-30 flex flex-col items-center cursor-pointer group"
              style={{
                left: `${apple.x}%`,
                top: `${apple.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleAppleClick(apple)}
              onMouseEnter={() => setHoveredId(apple.id)}
              onMouseLeave={() => setHoveredId(null)}
              role="button"
              tabIndex={0}
              aria-label={apple.fullTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleAppleClick(apple);
                }
              }}
            >
              {/* KHỐI NỘI DUNG TÁO LẮC LƯ THEO GIÓ */}
              <div
                className={`relative flex items-center justify-center ${swayClass}`}
                style={{
                  width: `${circleSize}px`,
                  height: `${circleSize}px`,
                  animationDuration: swayDuration,
                  animationDelay: swayDelay,
                }}
              >
                {/* 1. QUẦNG SÁNG VÀNG ẤM PHÍA SAU QUẢ TÁO (Z-INDEX THẤP HƠN QUẢ, ĐỘ MỜ TỐI ĐA 50%, KHÔNG PHỦ LÊN QUẢ) */}
                <div
                  className={`absolute inset-[-18%] rounded-full pointer-events-none transition-opacity duration-200 z-0 ${
                    isHovered ? 'opacity-50' : 'opacity-0'
                  }`}
                  style={{
                    background:
                      'radial-gradient(circle, rgba(254, 240, 138, 0.95) 0%, rgba(250, 204, 21, 0.5) 45%, transparent 72%)',
                    filter: 'blur(5px)',
                  }}
                />

                {/* 2. CHỮ TÊN CHỦ ĐỀ NẰM CHÍNH GIỮA THÂN QUẢ TÁO (Giữ màu đỏ, phóng to 8%, sáng hơn 1.1) */}
                <div
                  className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-200"
                  style={{
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
                    marginTop: `${appleTextOffsetY}px`,
                  }}
                >
                  <span
                    className="font-extrabold text-white text-center leading-tight line-clamp-2 px-1 select-none pointer-events-none"
                    style={{
                      fontFamily: "'Be Vietnam Pro', sans-serif",
                      fontSize: `${appleFontSize}px`,
                      WebkitTextStroke: `2.2px ${apple.strokeColor}`,
                      paintOrder: 'stroke fill',
                      filter: 'drop-shadow(0 2px 3.5px rgba(0, 0, 0, 0.85))',
                    }}
                  >
                    {apple.label}
                  </span>
                </div>

                {/* 3. HUY HIỆU ĐÃ XEM: TRÒN NHỎ MÀU XANH LÁ CÓ DẤU ✓ Ở GÓC TRÊN BÊN PHẢI */}
                {isViewed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-1.5 border-white z-20">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                  </div>
                )}

                {/* 4. CHÚ THÍCH HIỆN PHÍA DƯỚI QUẢ TÁO (KHÔNG HIỆN PHÍA TRÊN, KHÔNG BAO GIỜ ĐÈ THANH MENU) */}
                {isHovered && (
                  <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap shadow-xl border border-white/20 pointer-events-none z-50 animate-[fadeIn_0.12s_ease-out]">
                    <span>{apple.fullTitle}</span>
                    {/* Mũi tên tam giác nhỏ trỏ ngược lên quả táo */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-900/90" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

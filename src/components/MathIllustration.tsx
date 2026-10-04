import React, { useState, useEffect } from 'react';

interface MathIllustrationProps {
  type: 'shapes' | 'symmetry' | 'angle' | 'barchart' | 'coin';
  animate?: boolean;
}

export const MathIllustration: React.FC<MathIllustrationProps> = ({ type, animate = true }) => {
  if (type === 'shapes') {
    // Quả 6: Các hình phẳng kèm minh họa SVG nhỏ bên cạnh
    return (
      <div className="mt-4 p-4 rounded-xl bg-purple-50/80 border border-purple-200">
        <div className="text-xs font-semibold uppercase tracking-wider text-purple-700 mb-3 flex items-center justify-between">
          <span>Minh họa các hình phẳng cơ bản:</span>
          <span className="text-[11px] font-normal text-purple-600">Đơn vị độ dài (m) & diện tích (m²)</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-xs">
          {/* Tam giác đều */}
          <div className="bg-white p-2 rounded-lg border border-purple-100 flex flex-col items-center shadow-xs">
            <svg viewBox="0 0 60 50" className="w-12 h-10 text-purple-600">
              <polygon points="30,5 55,45 5,45" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
            </svg>
            <span className="font-semibold text-purple-900 mt-1">Tam giác đều</span>
            <span className="text-[10px] text-slate-500">3 cạnh = nhau</span>
          </div>

          {/* Hình vuông */}
          <div className="bg-white p-2 rounded-lg border border-purple-100 flex flex-col items-center shadow-xs">
            <svg viewBox="0 0 60 50" className="w-12 h-10 text-purple-600">
              <rect x="12" y="7" width="36" height="36" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
            </svg>
            <span className="font-semibold text-purple-900 mt-1">Hình vuông</span>
            <span className="text-[10px] text-slate-500">C = 4·a, S = a·a</span>
          </div>

          {/* Lục giác đều */}
          <div className="bg-white p-2 rounded-lg border border-purple-100 flex flex-col items-center shadow-xs">
            <svg viewBox="0 0 60 50" className="w-12 h-10 text-purple-600">
              <polygon points="30,5 52,17 52,37 30,47 8,37 8,17" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
            </svg>
            <span className="font-semibold text-purple-900 mt-1">Lục giác đều</span>
            <span className="text-[10px] text-slate-500">6 cạnh = nhau</span>
          </div>

          {/* Hình chữ nhật */}
          <div className="bg-white p-2 rounded-lg border border-purple-100 flex flex-col items-center shadow-xs">
            <svg viewBox="0 0 60 50" className="w-12 h-10 text-purple-600">
              <rect x="6" y="12" width="48" height="28" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
            </svg>
            <span className="font-semibold text-purple-900 mt-1">H. chữ nhật</span>
            <span className="text-[10px] text-slate-500">S = a · b</span>
          </div>

          {/* Hình thoi */}
          <div className="bg-white p-2 rounded-lg border border-purple-100 flex flex-col items-center shadow-xs">
            <svg viewBox="0 0 60 50" className="w-12 h-10 text-purple-600">
              <polygon points="30,6 54,25 30,44 6,25" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
              <line x1="30" y1="6" x2="30" y2="44" stroke="#c084fc" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="6" y1="25" x2="54" y2="25" stroke="#c084fc" strokeWidth="1" strokeDasharray="2,2" />
            </svg>
            <span className="font-semibold text-purple-900 mt-1">Hình thoi</span>
            <span className="text-[10px] text-slate-500">S = (m·n):2</span>
          </div>

          {/* Hình bình hành */}
          <div className="bg-white p-2 rounded-lg border border-purple-100 flex flex-col items-center shadow-xs">
            <svg viewBox="0 0 60 50" className="w-12 h-10 text-purple-600">
              <polygon points="18,10 54,10 42,40 6,40" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
            </svg>
            <span className="font-semibold text-purple-900 mt-1">H. bình hành</span>
            <span className="text-[10px] text-slate-500">S = a · h</span>
          </div>

          {/* Hình thang cân */}
          <div className="bg-white p-2 rounded-lg border border-purple-100 flex flex-col items-center shadow-xs">
            <svg viewBox="0 0 60 50" className="w-12 h-10 text-purple-600">
              <polygon points="17,12 43,12 55,38 5,38" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
            </svg>
            <span className="font-semibold text-purple-900 mt-1">H. thang cân</span>
            <span className="text-[10px] text-slate-500">S = (a+b)·h:2</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'symmetry') {
    // Quả 7: Một hình vuông SVG có các trục đối xứng hiện dần từng đường
    return <SymmetrySquareVisual animate={animate} />;
  }

  if (type === 'angle') {
    // Quả 8: Một góc SVG có cạnh xoay dần, hiện tên loại góc theo số đo
    return <AngleVisual animate={animate} />;
  }

  if (type === 'barchart') {
    // Quả 9: Một biểu đồ cột SVG với số liệu mẫu, các cột mọc dần lên
    return <BarChartVisual animate={animate} />;
  }

  if (type === 'coin') {
    // Quả 10: Một đồng xu SVG lật qua lật lại
    return <CoinVisual animate={animate} />;
  }

  return null;
};

// Component: Hình vuông hiển thị 4 trục đối xứng hiện dần
const SymmetrySquareVisual: React.FC<{ animate?: boolean }> = ({ animate = true }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!animate) {
      setStep(4);
      return;
    }
    const interval = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [animate]);

  return (
    <div className="mt-4 p-4 rounded-xl bg-purple-50/80 border border-purple-200 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1 text-slate-700 text-sm">
        <div className="font-bold text-purple-900 mb-1 flex items-center gap-2">
          <span>Minh họa trực quan: 4 trục đối xứng của hình vuông</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-200 text-purple-800 font-mono">
            {step === 0 ? 'Chưa hiện' : `Đang hiện: ${step}/4 trục`}
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-2">
          Hình vuông có 4 trục đối xứng (2 trục chia đôi các cạnh đối diện, 2 trục là 2 đường chéo) và 1 tâm đối xứng (giao điểm hai đường chéo).
        </p>
        <div className="flex flex-wrap gap-1.5 text-xs">
          <button
            onClick={() => setStep(1)}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              step >= 1 ? 'bg-purple-600 text-white font-medium' : 'bg-white text-purple-700 border border-purple-200'
            }`}
          >
            Trục 1: Dọc
          </button>
          <button
            onClick={() => setStep(2)}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              step >= 2 ? 'bg-purple-600 text-white font-medium' : 'bg-white text-purple-700 border border-purple-200'
            }`}
          >
            Trục 2: Ngang
          </button>
          <button
            onClick={() => setStep(3)}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              step >= 3 ? 'bg-purple-600 text-white font-medium' : 'bg-white text-purple-700 border border-purple-200'
            }`}
          >
            Trục 3: Chéo 1
          </button>
          <button
            onClick={() => setStep(4)}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              step >= 4 ? 'bg-purple-600 text-white font-medium' : 'bg-white text-purple-700 border border-purple-200'
            }`}
          >
            Trục 4: Chéo 2
          </button>
          <button
            onClick={() => setStep(4)}
            className="px-2.5 py-1 rounded bg-purple-100 text-purple-800 text-xs font-semibold hover:bg-purple-200 cursor-pointer ml-auto"
          >
            Xem cả 4 trục
          </button>
        </div>
      </div>

      <div className="w-48 h-48 bg-white rounded-xl border-2 border-purple-300 shadow-sm flex items-center justify-center p-3 relative shrink-0">
        <svg viewBox="0 0 160 160" className="w-full h-full">
          {/* Nền hình vuông */}
          <rect x="25" y="25" width="110" height="110" fill="#fdf4ff" stroke="#9333ea" strokeWidth="3" rx="2" />

          {/* Trục 1: Trục dọc */}
          <g className={`transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-10'}`}>
            <line x1="80" y1="10" x2="80" y2="150" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="84" y="20" fill="#dc2626" fontSize="10" fontWeight="bold">d₁</text>
          </g>

          {/* Trục 2: Trục ngang */}
          <g className={`transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-10'}`}>
            <line x1="10" y1="80" x2="150" y2="80" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="140" y="75" fill="#2563eb" fontSize="10" fontWeight="bold">d₂</text>
          </g>

          {/* Trục 3: Đường chéo chính */}
          <g className={`transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-10'}`}>
            <line x1="15" y1="15" x2="145" y2="145" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="135" y="130" fill="#16a34a" fontSize="10" fontWeight="bold">d₃</text>
          </g>

          {/* Trục 4: Đường chéo phụ */}
          <g className={`transition-opacity duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-10'}`}>
            <line x1="145" y1="15" x2="15" y2="145" stroke="#d97706" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="135" y="30" fill="#d97706" fontSize="10" fontWeight="bold">d₄</text>
          </g>

          {/* Tâm đối xứng O */}
          <circle cx="80" cy="80" r="4.5" fill="#7e22ce" stroke="#ffffff" strokeWidth="1.5" />
          <text x="86" y="93" fill="#7e22ce" fontSize="11" fontWeight="bold">O</text>
        </svg>
      </div>
    </div>
  );
};

// Component: Góc xoay dần và hiển thị tên loại góc
const AngleVisual: React.FC<{ animate?: boolean }> = ({ animate = true }) => {
  const [angle, setAngle] = useState(45);

  useEffect(() => {
    if (!animate) return;
    const stages = [45, 90, 135, 180, 60];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % stages.length;
      setAngle(stages[idx]);
    }, 2400);
    return () => clearInterval(interval);
  }, [animate]);

  // Phân loại góc
  let angleType = 'Góc nhọn';
  let angleBadgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
  let angleDesc = 'Nhỏ hơn 90° (< 90°)';

  if (angle === 90) {
    angleType = 'Góc vuông';
    angleBadgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    angleDesc = 'Bằng 90° (= 90°)';
  } else if (angle > 90 && angle < 180) {
    angleType = 'Góc tù';
    angleBadgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
    angleDesc = 'Lớn hơn 90° và nhỏ hơn 180°';
  } else if (angle === 180) {
    angleType = 'Góc bẹt';
    angleBadgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
    angleDesc = 'Bằng 180° (= 180°)';
  }

  // Tọa độ đỉnh O tại (120, 110)
  // Tia Ox cố định nằm ngang sang phải: (120, 110) -> (200, 110)
  // Tia Oy xoay theo góc ngược chiều kim đồng hồ:
  const rad = (angle * Math.PI) / 180;
  const rayLength = 80;
  const rayEndX = 120 + rayLength * Math.cos(-rad);
  const rayEndY = 110 + rayLength * Math.sin(-rad);

  return (
    <div className="mt-4 p-4 rounded-xl bg-purple-50/80 border border-purple-200 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1 text-slate-700 text-sm">
        <div className="font-bold text-purple-900 mb-1 flex items-center gap-2">
          <span>Minh họa trực quan: 4 loại góc theo số đo</span>
        </div>
        <div className="inline-flex items-center gap-2 my-2 px-3 py-1.5 rounded-lg border font-semibold text-base shadow-2xs"
          style={{ backgroundColor: '#ffffff' }}>
          <span className="text-purple-900">{angleType}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold">
            {angle}°
          </span>
          <span className="text-xs text-slate-500 font-normal">({angleDesc})</span>
        </div>
        <p className="text-xs text-slate-600 mb-3">
          Bấm các nút bên dưới để quan sát từng loại góc thay đổi trực quan:
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setAngle(45)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              angle < 90 ? 'bg-purple-700 text-white font-medium shadow-xs' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            Nhọn (45°)
          </button>
          <button
            onClick={() => setAngle(90)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              angle === 90 ? 'bg-purple-700 text-white font-medium shadow-xs' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            Vuông (90°)
          </button>
          <button
            onClick={() => setAngle(135)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              angle > 90 && angle < 180 ? 'bg-purple-700 text-white font-medium shadow-xs' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            Tù (135°)
          </button>
          <button
            onClick={() => setAngle(180)}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              angle === 180 ? 'bg-purple-700 text-white font-medium shadow-xs' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            Bẹt (180°)
          </button>
        </div>
      </div>

      <div className="w-56 h-44 bg-white rounded-xl border-2 border-purple-300 shadow-sm flex items-center justify-center p-2 relative shrink-0">
        <svg viewBox="20 10 200 130" className="w-full h-full overflow-visible">
          {/* Vòng cung góc */}
          {angle === 90 ? (
            <rect x="120" y="94" width="16" height="16" fill="none" stroke="#7e22ce" strokeWidth="2" />
          ) : (
            <path
              d={`M ${120 + 30} 110 A 30 30 0 ${angle > 180 ? 1 : 0} 0 ${120 + 30 * Math.cos(-rad)} ${
                110 + 30 * Math.sin(-rad)
              }`}
              fill="none"
              stroke="#9333ea"
              strokeWidth="2"
              strokeDasharray={angle === 180 ? '3 3' : 'none'}
            />
          )}

          {/* Tia cố định Ox */}
          <line x1="120" y1="110" x2="210" y2="110" stroke="#334155" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="215" y="114" fill="#334155" fontSize="12" fontWeight="bold">x</text>

          {/* Tia xoay Oy */}
          <line
            x1="120"
            y1="110"
            x2={rayEndX}
            y2={rayEndY}
            stroke="#7e22ce"
            strokeWidth="3.5"
            className="transition-all duration-500 ease-out"
          />
          <text
            x={rayEndX + (rayEndX >= 120 ? 8 : -14)}
            y={rayEndY + (rayEndY >= 110 ? 14 : -6)}
            fill="#7e22ce"
            fontSize="12"
            fontWeight="bold"
            className="transition-all duration-500 ease-out"
          >
            y
          </text>

          {/* Đỉnh O */}
          <circle cx="120" cy="110" r="5" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
          <text x="114" y="126" fill="#0f172a" fontSize="12" fontWeight="bold">O</text>
        </svg>
      </div>
    </div>
  );
};

// Component: Biểu đồ cột SVG với các cột mọc dần lên
const BarChartVisual: React.FC<{ animate?: boolean }> = ({ animate = true }) => {
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    setGrown(false);
    const timer = setTimeout(() => setGrown(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const sampleData = [
    { label: 'Toán', value: 38, max: 40, color: '#f97316' },
    { label: 'Ngữ văn', value: 29, max: 40, color: '#fb923c' },
    { label: 'KHTN', value: 34, max: 40, color: '#ea580c' },
    { label: 'Lịch sử', value: 24, max: 40, color: '#fdba74' },
    { label: 'Ngoại ngữ', value: 36, max: 40, color: '#c2410c' },
  ];

  return (
    <div className="mt-4 p-4 rounded-xl bg-orange-50/80 border border-orange-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <span className="font-bold text-orange-950 text-sm">Minh họa trực quan: Biểu đồ cột mẫu</span>
          <span className="text-xs text-orange-700 ml-2">(Số học sinh đăng ký các câu lạc bộ)</span>
        </div>
        <button
          onClick={() => {
            setGrown(false);
            setTimeout(() => setGrown(true), 100);
          }}
          className="text-xs bg-white text-orange-800 border border-orange-300 px-2.5 py-1 rounded hover:bg-orange-100 cursor-pointer self-start sm:self-auto"
        >
          🔄 Mọc lại cột
        </button>
      </div>

      <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-xs">
        <svg viewBox="0 0 420 180" className="w-full h-44">
          {/* Lưới ngang */}
          <line x1="40" y1="20" x2="400" y2="20" stroke="#f1f5f9" strokeWidth="1" />
          <text x="32" y="24" fontSize="10" fill="#94a3b8" textAnchor="end">40</text>

          <line x1="40" y1="55" x2="400" y2="55" stroke="#f1f5f9" strokeWidth="1" />
          <text x="32" y="59" fontSize="10" fill="#94a3b8" textAnchor="end">30</text>

          <line x1="40" y1="90" x2="400" y2="90" stroke="#f1f5f9" strokeWidth="1" />
          <text x="32" y="94" fontSize="10" fill="#94a3b8" textAnchor="end">20</text>

          <line x1="40" y1="125" x2="400" y2="125" stroke="#f1f5f9" strokeWidth="1" />
          <text x="32" y="129" fontSize="10" fill="#94a3b8" textAnchor="end">10</text>

          {/* Trục hoành và trục tung */}
          <line x1="40" y1="10" x2="40" y2="140" stroke="#64748b" strokeWidth="2" />
          <line x1="40" y1="140" x2="405" y2="140" stroke="#64748b" strokeWidth="2" />

          {/* Các cột dữ liệu */}
          {sampleData.map((item, i) => {
            const barWidth = 42;
            const barSpacing = 70;
            const x = 65 + i * barSpacing;
            const height = (item.value / item.max) * 120;
            const currentHeight = grown ? height : 0;
            const y = 140 - currentHeight;

            return (
              <g key={item.label}>
                {/* Cột */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={currentHeight}
                  fill={item.color}
                  rx="4"
                  className="transition-all duration-800 ease-out"
                />
                {/* Giá trị trên đầu cột */}
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  fontSize="11"
                  fontWeight="bold"
                  fill="#7c2d12"
                  textAnchor="middle"
                  className={`transition-opacity duration-500 ${grown ? 'opacity-100' : 'opacity-0'}`}
                >
                  {item.value}
                </text>
                {/* Nhãn dưới chân cột */}
                <text
                  x={x + barWidth / 2}
                  y="158"
                  fontSize="11"
                  fill="#334155"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-2 text-right text-[11px] text-slate-500 italic">
        * Chú thích: Chiều cao mỗi cột tương ứng với số học sinh của môn đó.
      </div>
    </div>
  );
};

// Component: Đồng xu SVG lật qua lật lại
const CoinVisual: React.FC<{ animate?: boolean }> = ({ animate = true }) => {
  const [side, setSide] = useState<'heads' | 'tails'>('heads');
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);

  const flipCoin = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setSide((prev) => (prev === 'heads' ? 'tails' : 'heads'));
      setFlipCount((prev) => prev + 1);
      setIsFlipping(false);
    }, 450);
  };

  useEffect(() => {
    if (!animate) return;
    const interval = setInterval(() => {
      flipCoin();
    }, 2800);
    return () => clearInterval(interval);
  }, [animate]);

  return (
    <div className="mt-4 p-4 rounded-xl bg-orange-50/80 border border-orange-200 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1 text-slate-700 text-sm">
        <div className="font-bold text-orange-950 mb-1 flex items-center gap-2">
          <span>Minh họa trực quan: Mô hình tung đồng xu</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-orange-200 text-orange-900 font-mono font-medium">
            2 kết quả: Sấp (S) hoặc Ngửa (N)
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-2">
          Khi tung đồng xu ngẫu nhiên, xác suất lý thuyết xuất hiện mặt Sấp là 1/2 (50%). Xác suất thực nghiệm sau nhiều lần tung sẽ dần xấp xỉ xác suất này!
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={flipCoin}
            disabled={isFlipping}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-xs transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
          >
            🪙 {isFlipping ? 'Đang quay...' : 'Bấm để lật đồng xu'}
          </button>
          <span className="text-xs text-orange-800">
            Mặt hiện tại: <strong className="text-orange-950 font-bold">{side === 'heads' ? 'Mặt SẤP (S)' : 'Mặt NGỬA (N)'}</strong>
          </span>
        </div>
      </div>

      <div className="w-36 h-36 flex items-center justify-center relative perspective-500 shrink-0">
        <div
          className={`w-28 h-28 rounded-full border-4 border-amber-500 shadow-md flex items-center justify-center transition-transform duration-500 ${
            isFlipping ? 'rotate-y-180 scale-95' : 'rotate-y-0 scale-100'
          }`}
          style={{
            background: side === 'heads'
              ? 'radial-gradient(circle, #fef08a 0%, #f59e0b 80%, #b45309 100%)'
              : 'radial-gradient(circle, #fed7aa 0%, #ea580c 80%, #9a3412 100%)',
          }}
        >
          {side === 'heads' ? (
            <div className="flex flex-col items-center text-amber-950 select-none">
              <span className="text-3xl font-black tracking-widest drop-shadow-xs">S</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Mặt Sấp</span>
              <span className="text-[8px] opacity-75">Quốc huy</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-orange-950 select-none">
              <span className="text-3xl font-black tracking-widest drop-shadow-xs">N</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Mặt Ngửa</span>
              <span className="text-[8px] opacity-75">Mệnh giá</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

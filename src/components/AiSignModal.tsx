import React, { useEffect } from 'react';
import { TREE_IMAGE } from '../treeImage.ts';
import { ArrowLeft, Sparkles, AlertTriangle, Lightbulb, Compass, CheckCircle2 } from 'lucide-react';

interface AiSignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiSignModal: React.FC<AiSignModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const timelineSteps = [
    {
      num: 1,
      title: 'Lên ý tưởng',
      desc: 'Thử 4 hướng: trò chơi giải đố, trình chiếu, sơ đồ tư duy, cuối cùng chọn "cây kiến thức".',
    },
    {
      num: 2,
      title: 'Soạn nội dung',
      desc: 'AI soạn nháp lý thuyết 11 chủ đề, lớp đối chiếu với SGK.',
    },
    {
      num: 3,
      title: 'Vẽ hình',
      desc: 'Dùng Gemini tạo ảnh cây táo 3D, chỉnh 4 lần mới ưng.',
    },
    {
      num: 4,
      title: 'Làm website',
      desc: 'Dùng Google AI Studio viết code theo yêu cầu của lớp.',
    },
    {
      num: 5,
      title: 'Kiểm tra',
      desc: 'Thử từng quả, tìm lỗi và yêu cầu AI sửa.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col w-full h-full bg-slate-900 overflow-y-auto selection:bg-amber-200">
      {/* 1. NỀN: CHÍNH ẢNH CÂY LÀM MỜ MẠNH, PHỦ LỚP TRẮNG TRONG SUỐT */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={TREE_IMAGE}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover scale-110 filter blur-3xl opacity-35"
        />
        <div className="absolute inset-0 bg-slate-50/85 backdrop-blur-xl" />
      </div>

      {/* 2. THANH TIÊU ĐỀ CỐ ĐỊNH PHÍA TRÊN CÙNG CÓ NÚT "← VỀ CÂY KIẾN THỨC" */}
      <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-98"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Về cây kiến thức</span>
        </button>

        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline">
          Dự án học tập Toán 6
        </span>
      </div>

      {/* 3. NỘI DUNG TRANG "EM LÀM CHỦ AI" */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col gap-6 selectable-text">
        {/* TIÊU ĐỀ VÀ DÒNG PHỤ */}
        <div className="text-center animate-[fadeIn_0.4s_ease-out]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80 text-xs font-bold mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Chuyên đề Công nghệ & Toán học</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Em làm chủ AI
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Lớp 6/23 đã dùng AI như thế nào để làm "Cây kiến thức Toán 6"?
          </p>
        </div>

        {/* HÀNH TRÌNH CỦA LỚP: DÒNG THỜI GIAN NGANG 5 MỐC */}
        <div className="bg-white/95 rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm animate-[fadeIn_0.5s_ease-out]">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Compass className="w-4 h-4 text-sky-600" />
            <span>HÀNH TRÌNH CỦA LỚP:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {timelineSteps.map((step) => (
              <div
                key={step.num}
                className="flex flex-col bg-slate-50/90 rounded-xl p-3 border border-slate-200/70 hover:border-sky-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
                    {step.num}
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {step.title}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 THẺ TRẢ LỜI 4 CÂU HỎI (LƯỚI 2X2 TRÊN MÁY TÍNH, 1 CỘT TRÊN ĐIỆN THOẠI) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CÂU 1 */}
          <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col animate-[fadeIn_0.6s_ease-out]">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-xs font-bold">
                CÂU 1
              </span>
              <span>AI đã giúp em ở khâu nào?</span>
            </h2>
            <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-sky-500 font-bold mt-0.5">•</span>
                <span>Gợi ý ý tưởng và cách trình bày website.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 font-bold mt-0.5">•</span>
                <span>Soạn nháp phần lý thuyết cho 11 chủ đề Toán 6.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 font-bold mt-0.5">•</span>
                <span>Vẽ ảnh cây táo 3D (Gemini).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 font-bold mt-0.5">•</span>
                <span>Viết code website (Google AI Studio) và nén ảnh cho nhẹ.</span>
              </li>
            </ul>
          </div>

          {/* CÂU 2 */}
          <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col animate-[fadeIn_0.7s_ease-out]">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                CÂU 2
              </span>
              <span>Em đã kiểm tra thông tin như thế nào?</span>
            </h2>
            <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span>
                  Đối chiếu từng quả kiến thức với SGK Toán 6 [bộ sách lớp đang học]; [số chỗ đã sửa] chỗ được sửa lại cho đúng cách viết trong sách.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span>
                  Đếm lại số quả táo trong ảnh: yêu cầu 10 quả nhưng AI vẽ 11 quả. Lớp quyết định tận dụng quả thừa thành chủ đề thứ 11 "Tỉ số và phần trăm".
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span>
                  Kiểm tra lại báo cáo của AI: AI nói đã dùng ảnh của lớp, nhưng màn hình vẫn hiện cây khác. Lớp kiểm tra file thì thấy độ dài chỉ khoảng 28.000 ký tự thay vì khoảng 124.000 ký tự, tức là AI đã tự tạo file khác. Lớp tự thay lại file đúng.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span>Thử website trên máy tính, điện thoại và máy chiếu.</span>
              </li>
            </ul>
          </div>

          {/* CÂU 3 */}
          <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col animate-[fadeIn_0.8s_ease-out]">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-bold">
                CÂU 3
              </span>
              <span>Phần nào là do em tự làm?</span>
            </h2>
            <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>Chọn chủ đề, chọn hướng làm và quyết định đổi ý tưởng khi thấy chưa phù hợp.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>Chọn 11 chủ đề kiến thức và kiểm tra nội dung theo SGK.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>Chọn ảnh, yêu cầu AI chỉnh ảnh (bớt chi tiết trẻ con, đổi sang 3D).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>Thử nghiệm, phát hiện lỗi và viết yêu cầu để AI sửa.</span>
              </li>
            </ul>
          </div>

          {/* CÂU 4 */}
          <div className="bg-white/95 rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col animate-[fadeIn_0.9s_ease-out]">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-bold">
                CÂU 4
              </span>
              <span>Phần nào là AI hỗ trợ?</span>
            </h2>
            <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold mt-0.5">•</span>
                <span>Viết code giao diện và hiệu ứng.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold mt-0.5">•</span>
                <span>Vẽ ảnh nền cây táo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold mt-0.5">•</span>
                <span>Soạn bản nháp nội dung để lớp kiểm tra lại.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold mt-0.5">•</span>
                <span>Gợi ý cách trình bày cho dễ nhìn.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* THẺ "AI CŨNG SAI" */}
        <div className="bg-rose-50/95 rounded-2xl p-5 border border-rose-200/80 shadow-sm animate-[fadeIn_1.0s_ease-out]">
          <h2 className="text-xs font-bold text-rose-900 uppercase tracking-wide mb-3 flex items-center gap-2 pb-2 border-b border-rose-200/50">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>AI CŨNG SAI:</span>
          </h2>
          <ul className="text-xs text-rose-950 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold mt-0.5">•</span>
              <span>Vẽ 11 quả táo dù yêu cầu 10 quả.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold mt-0.5">•</span>
              <span>Báo "đã hoàn thành" nhưng thực tế vẫn dùng ảnh khác.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold mt-0.5">•</span>
              <span>Gợi ý độ sâu rãnh Mariana không khớp với nguồn tin cậy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold mt-0.5">•</span>
              <span>Gợi ý một câu đố về BCNN tự mâu thuẫn, không có đáp án.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold mt-0.5">•</span>
              <span>Tự ý thêm nút "Đổi ảnh cây khác" mà lớp không yêu cầu.</span>
            </li>
          </ul>
        </div>

        {/* THẺ "ĐIỀU LỚP EM HỌC ĐƯỢC" */}
        <div className="bg-emerald-50/95 rounded-2xl p-5 border border-emerald-200/80 shadow-sm animate-[fadeIn_1.1s_ease-out] mb-8">
          <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-wide mb-2 flex items-center gap-2 pb-2 border-b border-emerald-200/50">
            <Lightbulb className="w-4 h-4 text-emerald-600" />
            <span>ĐIỀU LỚP EM HỌC ĐƯỢC:</span>
          </h2>
          <p className="text-xs text-emerald-950 leading-relaxed font-medium">
            AI làm rất nhanh nhưng không phải lúc nào cũng đúng. Muốn AI làm tốt thì phải ra yêu cầu rõ ràng, và luôn tự kiểm tra lại trước khi tin kết quả. Khi AI làm sai, đôi khi mình có thể biến cái sai thành ý tưởng mới.
          </p>
        </div>
      </div>
    </div>
  );
};

// Content data for Mathematics Grade 6 Knowledge Tree (Toán 6)
// Bộ sách Kết nối tri thức / Cánh Diều / Chân trời sáng tạo

export interface KnowledgeTier {
  title: string;
  text: string;
}

export interface FruitContent {
  id: number;
  branchId: 'algebra' | 'geometry' | 'statistics';
  title: string;
  shortLabel: string;
  fruitNumber: number;
  colorTheme: 'red' | 'purple' | 'orange';
  tier1: KnowledgeTier;
  tier2: KnowledgeTier;
  tier3: KnowledgeTier;
  hasIllustration?: 'shapes' | 'symmetry' | 'angle' | 'barchart' | 'coin';
}

export interface BranchInfo {
  id: 'algebra' | 'geometry' | 'statistics';
  name: string;
  color: string;
  fruitCount: number;
  textColor: string;
  bgColor: string;
  borderColor: string;
}

export const BRANCHES: Record<string, BranchInfo> = {
  algebra: {
    id: 'algebra',
    name: 'Số và Đại số',
    color: '#ef4444', // Red
    fruitCount: 6,
    textColor: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
  geometry: {
    id: 'geometry',
    name: 'Hình học và Đo lường',
    color: '#9333ea', // Purple
    fruitCount: 3,
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  statistics: {
    id: 'statistics',
    name: 'Thống kê và Xác suất',
    color: '#f59e0b', // Orange/Amber
    fruitCount: 2,
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
};

export const FRUITS_DATA: FruitContent[] = [
  // CÀNH "SỐ VÀ ĐẠI SỐ" (6 quả đỏ)
  {
    id: 1,
    branchId: 'algebra',
    title: 'QUẢ 1 – SỐ TỰ NHIÊN VÀ PHÉP TÍNH',
    shortLabel: 'Số tự nhiên',
    fruitNumber: 1,
    colorTheme: 'red',
    tier1: {
      title: 'Tầng 1 – Khái niệm',
      text: 'ℕ = {0; 1; 2; 3; …} là tập hợp số tự nhiên; ℕ* = {1; 2; 3; …} là tập hợp số tự nhiên khác 0. Trong hệ thập phân, mỗi chữ số có giá trị theo vị trí của nó; ví dụ ab = a · 10 + b.',
    },
    tier2: {
      title: 'Tầng 2 – Quy tắc và công thức',
      text: 'Lũy thừa: aⁿ = a · a · … · a (n thừa số a). aᵐ · aⁿ = aᵐ⁺ⁿ ; aᵐ : aⁿ = aᵐ⁻ⁿ (a ≠ 0, m ≥ n). Thứ tự thực hiện phép tính: ( ) → [ ] → { }; lũy thừa → nhân, chia → cộng, trừ. Số La Mã: I = 1, V = 5, X = 10; IV = 4, IX = 9.',
    },
    tier3: {
      title: 'Tầng 3 – Ghi nhớ nhanh',
      text: 'Ngoặc → Lũy thừa → Nhân chia → Cộng trừ.',
    },
  },
  {
    id: 2,
    branchId: 'algebra',
    title: 'QUẢ 2 – TÍNH CHIA HẾT',
    shortLabel: 'Tính chia hết',
    fruitNumber: 2,
    colorTheme: 'red',
    tier1: {
      title: 'Tầng 1 – Khái niệm',
      text: 'a chia hết cho b (b ≠ 0) nếu a = b · k với k là số tự nhiên; khi đó a là bội của b, b là ước của a. Số nguyên tố là số tự nhiên lớn hơn 1 chỉ có hai ước là 1 và chính nó; hợp số là số tự nhiên lớn hơn 1 có nhiều hơn hai ước.',
    },
    tier2: {
      title: 'Tầng 2 – Quy tắc và công thức',
      text: 'Chia hết cho 2: tận cùng là 0, 2, 4, 6, 8. Chia hết cho 5: tận cùng là 0 hoặc 5. Chia hết cho 3 (cho 9): tổng các chữ số chia hết cho 3 (cho 9). ƯCLN: lấy các thừa số nguyên tố chung, số mũ nhỏ nhất. BCNN: lấy các thừa số nguyên tố chung và riêng, số mũ lớn nhất.',
    },
    tier3: {
      title: 'Tầng 3 – Ghi nhớ nhanh',
      text: 'Số 0 và 1 không là số nguyên tố, cũng không là hợp số; 2 là số nguyên tố chẵn duy nhất.',
    },
  },
  {
    id: 3,
    branchId: 'algebra',
    title: 'QUẢ 3 – SỐ NGUYÊN',
    shortLabel: 'Số nguyên',
    fruitNumber: 3,
    colorTheme: 'red',
    tier1: {
      title: 'Tầng 1 – Khái niệm',
      text: 'ℤ = {…; −2; −1; 0; 1; 2; …} gồm số nguyên âm, số 0 và số nguyên dương. Số đối của a là −a. Trên trục số nằm ngang, điểm bên trái biểu diễn số nhỏ hơn.',
    },
    tier2: {
      title: 'Tầng 2 – Quy tắc và công thức',
      text: 'Cộng hai số cùng dấu: cộng phần số tự nhiên, giữ dấu chung. Cộng hai số khác dấu: lấy phần số lớn trừ phần số nhỏ, lấy dấu của số có phần số lớn hơn. Phép trừ: a − b = a + (−b). Bỏ ngoặc có dấu "−" đằng trước thì đổi dấu các số hạng trong ngoặc. Nhân, chia: cùng dấu được kết quả dương, khác dấu được kết quả âm.',
    },
    tier3: {
      title: 'Tầng 3 – Ghi nhớ nhanh',
      text: 'Cùng dấu thì dương, khác dấu thì âm.',
    },
  },
  {
    id: 4,
    branchId: 'algebra',
    title: 'QUẢ 4 – PHÂN SỐ',
    shortLabel: 'Phân số',
    fruitNumber: 4,
    colorTheme: 'red',
    tier1: {
      title: 'Tầng 1 – Khái niệm',
      text: 'Phân số a/b với a, b là số nguyên, b ≠ 0. Hai phân số a/b và c/d bằng nhau nếu a · d = b · c. Phân số tối giản là phân số mà tử và mẫu chỉ có ước chung là 1 và −1.',
    },
    tier2: {
      title: 'Tầng 2 – Quy tắc và công thức',
      text: 'Cộng, trừ: quy đồng mẫu rồi cộng, trừ các tử. Nhân: a/b · c/d = (a · c)/(b · d). Chia: a/b : c/d = a/b · d/c (c ≠ 0). Giá trị m/n của số b là b · m/n; nếu m/n của một số bằng a thì số đó là a : m/n.',
    },
    tier3: {
      title: 'Tầng 3 – Ghi nhớ nhanh',
      text: 'Không cộng tử với tử, mẫu với mẫu; chia là nhân với nghịch đảo.',
    },
  },
  {
    id: 5,
    branchId: 'algebra',
    title: 'QUẢ 5 – SỐ THẬP PHÂN',
    shortLabel: 'Số thập phân',
    fruitNumber: 5,
    colorTheme: 'red',
    tier1: {
      title: 'Tầng 1 – Khái niệm',
      text: 'Phân số có mẫu là 10, 100, 1000, … viết được dưới dạng số thập phân, ví dụ 3/10 = 0,3. Số thập phân gồm phần nguyên (trước dấu phẩy) và phần thập phân (sau dấu phẩy).',
    },
    tier2: {
      title: 'Tầng 2 – Quy tắc và công thức',
      text: 'Làm tròn: chữ số đầu tiên bị bỏ đi lớn hơn hoặc bằng 5 thì cộng thêm 1 vào chữ số cuối cùng được giữ lại; nhỏ hơn 5 thì giữ nguyên. Phép tính: cộng, trừ, nhân, chia số thập phân tương tự như với số tự nhiên và số nguyên, luôn chú ý vị trí dấu phẩy.',
    },
    tier3: {
      title: 'Tầng 3 – Ghi nhớ nhanh',
      text: 'Thêm chữ số 0 vào cuối phần thập phân thì giá trị không đổi: 0,3 = 0,30.',
    },
  },
  {
    id: 6,
    branchId: 'algebra',
    title: 'QUẢ 6 – TỈ SỐ VÀ PHẦN TRĂM',
    shortLabel: 'Tỉ số và phần trăm',
    fruitNumber: 6,
    colorTheme: 'red',
    tier1: {
      title: 'Tầng 1 – Khái niệm',
      text: 'Tỉ số của a và b (b ≠ 0) là thương a : b, viết là a/b. Tỉ số phần trăm của a và b là (a/b) · 100%.',
    },
    tier2: {
      title: 'Tầng 2 – Quy tắc và công thức',
      text: 'Giá trị m% của số b là b · m/100. Nếu m% của một số bằng a thì số đó là a : m/100.',
    },
    tier3: {
      title: 'Tầng 3 – Ghi nhớ nhanh',
      text: 'Phần trăm là tỉ số với mẫu số 100.',
    },
  },

  // CÀNH "HÌNH HỌC VÀ ĐO LƯỜNG" (3 quả tím)
  {
    id: 7,
    branchId: 'geometry',
    title: 'QUẢ 7 – HÌNH PHẲNG',
    shortLabel: 'Hình phẳng',
    fruitNumber: 7,
    colorTheme: 'purple',
    hasIllustration: 'shapes',
    tier1: {
      title: 'Tầng 1 – Khái niệm',
      text: 'Các hình phẳng thường gặp: tam giác đều, hình vuông, lục giác đều, hình chữ nhật, hình thoi, hình bình hành, hình thang cân.',
    },
    tier2: {
      title: 'Tầng 2 – Quy tắc và công thức',
      text: 'Hình chữ nhật: C = 2 · (a + b), S = a · b. Hình vuông: C = 4 · a, S = a · a. Hình thoi (hai đường chéo m, n): S = (m · n) : 2. Hình bình hành (đáy a, chiều cao h): S = a · h. Hình thang cân (hai đáy a, b, chiều cao h): S = (a + b) · h : 2.',
    },
    tier3: {
      title: 'Tầng 3 – Ghi nhớ nhanh',
      text: 'Chu vi đo bằng đơn vị độ dài (m), diện tích đo bằng đơn vị diện tích (m²).',
    },
  },
  {
    id: 8,
    branchId: 'geometry',
    title: 'QUẢ 8 – TÍNH ĐỐI XỨNG',
    shortLabel: 'Tính đối xứng',
    fruitNumber: 8,
    colorTheme: 'purple',
    hasIllustration: 'symmetry',
    tier1: {
      title: 'Tầng 1 – Khái niệm',
      text: 'Trục đối xứng: gấp hình theo đường thẳng đó thì hai nửa trùng khít nhau. Tâm đối xứng: quay hình nửa vòng quanh điểm đó thì hình trùng với chính nó.',
    },
    tier2: {
      title: 'Tầng 2 – Quy tắc và công thức',
      text: 'Số trục đối xứng: hình chữ nhật 2, hình thoi 2, hình vuông 4, tam giác đều 3, lục giác đều 6, hình thang cân 1. Có tâm đối xứng: hình chữ nhật, hình vuông, hình thoi, hình bình hành, lục giác đều.',
    },
    tier3: {
      title: 'Tầng 3 – Ghi nhớ nhanh',
      text: 'Tam giác đều có 3 trục đối xứng nhưng không có tâm đối xứng.',
    },
  },
  {
    id: 9,
    branchId: 'geometry',
    title: 'QUẢ 9 – ĐƯỜNG THẲNG VÀ GÓC',
    shortLabel: 'Đường thẳng và góc',
    fruitNumber: 9,
    colorTheme: 'purple',
    hasIllustration: 'angle',
    tier1: {
      title: 'Tầng 1 – Khái niệm',
      text: 'Điểm, đường thẳng, đoạn thẳng, tia là các hình cơ bản. Góc là hình gồm hai tia chung gốc.',
    },
    tier2: {
      title: 'Tầng 2 – Quy tắc và công thức',
      text: 'M là trung điểm của đoạn AB thì MA = MB = AB : 2. Góc nhọn nhỏ hơn 90°; góc vuông bằng 90°; góc tù lớn hơn 90° và nhỏ hơn 180°; góc bẹt bằng 180°.',
    },
    tier3: {
      title: 'Tầng 3 – Ghi nhớ nhanh',
      text: 'Hai đường thẳng phân biệt thì hoặc cắt nhau, hoặc song song.',
    },
  },

  // CÀNH "THỐNG KÊ VÀ XÁC SUẤT" (2 quả cam)
  {
    id: 10,
    branchId: 'statistics',
    title: 'QUẢ 10 – DỮ LIỆU VÀ BIỂU ĐỒ',
    shortLabel: 'Dữ liệu và biểu đồ',
    fruitNumber: 10,
    colorTheme: 'orange',
    hasIllustration: 'barchart',
    tier1: {
      title: 'Tầng 1 – Khái niệm',
      text: 'Dữ liệu có thể là số hoặc không phải số; thu thập bằng quan sát, khảo sát, phỏng vấn.',
    },
    tier2: {
      title: 'Tầng 2 – Quy tắc và công thức',
      text: 'Dữ liệu được trình bày bằng bảng thống kê, biểu đồ tranh (mỗi biểu tượng đại diện cho một số lượng), biểu đồ cột, biểu đồ cột kép (so sánh hai bộ dữ liệu).',
    },
    tier3: {
      title: 'Tầng 3 – Ghi nhớ nhanh',
      text: 'Luôn đọc chú thích trước khi đọc biểu đồ.',
    },
  },
  {
    id: 11,
    branchId: 'statistics',
    title: 'QUẢ 11 – XÁC SUẤT THỰC NGHIỆM',
    shortLabel: 'Xác suất thực nghiệm',
    fruitNumber: 11,
    colorTheme: 'orange',
    hasIllustration: 'coin',
    tier1: {
      title: 'Tầng 1 – Khái niệm',
      text: 'Một hoạt động có thể có nhiều kết quả; ví dụ tung đồng xu có hai kết quả: sấp hoặc ngửa.',
    },
    tier2: {
      title: 'Tầng 2 – Quy tắc và công thức',
      text: 'Xác suất thực nghiệm của một sự kiện = (số lần sự kiện xảy ra) : (tổng số lần thực hiện).',
    },
    tier3: {
      title: 'Tầng 3 – Ghi nhớ nhanh',
      text: 'Chia cho tổng số lần thực hiện, không phải chia cho số kết quả có thể.',
    },
  },
];

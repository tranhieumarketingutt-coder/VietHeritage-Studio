export interface LeafletMarkerItem {
  id: string;
  regionId: string;
  type: 'sovereign' | 'city';
  lat: number;
  lng: number;
  labelVi: string;
  labelEn: string;
  popupTitleVi: string;
  popupTitleEn: string;
  popupDescVi: string;
  popupDescEn: string;
  initial?: string;
  color?: string;
}

export const LEAFLET_MARKERS: LeafletMarkerItem[] = [
  {
    id: 'hoang-sa',
    regionId: 'hoang-sa-truong-sa',
    type: 'sovereign',
    lat: 16.5,
    lng: 112.0,
    labelVi: 'Huyện Hoàng Sa, TP. Đà Nẵng, Việt Nam',
    labelEn: 'Hoang Sa District, Da Nang City, Vietnam',
    popupTitleVi: 'QUẦN ĐẢO HOÀNG SA',
    popupTitleEn: 'HOANG SA ARCHIPELAGO',
    popupDescVi: 'Chủ quyền thiêng liêng · Lịch sử Hải đội Hoàng Sa thời Nguyễn',
    popupDescEn: 'Sacred sovereignty · History of Hoang Sa Flotilla in Nguyen Dynasty'
  },
  {
    id: 'truong-sa',
    regionId: 'hoang-sa-truong-sa',
    type: 'sovereign',
    lat: 9.5,
    lng: 114.0,
    labelVi: 'Huyện Trường Sa, Tỉnh Khánh Hòa, Việt Nam',
    labelEn: 'Truong Sa District, Khanh Hoa Province, Vietnam',
    popupTitleVi: 'QUẦN ĐẢO TRƯỜNG SA',
    popupTitleEn: 'TRUONG SA ARCHIPELAGO',
    popupDescVi: 'Chủ quyền thiêng liêng ngàn đời · Ngư dân kiên cường bám biển',
    popupDescEn: 'Eternal sacred sovereignty · Resilient fishermen at sea'
  },
  {
    id: 'ha-noi',
    regionId: 'bac-bo',
    type: 'city',
    lat: 21.0285,
    lng: 105.8542,
    initial: 'HN',
    color: '#8B0000',
    labelVi: 'Thủ Đô Hà Nội (Thăng Long)',
    labelEn: 'Hanoi Capital (Thang Long)',
    popupTitleVi: 'Thủ Đô Hà Nội',
    popupTitleEn: 'Hanoi Capital',
    popupDescVi: 'Áo Giao Lĩnh, Áo Tứ Thân, Áo Ngũ Thân Hà Thành',
    popupDescEn: 'Giao Linh, Tu Than, Ngu Than of Hanoi'
  },
  {
    id: 'hue',
    regionId: 'mientrung-hue',
    type: 'city',
    lat: 16.4637,
    lng: 107.5909,
    initial: 'H',
    color: '#D4AF37',
    labelVi: 'Cố Đô Huế',
    labelEn: 'Hue Imperial City',
    popupTitleVi: 'Cố Đô Huế',
    popupTitleEn: 'Hue Imperial City',
    popupDescVi: 'Áo Nhật Bình Hoàng Gia, Áo Tấc, Áo Ngũ Thân Cung Đình',
    popupDescEn: 'Royal Nhat Binh, Ao Tac, Imperial Ngu Than'
  },
  {
    id: 'da-nang',
    regionId: 'namtrungbo-hoian',
    type: 'city',
    lat: 15.8801,
    lng: 108.3380,
    initial: 'HA',
    color: '#C47B89',
    labelVi: 'Đô Thị Cổ Hội An & Đà Nẵng',
    labelEn: 'Hoi An Ancient Town & Da Nang',
    popupTitleVi: 'Đô Thị Cổ Hội An',
    popupTitleEn: 'Hoi An Ancient Town',
    popupDescVi: 'Áo Ngũ Thân Sa The, Tơ Lụa Mã Châu',
    popupDescEn: 'Sa The Ngu Than, Ma Chau Silk'
  },
  {
    id: 'tay-nguyen',
    regionId: 'tay-nguyen',
    type: 'city',
    lat: 12.6667,
    lng: 108.0500,
    initial: 'TN',
    color: '#2E7D32',
    labelVi: 'Tây Nguyên Đại Ngàn (Buôn Ma Thuột)',
    labelEn: 'Central Highlands (Buon Ma Thuot)',
    popupTitleVi: 'Tây Nguyên',
    popupTitleEn: 'Central Highlands',
    popupDescVi: 'Váy Tấm, Dệt Zèng Thổ Cẩm',
    popupDescEn: 'Vay Tam, Zeng Brocade Weaving'
  },
  {
    id: 'hcmc',
    regionId: 'nam-bo',
    type: 'city',
    lat: 10.8231,
    lng: 106.6297,
    initial: 'SG',
    color: '#1E3A8A',
    labelVi: 'TP. Hồ Chí Minh (Sài Gòn)',
    labelEn: 'Ho Chi Minh City (Saigon)',
    popupTitleVi: 'Sài Gòn',
    popupTitleEn: 'Saigon',
    popupDescVi: 'Áo Bà Ba, Áo Ngũ Thân Lục Tỉnh Nam Kỳ',
    popupDescEn: 'Ao Ba Ba, Ngu Than of Southern Six Provinces'
  }
];

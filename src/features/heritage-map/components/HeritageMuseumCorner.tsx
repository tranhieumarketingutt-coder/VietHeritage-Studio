import React, { useState, useMemo } from 'react';
import { MAP_LOCATIONS } from '../data/mapLocations';
import type { MapLocation } from '../../../shared/types/map';
import { MapPin, Clock, Ticket, ExternalLink, Search, X } from 'lucide-react';

export interface HeritageMuseumCornerProps {
  lang?: 'vi' | 'en';
}

const REGION_OPTIONS = [
  { id: 'all', labelVi: 'Tất cả khu vực', labelEn: 'All Regions' },
  { id: 'Hà Nội', labelVi: 'Hà Nội', labelEn: 'Hanoi' },
  { id: 'Huế', labelVi: 'Huế', labelEn: 'Hue' },
  { id: 'Đà Nẵng', labelVi: 'Đà Nẵng', labelEn: 'Da Nang' },
  { id: 'Hội An', labelVi: 'Hội An', labelEn: 'Hoi An' },
  { id: 'TP. Hồ Chí Minh', labelVi: 'TP. Hồ Chí Minh', labelEn: 'Ho Chi Minh City' }
] as const;

const CATEGORY_OPTIONS = [
  { id: 'all', labelVi: 'Tất cả', labelEn: 'All Categories' },
  { id: 'Bảo tàng', labelVi: 'Bảo tàng', labelEn: 'Museums' },
  { id: 'Địa điểm chụp ảnh', labelVi: 'Địa điểm chụp ảnh', labelEn: 'Photo Spots' },
  { id: 'Tiệm cho thuê đồ', labelVi: 'Tiệm cho thuê đồ', labelEn: 'Costume Rentals' }
] as const;

/**
 * Góc Bảo tàng Di sản: Heritage museum corner, photo spots, and costume rental ateliers.
 */
export const HeritageMuseumCorner: React.FC<HeritageMuseumCornerProps> = ({ lang = 'vi' }) => {
  const isEn = lang === 'en';
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dual filtering: Region + Category + Search query
  const filteredLocations = useMemo(() => {
    return MAP_LOCATIONS.filter((item: MapLocation) => {
      // 1. Region filter
      if (selectedRegion !== 'all' && item.region !== selectedRegion) {
        return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'all') {
        const matchesCategory =
          item.categoryVi === selectedCategory ||
          (selectedCategory === 'Bảo tàng' && item.type === 'museum') ||
          (selectedCategory === 'Địa điểm chụp ảnh' && item.type === 'photo') ||
          (selectedCategory === 'Tiệm cho thuê đồ' && item.type === 'shop');
        if (!matchesCategory) {
          return false;
        }
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.nameVi.toLowerCase().includes(q) || (item.nameEn && item.nameEn.toLowerCase().includes(q));
        const matchesAddress = item.address.toLowerCase().includes(q);
        const matchesFeatures = item.featuresVi.toLowerCase().includes(q);
        if (!matchesName && !matchesAddress && !matchesFeatures) {
          return false;
        }
      }

      return true;
    });
  }, [selectedRegion, selectedCategory, searchQuery]);

  // Check if current filter is rental shop in a region with no shops (Da Nang, Hoi An, HCMC)
  const isRentalFilterWithNoShops = useMemo(() => {
    if (selectedCategory === 'Tiệm cho thuê đồ') {
      const regionsWithoutRentals = ['Đà Nẵng', 'Hội An', 'TP. Hồ Chí Minh'];
      return regionsWithoutRentals.includes(selectedRegion);
    }
    return false;
  }, [selectedCategory, selectedRegion]);

  // Construct dynamic "View all on Google Maps" query for the selected region
  const regionSearchTarget = selectedRegion === 'all' ? 'Việt Nam' : selectedRegion;
  const allGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'bảo tàng và địa điểm di sản ' + regionSearchTarget
  )}`;

  return (
    <section
      id="heritageMuseumCornerSection"
      aria-labelledby="heritageCornerTitle"
      className="relative rounded-3xl bg-gradient-to-b from-[#FAF7F2]/95 via-white/90 to-[#FAF7F2]/95 border-2 border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(139,0,0,0.06),0_4px_16px_rgba(212,175,55,0.15)] p-6 sm:p-8 lg:p-10 space-y-8 backdrop-blur-md overflow-hidden"
    >
      {/* Decorative Heritage Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8B0000] rounded-tl-2xl pointer-events-none" aria-hidden="true"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#8B0000] rounded-tr-2xl pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#8B0000] rounded-bl-2xl pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8B0000] rounded-br-2xl pointer-events-none" aria-hidden="true"></div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#D4AF37]/30">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] text-xs font-mono font-bold tracking-wider uppercase mb-3 shadow-2xs">
            <span className="text-[#D4AF37]">✦</span>
            <span>{isEn ? 'HERITAGE ATLAS & LOCATIONS' : 'BẢN ĐỒ TỌA ĐỘ VĂN HÓA'}</span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-600 font-medium">{isEn ? 'Real-world Heritage Data' : 'Dữ Liệu Thực Tế'}</span>
          </div>
          <h2
            id="heritageCornerTitle"
            className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#222222] tracking-tight leading-tight"
          >
            {isEn ? 'Heritage Museum Corner' : 'Góc Bảo tàng Di sản'}
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-2 max-w-2xl font-sans leading-relaxed">
            {isEn
              ? 'Official directory of certified museums, historic photo backdrops, and traditional costume rental ateliers across Vietnam.'
              : 'Tra cứu hệ thống bảo tàng chính thống, tọa độ chụp ảnh di sản và các tiệm cho thuê cổ phục uy tín tại các vùng văn hóa trọng điểm.'}
          </p>
        </div>

        {/* Search Input Box */}
        <div className="w-full sm:w-80 shrink-0">
          <div className="relative">
            <Search className="text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4" />
            <label htmlFor="heritageLocationSearch" className="sr-only">
              {isEn ? 'Search heritage locations by name, address, notes' : 'Tìm kiếm địa điểm di sản theo tên, địa chỉ, mô tả'}
            </label>
            <input
              id="heritageLocationSearch"
              type="text"
              placeholder={isEn ? 'Search venue or address...' : 'Tìm tên địa điểm, địa chỉ...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs font-mono text-stone-800 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-[#8B0000] transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={isEn ? 'Clear search filter' : 'Xóa từ khóa tìm kiếm'}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-900 p-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dual Filter Rows */}
      <div className="space-y-3 bg-white/70 p-4 rounded-2xl border border-[#D4AF37]/35 shadow-xs">
        {/* ROW 1: REGION FILTER (Khu vực - On Top) */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#8B0000] tracking-wider">
              {isEn ? '1. Filter by Region:' : '1. Lọc Theo Khu Vực:'}
            </span>
            <span className="text-[11px] text-stone-500 font-mono">
              ({selectedRegion === 'all' ? (isEn ? 'All' : 'Tất cả') : selectedRegion})
            </span>
          </div>
          <div className="flex items-center space-x-1.5 p-1 bg-[#F5F1E8] rounded-xl border border-stone-200 overflow-x-auto max-w-full">
            {REGION_OPTIONS.map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedRegion(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
                  selectedRegion === opt.id
                    ? 'bg-[#8B0000] text-white font-bold shadow-sm'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-white/70'
                }`}
              >
                {isEn ? opt.labelEn : opt.labelVi}
              </button>
            ))}
          </div>
        </div>

        {/* ROW 2: CATEGORY FILTER (Loại - Below Region Row) */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase text-stone-700 tracking-wider">
              {isEn ? '2. Filter by Category:' : '2. Lọc Theo Loại:'}
            </span>
            <span className="text-[11px] text-stone-500 font-mono">
              ({selectedCategory === 'all' ? (isEn ? 'All types' : 'Tất cả loại') : selectedCategory})
            </span>
          </div>
          <div className="flex items-center space-x-1.5 p-1 bg-[#F5F1E8] rounded-xl border border-stone-200 overflow-x-auto max-w-full">
            {CATEGORY_OPTIONS.map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedCategory(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] ${
                  selectedCategory === opt.id
                    ? 'bg-[#8B0000] text-white font-bold shadow-sm'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-white/70'
                }`}
              >
                {isEn ? opt.labelEn : opt.labelVi}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Count & Active Filter Indicator */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-stone-600 gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            {isEn ? 'Displaying' : 'Hiển thị'}:{' '}
            <strong className="text-[#8B0000]">{filteredLocations.length}</strong>{' '}
            {isEn ? 'heritage coordinates' : 'tọa độ di sản'}
          </span>
          {selectedRegion !== 'all' && (
            <span className="px-2 py-0.5 rounded-md bg-[#8B0000]/10 text-[#8B0000] font-bold">
              {selectedRegion}
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/20 text-stone-800 font-bold">
              {selectedCategory}
            </span>
          )}
        </div>

        {(selectedRegion !== 'all' || selectedCategory !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedRegion('all');
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="text-[11px] text-[#8B0000] hover:underline cursor-pointer font-bold"
          >
            {isEn ? 'Reset all filters' : 'Đặt lại bộ lọc'}
          </button>
        )}
      </div>

      {/* Content Area */}
      {isRentalFilterWithNoShops ? (
        /* Friendly notification for regions without rental shops */
        <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-[#D4AF37]/40 shadow-xs space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200">
            <Ticket className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-800">
            {isEn ? 'Rental Shops Updating' : 'Thông Báo Cập Nhật'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto font-sans leading-relaxed">
            {isEn
              ? 'We are currently updating verified costume rental ateliers in this region.'
              : 'Chúng tôi đang cập nhật các tiệm cho thuê trang phục ở khu vực này.'}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="px-4 py-2 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              {isEn ? 'View all locations in this region' : 'Xem các địa điểm khác trong khu vực'}
            </button>
          </div>
        </div>
      ) : filteredLocations.length === 0 ? (
        /* Generic empty state */
        <div className="p-10 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 font-mono text-xs space-y-3">
          <p>
            {isEn
              ? 'No heritage locations match your current filters.'
              : 'Không tìm thấy địa điểm di sản nào khớp với bộ lọc hiện tại.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedRegion('all');
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-1.5 rounded-lg bg-[#8B0000] text-white font-mono text-xs font-bold hover:bg-[#700000] cursor-pointer"
          >
            {isEn ? 'Reset Filters' : 'Đặt Lại Bộ Lọc'}
          </button>
        </div>
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map(location => {
            // Google Maps authentic keyword query: location name + address + region
            const mapsKeyword = `${location.nameVi} ${location.address} ${location.region}`;
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              mapsKeyword
            )}`;

            return (
              <article
                key={location.id}
                className="bg-white rounded-2xl border border-[#D4AF37]/35 hover:border-[#D4AF37] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-3">
                  {/* Badges: Region NEXT TO Category */}
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    {/* Region Badge */}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#8B0000]/10 text-[#8B0000] border border-[#8B0000]/25">
                      📍 {location.region}
                    </span>

                    {/* Category Badge */}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#D4AF37]/15 text-stone-800 border border-[#D4AF37]/40">
                      {location.categoryVi}
                    </span>
                  </div>

                  {/* Location Name */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#222222] group-hover:text-[#8B0000] transition-colors leading-snug">
                    {location.nameVi}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed line-clamp-3">
                    {location.featuresVi}
                  </p>

                  {/* Metadata List */}
                  <div className="pt-2 border-t border-stone-100 space-y-2 text-xs font-sans">
                    {/* Address */}
                    <div className="flex items-start space-x-2 text-stone-700">
                      <MapPin className="w-3.5 h-3.5 text-[#8B0000] shrink-0 mt-0.5" />
                      <span className="break-words">{location.address}</span>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start space-x-2 text-stone-600">
                      <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                      <span className="font-mono text-[11px]">{location.hours}</span>
                    </div>

                    {/* Price / Notes */}
                    {location.priceVi && (
                      <div className="flex items-start space-x-2 p-2 rounded-lg bg-[#FAF7F2] border border-[#D4AF37]/25 text-[#8B0000]">
                        <Ticket className="w-3.5 h-3.5 text-[#8B0000] shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight font-medium">{location.priceVi}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Link: Google Maps with authentic parameters */}
                <div className="pt-3 border-t border-stone-100">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#8B0000] text-stone-800 hover:text-white border border-[#D4AF37]/40 text-xs font-mono font-bold transition-all shadow-2xs group-hover:border-[#8B0000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
                  >
                    <span>{isEn ? 'Open on Google Maps' : 'Chỉ đường trên Google Maps'}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Bottom Footer Actions & Disclaimer */}
      <div className="pt-6 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Dynamic Button to view all on Google Maps for current region */}
        <a
          href={allGoogleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#8B0000] hover:bg-[#700000] text-white font-mono text-xs sm:text-sm font-bold transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] cursor-pointer"
        >
          <span>
            {isEn
              ? `View all in ${regionSearchTarget} on Google Maps`
              : `Xem tất cả ${selectedRegion === 'all' ? 'tại Việt Nam' : 'ở ' + selectedRegion} trên Google Maps`}
          </span>
          <ExternalLink className="w-4 h-4 shrink-0" />
        </a>

        {/* Retained Bottom Disclaimer */}
        <p className="text-xs text-stone-500 font-sans text-center sm:text-right italic">
          {isEn
            ? 'Opening hours and ticket prices may change, please verify before visiting.'
            : 'Giờ mở cửa và giá vé có thể thay đổi, vui lòng kiểm tra lại trước khi đến.'}
        </p>
      </div>
    </section>
  );
};

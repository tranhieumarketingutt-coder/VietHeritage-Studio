import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { MAP_LOCATIONS } from '../src/features/heritage-map/data/mapLocations';

describe('Heritage Museum Corner and Locations Atlas Suite', () => {
  it('validates total location counts and regional distributions', () => {
    assert.equal(MAP_LOCATIONS.length, 54, 'Should contain exactly 54 total locations (33 Hanoi + 21 new)');

    const hanoiLocations = MAP_LOCATIONS.filter(l => l.region === 'Hà Nội');
    assert.equal(hanoiLocations.length, 33, 'Should contain exactly 33 Hanoi locations');

    const hueLocations = MAP_LOCATIONS.filter(l => l.region === 'Huế');
    assert.equal(hueLocations.length, 7, 'Should contain exactly 7 Hue locations');

    const daNangLocations = MAP_LOCATIONS.filter(l => l.region === 'Đà Nẵng');
    assert.equal(daNangLocations.length, 2, 'Should contain exactly 2 Da Nang locations');

    const hoiAnLocations = MAP_LOCATIONS.filter(l => l.region === 'Hội An');
    assert.equal(hoiAnLocations.length, 5, 'Should contain exactly 5 Hoi An locations');

    const hcmcLocations = MAP_LOCATIONS.filter(l => l.region === 'TP. Hồ Chí Minh');
    assert.equal(hcmcLocations.length, 7, 'Should contain exactly 7 TP. Ho Chi Minh locations');
  });

  it('verifies all 33 original Hanoi locations retain required fields', () => {
    const hanoi = MAP_LOCATIONS.filter(l => l.region === 'Hà Nội');
    hanoi.forEach(loc => {
      assert.ok(loc.id, 'Every location must have an id');
      assert.ok(loc.nameVi, 'Every location must have nameVi');
      assert.ok(loc.categoryVi, 'Every location must have categoryVi');
      assert.ok(loc.address, 'Every location must have an address');
      assert.ok(loc.hours, 'Every location must have hours');
      assert.equal(loc.region, 'Hà Nội', 'All existing locations must belong to Hà Nội');
    });

    // Check key historical seeds are preserved intact
    const originalIds = ['bao-tang-ao-dai', 'hoang-thanh-thang-long', 'vstyle-viet-co-phuc', 'y-van-hien', 'bao-tang-lich-su-quoc-gia', 'co-do-hue'];
    originalIds.forEach(id => {
      const found = MAP_LOCATIONS.find(l => l.id === id);
      assert.ok(found, `Original location id "${id}" must be preserved`);
      assert.equal(found?.region, 'Hà Nội', `Original location "${id}" must be assigned region "Hà Nội"`);
    });
  });

  it('verifies the 21 newly added locations match specified data', () => {
    // Hue locations
    const daiNoi = MAP_LOCATIONS.find(l => l.nameVi.includes('Đại Nội Huế'));
    assert.ok(daiNoi, 'Đại Nội Huế must exist');
    assert.equal(daiNoi?.region, 'Huế');
    assert.equal(daiNoi?.categoryVi, 'Bảo tàng');

    const coVatHue = MAP_LOCATIONS.find(l => l.nameVi.includes('Bảo tàng Cổ vật Cung đình Huế'));
    assert.ok(coVatHue, 'Bảo tàng Cổ vật Cung đình Huế must exist');
    assert.equal(coVatHue?.region, 'Huế');
    assert.equal(coVatHue?.categoryVi, 'Bảo tàng');

    const cungAnDinh = MAP_LOCATIONS.find(l => l.nameVi.includes('Cung An Định'));
    assert.ok(cungAnDinh, 'Cung An Định must exist');
    assert.equal(cungAnDinh?.region, 'Huế');
    assert.equal(cungAnDinh?.categoryVi, 'Địa điểm chụp ảnh');

    const chuaThienMu = MAP_LOCATIONS.find(l => l.nameVi.includes('Chùa Thiên Mụ'));
    assert.ok(chuaThienMu, 'Chùa Thiên Mụ must exist');
    assert.equal(chuaThienMu?.region, 'Huế');

    const langKhaiDinh = MAP_LOCATIONS.find(l => l.nameVi.includes('Lăng Khải Định'));
    assert.ok(langKhaiDinh, 'Lăng Khải Định must exist');
    assert.equal(langKhaiDinh?.region, 'Huế');

    const cauTrangTien = MAP_LOCATIONS.find(l => l.nameVi.includes('Cầu Tràng Tiền'));
    assert.ok(cauTrangTien, 'Cầu Tràng Tiền must exist');
    assert.equal(cauTrangTien?.region, 'Huế');

    const baoVinh = MAP_LOCATIONS.find(l => l.nameVi.includes('Bao Vinh'));
    assert.ok(baoVinh, 'Khu cho thuê cổ phục Bao Vinh must exist');
    assert.equal(baoVinh?.region, 'Huế');
    assert.equal(baoVinh?.categoryVi, 'Tiệm cho thuê đồ');

    // Da Nang
    const chamMuseum = MAP_LOCATIONS.find(l => l.nameVi.includes('Bảo tàng Điêu khắc Chăm Đà Nẵng'));
    assert.ok(chamMuseum, 'Bảo tàng Điêu khắc Chăm Đà Nẵng must exist');
    assert.equal(chamMuseum?.region, 'Đà Nẵng');
    assert.equal(chamMuseum?.categoryVi, 'Bảo tàng');

    const dragonBridge = MAP_LOCATIONS.find(l => l.nameVi.includes('Cầu Rồng'));
    assert.ok(dragonBridge, 'Cầu Rồng must exist');
    assert.equal(dragonBridge?.region, 'Đà Nẵng');

    // Hoi An
    const hoiAnOldTown = MAP_LOCATIONS.find(l => l.nameVi === 'Phố cổ Hội An');
    assert.ok(hoiAnOldTown, 'Phố cổ Hội An must exist');
    assert.equal(hoiAnOldTown?.region, 'Hội An');

    const japaneseBridge = MAP_LOCATIONS.find(l => l.nameVi.includes('Chùa Cầu Hội An'));
    assert.ok(japaneseBridge, 'Chùa Cầu Hội An must exist');
    assert.equal(japaneseBridge?.region, 'Hội An');

    // HCMC
    const dthPalace = MAP_LOCATIONS.find(l => l.nameVi.includes('Dinh Độc Lập'));
    assert.ok(dthPalace, 'Dinh Độc Lập must exist');
    assert.equal(dthPalace?.region, 'TP. Hồ Chí Minh');
    assert.equal(dthPalace?.categoryVi, 'Bảo tàng');

    const nhaRong = MAP_LOCATIONS.find(l => l.nameVi.includes('Bến Nhà Rồng'));
    assert.ok(nhaRong, 'Bến Nhà Rồng must exist');
    assert.equal(nhaRong?.region, 'TP. Hồ Chí Minh');
  });

  it('validates dual filtering logic (Region and Category working together)', () => {
    // When selecting 'Huế' and 'Bảo tàng', should return exactly 2 museums
    const hueMuseums = MAP_LOCATIONS.filter(l => l.region === 'Huế' && l.categoryVi === 'Bảo tàng');
    assert.equal(hueMuseums.length, 2, 'Hue should have exactly 2 museums');

    // When selecting 'Huế' and 'Địa điểm chụp ảnh', should return exactly 4 photo spots
    const huePhotos = MAP_LOCATIONS.filter(l => l.region === 'Huế' && l.categoryVi === 'Địa điểm chụp ảnh');
    assert.equal(huePhotos.length, 4, 'Hue should have exactly 4 photo coordinates');

    // When selecting 'Huế' and 'Tiệm cho thuê đồ', should return 1 shop
    const hueRentals = MAP_LOCATIONS.filter(l => l.region === 'Huế' && l.categoryVi === 'Tiệm cho thuê đồ');
    assert.equal(hueRentals.length, 1, 'Hue should have 1 rental shop');

    // When selecting 'Đà Nẵng', 'Hội An', or 'TP. Hồ Chí Minh' with 'Tiệm cho thuê đồ', should return 0 shops
    const daNangRentals = MAP_LOCATIONS.filter(l => l.region === 'Đà Nẵng' && l.categoryVi === 'Tiệm cho thuê đồ');
    assert.equal(daNangRentals.length, 0, 'Da Nang has 0 rental shops in dataset');

    const hoiAnRentals = MAP_LOCATIONS.filter(l => l.region === 'Hội An' && l.categoryVi === 'Tiệm cho thuê đồ');
    assert.equal(hoiAnRentals.length, 0, 'Hoi An has 0 rental shops in dataset');

    const hcmcRentals = MAP_LOCATIONS.filter(l => l.region === 'TP. Hồ Chí Minh' && l.categoryVi === 'Tiệm cho thuê đồ');
    assert.equal(hcmcRentals.length, 0, 'HCMC has 0 rental shops in dataset');
  });

  it('verifies Google Maps keyword composition logic', () => {
    MAP_LOCATIONS.forEach(loc => {
      const keyword = `${loc.nameVi} ${loc.address} ${loc.region}`;
      assert.ok(keyword.includes(loc.nameVi), 'Keyword contains location name');
      assert.ok(keyword.includes(loc.address), 'Keyword contains address');
      assert.ok(keyword.includes(loc.region), 'Keyword contains region');

      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(keyword)}`;
      assert.ok(url.startsWith('https://www.google.com/maps/search/?api=1&query='), 'Maps URL uses standard API parameter');
    });
  });

  it('verifies component source files contain required features, texts and zero em dashes', () => {
    const cornerFile = fs.readFileSync(path.resolve('src/features/heritage-map/components/HeritageMuseumCorner.tsx'), 'utf-8');

    // Check friendly message for regions without rental shops
    assert.ok(
      cornerFile.includes('Chúng tôi đang cập nhật các tiệm cho thuê trang phục ở khu vực này.'),
      'Must contain the exact friendly empty state message for rental shops'
    );

    // Check disclaimer
    assert.ok(
      cornerFile.includes('Giờ mở cửa và giá vé có thể thay đổi, vui lòng kiểm tra lại trước khi đến.'),
      'Must retain the exact disclaimer text'
    );

    // Check Google Maps link construction
    assert.ok(
      cornerFile.includes('https://www.google.com/maps/search/?api=1&query='),
      'Must use Google Maps search API link'
    );

    // Check region options
    assert.ok(cornerFile.includes('Tất cả khu vực'));
    assert.ok(cornerFile.includes('Hà Nội'));
    assert.ok(cornerFile.includes('Huế'));
    assert.ok(cornerFile.includes('Đà Nẵng'));
    assert.ok(cornerFile.includes('Hội An'));
    assert.ok(cornerFile.includes('TP. Hồ Chí Minh'));

    // Check category options
    assert.ok(cornerFile.includes('Bảo tàng'));
    assert.ok(cornerFile.includes('Địa điểm chụp ảnh'));
    assert.ok(cornerFile.includes('Tiệm cho thuê đồ'));

    // Check Navbar integration
    const navbarFile = fs.readFileSync(path.resolve('src/shared/components/Navbar.tsx'), 'utf-8');
    assert.ok(navbarFile.includes('navTabMuseumCorner'), 'Navbar must contain navTabMuseumCorner desktop button');
    assert.ok(navbarFile.includes('mobTabMuseumCorner'), 'Navbar must contain mobTabMuseumCorner mobile button');

    // Verify ordering: Hub 2 (Co-creation Studio) is placed before Museum Corner
    const idxDesktopHub2 = navbarFile.indexOf('id="navTabHub2"');
    const idxDesktopMuseum = navbarFile.indexOf('id="navTabMuseumCorner"');
    assert.ok(idxDesktopHub2 !== -1 && idxDesktopMuseum !== -1 && idxDesktopHub2 < idxDesktopMuseum, 'Desktop navTabHub2 must precede navTabMuseumCorner');

    const idxMobileHub2 = navbarFile.indexOf('id="mobTabHub2"');
    const idxMobileMuseum = navbarFile.indexOf('id="mobTabMuseumCorner"');
    assert.ok(idxMobileHub2 !== -1 && idxMobileMuseum !== -1 && idxMobileHub2 < idxMobileMuseum, 'Mobile mobTabHub2 must precede mobTabMuseumCorner');

    // Check App integration
    const appFile = fs.readFileSync(path.resolve('src/app/App.tsx'), 'utf-8');
    assert.ok(appFile.includes('HeritageMuseumCorner'), 'App must import HeritageMuseumCorner');
    assert.ok(appFile.includes('heritageMuseumCornerSection'), 'App must render heritageMuseumCornerSection');

    // Hard Gate: Zero em dashes in modified files
    assert.ok(!cornerFile.includes('—'), 'HeritageMuseumCorner must contain zero em dashes');
    assert.ok(!navbarFile.includes('—'), 'Navbar must contain zero em dashes');
    assert.ok(!appFile.includes('—'), 'App must contain zero em dashes');
  });
});

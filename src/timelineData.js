// timelineData.js - Curated Historical Silhouette Evolution Data Across Dynasties

export const DYNASTIES_TIMELINE_DATA = [
  {
    id: 'ly',
    dynastyVi: 'Thời Lý',
    dynastyEn: 'Ly Dynasty',
    period: '1009 – 1225',
    centuryVi: 'Thế kỷ XI – XIII',
    centuryEn: '11th – 13th Century',
    taglineVi: 'Thời kỳ Phục Hưng Đại Việt & Tinh Thần Phật Giáo Thoát Tục',
    taglineEn: 'Dai Viet Renaissance & Serene Buddhist Spirituality',
    signatureCostumeVi: 'Áo Giao Lĩnh Vạt Ngắn Phối Thường (Váy Quây)',
    signatureCostumeEn: 'Short Cross-Collar Blouse with Pleated Skirt (Thuong)',
    silhouetteTypeVi: 'Dáng Chữ X Bay Bổng (Ethereal X-Silhouette)',
    silhouetteTypeEn: 'Ethereal Flowing X-Silhouette',
    features: {
      collarVi: 'Cổ vắt chéo (Giao Lĩnh) tuân thủ quy tắc Hữu Nhậm, để lộ cổ trắng ngà thanh tao.',
      collarEn: 'Y-cross collar (Giao Linh) strictly overlapping left-over-right, exposing an elegant neck.',
      sleevesVi: 'Tay áo rộng trung bình, buông rủ mềm mại theo từng cử động uyển chuyển.',
      sleevesEn: 'Medium-wide draped sleeves flowing naturally with poised, graceful movements.',
      hemlineVi: 'Vạt áo ngắn ngang hông, kết hợp cùng váy thường quây bồng bềnh nhiều nếp gấp dài chấm gót.',
      hemlineEn: 'Hip-length jacket paired with a floor-length voluminous pleated wrap-around skirt.',
      hairAccessoryVi: 'Tóc búi ốc đỉnh đầu hoặc buông xõa tự nhiên, cài trâm bạc hoa sen thanh khiết.',
      hairAccessoryEn: 'High spiral topknot or loose natural tresses adorned with lotus silver hairpins.'
    },
    philosophyVi: 'Phản ánh tư tưởng Phật giáo thời Lý: coi trọng sự thanh tịnh, tự tại, hòa hợp với thiên nhiên. Con người Đại Việt khẳng định nền độc lập tự chủ rực rỡ sau ngàn năm Bắc thuộc.',
    philosophyEn: 'Reflects Ly Dynasty Buddhist ethos: serene transcendence and harmony with nature, celebrating sovereign independence after a millennium of Northern rule.',
    archeologySourceVi: 'Căn cứ theo tượng A Di Đà chùa Phật Tích (1057) và các tượng nữ thần Champa-Việt thời Lý.',
    archeologySourceEn: 'Evidenced by Phat Tich Pagoda Amitabha reliefs (1057) and Ly-era stone sculptures.',
    accentColor: '#D4AF37',
    primaryCostumeId: 'giao-linh',
    svgSilhouette: `
      <svg viewBox="0 0 160 260" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Head & Topknot -->
        <circle cx="80" cy="30" r="14" fill="#EAD7C0" stroke="#8B0000" stroke-width="1.5"/>
        <path d="M72 18 C72 12, 88 12, 88 18 C88 24, 72 24, 72 18 Z" fill="#222222"/>
        <!-- Lotus Hairpin -->
        <path d="M80 13 L80 8 M76 10 L84 10" stroke="#D4AF37" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Neck & Collar Giao Linh -->
        <path d="M75 44 L75 52 M85 44 L85 52" stroke="#EAD7C0" stroke-width="2"/>
        <path d="M68 52 L80 68 L92 52" stroke="#D4AF37" stroke-width="2" fill="#FAF5E8"/>
        <path d="M68 52 L83 72 L77 75" fill="#C49A45" opacity="0.3"/>
        <!-- Bodice / Short Jacket (X-shape) -->
        <path d="M60 56 L35 88 L46 94 L64 74 L62 108 L98 108 L96 74 L114 94 L125 88 L100 56 Z" fill="#991B1B" stroke="#7F1D1D" stroke-width="1.5"/>
        <!-- Crossed Lapels Overlap Left over Right -->
        <path d="M68 54 L94 88" stroke="#D4AF37" stroke-width="2" stroke-linecap="round"/>
        <path d="M92 54 L76 74" stroke="#FAF5E8" stroke-width="1.5" stroke-dasharray="2 2"/>
        <!-- Silk Sash Ribbon -->
        <path d="M60 108 L100 108 L96 114 L64 114 Z" fill="#D4AF37"/>
        <path d="M76 114 C73 130, 68 150, 64 175" stroke="#D4AF37" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M84 114 C87 130, 92 150, 96 175" stroke="#D4AF37" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Flowing Pleated Skirt (Thuong) -->
        <path d="M64 114 L30 235 C55 242, 105 242, 130 235 L96 114 Z" fill="#FAF7F2" stroke="#8B0000" stroke-width="1.5"/>
        <!-- Skirt Pleat Lines -->
        <path d="M50 135 L44 235 M64 125 L60 238 M80 120 L80 239 M96 125 L100 238 M110 135 L116 235" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 3" opacity="0.7"/>
        <!-- Hemline Lotus Border -->
        <path d="M30 235 C55 245, 105 245, 130 235" stroke="#991B1B" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'tran',
    dynastyVi: 'Thời Trần',
    dynastyEn: 'Tran Dynasty',
    period: '1225 – 1400',
    centuryVi: 'Thế kỷ XIII – XIV',
    centuryEn: '13th – 14th Century',
    taglineVi: 'Hào Khí Đông A & Tinh Thần Thượng Võ Quật Cường',
    taglineEn: 'Dong A Valour & Resolute Martial Spirit',
    signatureCostumeVi: 'Áo Viên Lĩnh (Cổ Tròn) & Giao Lĩnh Gọn Gàng',
    signatureCostumeEn: 'Round-Collar Robe (Vien Linh) with Martial Cut',
    silhouetteTypeVi: 'Dáng Chữ H Rắn Rỏi (Structured H-Silhouette)',
    silhouetteTypeEn: 'Robust Structured H-Silhouette',
    features: {
      collarVi: 'Xuất hiện thêm cổ tròn (Viên Lĩnh) gài khuy bên vai phải, hoặc Giao Lĩnh may vạt ngắn.',
      collarEn: 'Introduction of round collars (Vien Linh) buttoned at the right shoulder alongside cross-collars.',
      sleevesVi: 'Ống tay thu gọn hơn, ống tay chẽn hoặc lửng thuận tiện cưỡi ngựa, bắn cung, luyện võ.',
      sleevesEn: 'Narrower, athletic sleeves optimized for equestrian archery and martial mobility.',
      hemlineVi: 'Tà áo thẳng suông chạm gối, thắt lưng đai da hoặc vải bố bản lớn ghì chặt bụng.',
      hemlineEn: 'Straight knee-length hem cinched firmly with wide leather or coarse woven belts.',
      hairAccessoryVi: 'Cắt tóc ngắn hoặc búi gọn sau gáy, chân trần hoặc đi hia da mộc mạc, xăm hình rồng đùi.',
      hairAccessoryEn: 'Closely cropped hair or sleek nape buns; bare feet or raw leather boots; leg tattoos.'
    },
    philosophyVi: 'Biểu hiện cho "Hào Khí Đông A" qua 3 lần chiến thắng giặc Nguyên Mông: thực tế, giản dị, không câu nệ hoa mỹ, sẵn sàng xông pha trận mạc vì sự tồn vong non sông.',
    philosophyEn: 'Embodies the tripartite victory over Mongol invaders: austere, practical, devoid of excess, ever combat-ready for national survival.',
    archeologySourceVi: 'Tượng quan võ thời Trần tại tháp Phổ Minh (Nam Định) và lăng mộ Trần Hiến Tông.',
    archeologySourceEn: 'Pho Minh Pagoda warrior sculptures and Tran Hien Tong mausoleum reliefs.',
    accentColor: '#1E3A8A',
    primaryCostumeId: 'giao-linh',
    svgSilhouette: `
      <svg viewBox="0 0 160 260" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Head with Martial Headband -->
        <circle cx="80" cy="30" r="14" fill="#EAD7C0" stroke="#1E3A8A" stroke-width="1.5"/>
        <path d="M68 28 L92 28 L92 34 L68 34 Z" fill="#1E3A8A"/>
        <path d="M92 32 C98 34, 102 40, 104 46" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round"/>
        <!-- Round Collar Vien Linh -->
        <path d="M72 44 C72 52, 88 52, 88 44" fill="#FAF5E8" stroke="#D4AF37" stroke-width="2"/>
        <circle cx="88" cy="46" r="2" fill="#D4AF37"/>
        <!-- Robust Torso (H-silhouette) -->
        <path d="M56 50 L32 78 L42 84 L58 68 L56 120 L104 120 L102 68 L118 84 L128 78 L104 50 Z" fill="#1B3B6F" stroke="#0F2042" stroke-width="1.5"/>
        <!-- Wide Martial Belt with Metal Buckle -->
        <rect x="54" y="112" width="52" height="12" rx="2" fill="#78350F" stroke="#D4AF37" stroke-width="1.5"/>
        <rect x="76" y="114" width="8" height="8" rx="1" fill="#D4AF37"/>
        <!-- Straight Knee-length Coat Flaps -->
        <path d="M56 124 L48 205 C70 208, 90 208, 112 205 L104 124 Z" fill="#1E3A8A" stroke="#0F2042" stroke-width="1.5"/>
        <!-- Center seam / overlap -->
        <path d="M80 124 L80 206" stroke="#D4AF37" stroke-width="1.5"/>
        <!-- Trousers underneath -->
        <path d="M58 205 L54 240 L74 240 L76 206" fill="#F5EFE0" stroke="#78350F" stroke-width="1"/>
        <path d="M84 206 L86 240 L106 240 L102 205" fill="#F5EFE0" stroke="#78350F" stroke-width="1"/>
      </svg>
    `
  },
  {
    id: 'le',
    dynastyVi: 'Thời Hậu Lê',
    dynastyEn: 'Later Le Dynasty',
    period: '1428 – 1789',
    centuryVi: 'Thế kỷ XV – XVIII',
    centuryEn: '15th – 18th Century',
    taglineVi: 'Đỉnh Cao Pháp Điển Hóa & Trang Nghiêm Lễ Nhạc',
    taglineEn: 'Codified Legal Majesty & Rites of Civility',
    signatureCostumeVi: 'Áo Tràng Vạt (Giao Lĩnh Dài) & Bổ Phục',
    signatureCostumeEn: 'Long Flowing Cross-Collar Robe (Trang Vat)',
    silhouetteTypeVi: 'Dáng Chữ A Bề Thế (Grand A-Silhouette)',
    silhouetteTypeEn: 'Majestic Monumental A-Silhouette',
    features: {
      collarVi: 'Cổ Giao Lĩnh bản to, vạt trước phủ sâu trang nghiêm sang bên nách phải.',
      collarEn: 'Broad cross-collar lapels wrapping deeply and ceremoniously toward the right.',
      sleevesVi: 'Ống tay thụng rất rộng và dài, khi chắp tay tạo thành nếp rủ chữ nhật uy nghi.',
      sleevesEn: 'Substantial flowing box sleeves draping into monumental rectangular folds.',
      hemlineVi: 'Tà áo dài chấm gót chân (Tràng Vạt), phom áo chữ A rộng xòe bề thế.',
      hemlineEn: 'Floor-sweeping sweeping hem (Trang Vat), spreading outward into a grand A-frame.',
      hairAccessoryVi: 'Mũ Phác Đầu (quan lại), búi tóc lưới bao (nam giới), khăn vấn hoa gấm (nữ giới).',
      hairAccessoryEn: 'Futou winged caps for officials; woven hair nets; damask headwraps for ladies.'
    },
    philosophyVi: 'Thời kỳ Nho giáo cực thịnh. Trang phục được thể chế hóa trong bộ luật Hồng Đức, quy định phân minh trật tự xã hội từ hoàng gia, phẩm cấp quan viên đến thứ dân.',
    philosophyEn: 'The golden age of Confucian legality. Attire was rigorously codified under the Hong Duc Code, defining societal order with unshakeable imperial decorum.',
    archeologySourceVi: 'Tranh chân dung Nguyễn Trãi (thế kỷ XV), tượng bà Hoàng hậu Lê Ngọc Hân và tranh khắc thời Lê-Trịnh.',
    archeologySourceEn: '15th c. portrait of Nguyen Trai, Lady Le Ngoc Han stone effigies, and Le-Trinh woodcuts.',
    accentColor: '#047857',
    primaryCostumeId: 'giao-linh',
    svgSilhouette: `
      <svg viewBox="0 0 160 260" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Head with Le-era Futou / Bonnet -->
        <circle cx="80" cy="30" r="13" fill="#EAD7C0" stroke="#047857" stroke-width="1.5"/>
        <path d="M68 20 C68 12, 92 12, 92 20 L94 28 L66 28 Z" fill="#064E3B"/>
        <!-- Wings of Futou cap -->
        <path d="M66 24 C50 20, 42 28, 36 26" stroke="#064E3B" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M94 24 C110 20, 118 28, 124 26" stroke="#064E3B" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Grand Cross Collar -->
        <path d="M66 48 L80 68 L94 48" stroke="#D4AF37" stroke-width="2.5" fill="#FAF5E8"/>
        <!-- Majestic Long Flowing Robe (A-Silhouette) -->
        <path d="M62 50 L18 88 L34 140 L58 110 L44 240 L116 240 L102 110 L126 140 L142 88 L98 50 Z" fill="#047857" stroke="#064E3B" stroke-width="1.5"/>
        <!-- Mandarin Square (Bổ Phục Badge) -->
        <rect x="68" y="76" width="24" height="24" rx="2" fill="#8B0000" stroke="#D4AF37" stroke-width="1.5"/>
        <circle cx="80" cy="88" r="7" stroke="#D4AF37" stroke-width="1" stroke-dasharray="2 2"/>
        <path d="M78 86 L82 86 L80 90 Z" fill="#D4AF37"/>
        <!-- Broad Sleeves Flowing Drapes -->
        <path d="M34 140 C44 135, 52 125, 58 110" stroke="#D4AF37" stroke-width="1.5"/>
        <path d="M126 140 C116 135, 108 125, 102 110" stroke="#D4AF37" stroke-width="1.5"/>
        <!-- Flowing Center Hem -->
        <path d="M74 110 L68 240 M86 110 L92 240" stroke="#064E3B" stroke-width="1" stroke-dasharray="4 2"/>
      </svg>
    `
  },
  {
    id: 'nguyen',
    dynastyVi: 'Thời Triều Nguyễn',
    dynastyEn: 'Nguyen Dynasty',
    period: '1802 – 1945',
    centuryVi: 'Thế kỷ XIX – XX',
    centuryEn: '19th – 20th Century',
    taglineVi: 'Định Hình Quốc Phục Ngũ Thân & Phẩm Phục Cung Đình',
    taglineEn: 'Codification of Ngu Than National Robe & Royal Splendor',
    signatureCostumeVi: 'Áo Ngũ Thân (Tay Chẽn / Áo Tấc) & Nhật Bình',
    signatureCostumeEn: 'Five-Panel Robe (Ngu Than) & Imperial Nhat Binh',
    silhouetteTypeVi: 'Dáng Lập Lĩnh Thẳng Đứng (Noble Columnar Silhouette)',
    silhouetteTypeEn: 'Noble Columnar Silhouette with Wing-smile Hem',
    features: {
      collarVi: 'Cổ đứng Lập Lĩnh cao kín đáo, cài đúng 5 chiếc nút nữu tượng trưng Ngũ Thường.',
      collarEn: 'High standing Mandarin collar (Lap Linh) fastened with five buttons symbolizing Five Virtues.',
      sleevesVi: 'Phân hóa rõ rệt: Áo Tay Chẽn ôm sát cổ tay để lao động, Áo Tấc tay thụng rộng 30-40cm để đại lễ.',
      sleevesEn: 'Clear differentiation: Fitted sleeves (Tay Chen) for daily wear, Broad box sleeves (Ao Tac) for rites.',
      hemlineVi: 'Ghép từ 5 thân vải (Tứ thân phụ mẫu + Thân con), vạt uốn lượn cánh cung miệng cười.',
      hemlineEn: 'Crafted from five panels with the iconic upward smiling curved hemline (Ta Canh Cung).',
      hairAccessoryVi: 'Khăn vấn nếp chữ "Nhân" (người nam quấn 7 hoặc 9 nếp), kiềng bạc trơn hoặc khánh ngọc cung đình.',
      hairAccessoryEn: 'Folded turban forming the character "Nhan" (Humanity); solid silver torcs and jade pendants.'
    },
    philosophyVi: 'Nho giáo dung hòa cùng văn hóa phương Nam: khiêm nhường, kín đáo, coi trọng đạo hiếu gia đình và phép tắc tôn ti. Phom dáng ngũ thân trở thành quốc phục chính thức của người Việt.',
    philosophyEn: 'Synthesizes Confucian morals with Southern Vietnamese sensibility: modesty, filial devotion, and structured grace. Cemented the iconic five-panel robe as Vietnam\'s national garment.',
    archeologySourceVi: 'Khâm Định Đại Nam Hội Điển Sự Lệ, ảnh chụp tư liệu người Việt mặc áo ngũ thân năm 1904 trên Wikimedia Commons.',
    archeologySourceEn: 'Dai Nam Imperial Records, 1904 historic photographs on Wikimedia Commons archives.',
    accentColor: '#8B0000',
    primaryCostumeId: 'ngu-than',
    svgSilhouette: `
      <svg viewBox="0 0 160 260" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Head with Khan Dong (Folded Turban) -->
        <circle cx="80" cy="30" r="13" fill="#EAD7C0" stroke="#8B0000" stroke-width="1.5"/>
        <path d="M67 22 C67 14, 93 14, 93 22 L94 30 L66 30 Z" fill="#1C1917"/>
        <!-- Folded "Nhan" (人) Crease on Forehead -->
        <path d="M76 26 L80 22 L84 26" stroke="#D4AF37" stroke-width="1.5" stroke-linecap="round"/>
        <!-- High Lap Linh Standing Collar -->
        <rect x="74" y="44" width="12" height="9" rx="1.5" fill="#FAF5E8" stroke="#D4AF37" stroke-width="1.5"/>
        <circle cx="80" cy="46" r="1.5" fill="#D4AF37"/>
        <!-- Five-Panel Robe (Columnar & Flowing Hem) -->
        <path d="M66 52 L36 84 L46 90 L64 74 L60 226 C72 232, 88 232, 100 226 L96 74 L114 90 L124 84 L94 52 Z" fill="#8B0000" stroke="#700000" stroke-width="1.5"/>
        <!-- Curved Hem "Smiling Lip" (Ta Canh Cung) -->
        <path d="M60 226 C72 234, 88 234, 100 226" stroke="#D4AF37" stroke-width="2" stroke-linecap="round"/>
        <!-- 5 Fastening Buttons (Ngu Thuong) -->
        <circle cx="80" cy="56" r="2" fill="#D4AF37"/>
        <circle cx="84" cy="66" r="2" fill="#D4AF37"/>
        <circle cx="88" cy="78" r="2" fill="#D4AF37"/>
        <circle cx="91" cy="94" r="2" fill="#D4AF37"/>
        <circle cx="93" cy="112" r="2" fill="#D4AF37"/>
        <!-- Diagonal Flap Curved Slant -->
        <path d="M80 56 C86 64, 90 76, 92 94 L94 120" stroke="#D4AF37" stroke-width="1.5"/>
        <!-- White Silk Trousers Beneath -->
        <path d="M64 228 L62 248 L76 248 L78 230" fill="#FAF7F2" stroke="#D4AF37" stroke-width="1"/>
        <path d="M82 230 L84 248 L98 248 L96 228" fill="#FAF7F2" stroke="#D4AF37" stroke-width="1"/>
      </svg>
    `
  },
  {
    id: 'hien-dai',
    dynastyVi: 'Giao Thời & Hiện Đại',
    dynastyEn: 'Transitional & Modern Era',
    period: '1930 – Hiện tại',
    centuryVi: 'Thế kỷ XX – XXI',
    centuryEn: '20th – 21st Century',
    taglineVi: 'Cách Tân Le Mur, Áo Dài Hiện Đại & Phong Trào Phục Hưng Gen Z',
    taglineEn: 'Le Mur Innovation, Modern Ao Dai & Gen Z Heritage Revival',
    signatureCostumeVi: 'Áo Dài Cách Tân & Việt Phục Dạo Phố Gen Z',
    signatureCostumeEn: 'Modern Tailored Ao Dai & Gen Z Street Heritage',
    silhouetteTypeVi: 'Dáng Đồng Hồ Cát Thanh Thoát (Sleek Curvilinear Silhouette)',
    silhouetteTypeEn: 'Sleek Curvilinear Silhouette',
    features: {
      collarVi: 'Đa dạng từ cổ lập lĩnh cách tân thấp, cổ thuyền, cổ tròn, đến cổ tim thoáng mát.',
      collarEn: 'Diverse collar variations: low Mandarin, boat neck, jewel neck, or sweetheart neckline.',
      sleevesVi: 'Tay raglan xẻ chéo nách giúp vai áo phẳng phiu, không nhăn nhúm khi cử động.',
      sleevesEn: 'Raglan sleeve diagonal seam eliminating excess shoulder bunching for seamless drape.',
      hemlineVi: 'Tà áo chỉ còn 2 tà trước sau, chít eo tôn dáng hình thể, dài quét gót phối cùng quần lụa suông.',
      hemlineEn: 'Reduced to two fitted panels with waist darts, paired with fluid high-waisted silk trousers.',
      hairAccessoryVi: 'Kết hợp linh hoạt giữa mấn đội hiện đại, nón lá, kẹp tóc ngọc trai, giày sneaker dạo phố.',
      hairAccessoryEn: 'Versatile hybrid styling: modern padded man headbands, conical hats, pearls, sneakers.'
    },
    philosophyVi: 'Sự giao thoa văn hóa Đông - Tây: tôn vinh vẻ đẹp hình thể hiện đại nhưng vẫn giữ gìn hồn cốt dân tộc. Thế hệ Gen Z tái sinh Việt phục thành trang phục đường phố, kỷ yếu và ngoại giao.',
    philosophyEn: 'East-West synthesis celebrating feminine body contours while honoring ancestral spirit. Gen Z revives traditional garments as expressive street-style and cultural diplomacy.',
    archeologySourceVi: 'Các bản thiết kế Áo Dài Le Mur (1934), Lê Phổ (1935) và các bộ sưu tập Việt phục Gen Z đương đại.',
    archeologySourceEn: 'Hanoi Fine Arts Le Mur (1934) sketches, Le Pho archives, and contemporary Gen Z couture.',
    accentColor: '#9333EA',
    primaryCostumeId: 'ao-dai',
    svgSilhouette: `
      <svg viewBox="0 0 160 260" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Head & Modern Sleek Hair -->
        <circle cx="80" cy="30" r="13" fill="#EAD7C0" stroke="#9333EA" stroke-width="1.5"/>
        <path d="M67 22 C67 14, 93 14, 93 22 L92 30 L68 30 Z" fill="#1C1917"/>
        <!-- Modern Padded Man Headband -->
        <path d="M68 22 C72 16, 88 16, 92 22" stroke="#9333EA" stroke-width="3" stroke-linecap="round"/>
        <!-- Slender Neck & Low Mandarin Collar -->
        <rect x="75" y="44" width="10" height="7" rx="1" fill="#FAF5E8" stroke="#D4AF37" stroke-width="1.5"/>
        <!-- Hourglass Curvilinear Bodice with Raglan Sleeves -->
        <path d="M68 50 L38 80 L46 86 L66 68 L68 96 C68 114, 72 120, 68 126 L52 230 C70 234, 90 234, 108 230 L92 126 C88 120, 92 114, 92 96 L94 68 L114 86 L122 80 L92 50 Z" fill="#9333EA" stroke="#6B21A8" stroke-width="1.5"/>
        <!-- Waist Cinched Dart Lines -->
        <path d="M72 100 C73 112, 73 120, 71 126" stroke="#D4AF37" stroke-width="1" opacity="0.6"/>
        <path d="M88 100 C87 112, 87 120, 89 126" stroke="#D4AF37" stroke-width="1" opacity="0.6"/>
        <!-- Long Slit Side Opening (Xẻ Tà Cao) -->
        <path d="M70 126 L66 230" stroke="#FAF7F2" stroke-width="1.5"/>
        <!-- Wide Silk Trousers (Quan Suong) -->
        <path d="M66 130 L56 248 L76 248 L78 150" fill="#FAF7F2" stroke="#D4AF37" stroke-width="1"/>
        <path d="M82 150 L84 248 L104 248 L94 130" fill="#FAF7F2" stroke="#D4AF37" stroke-width="1"/>
      </svg>
    `
  }
];

export interface CommunityLook {
  id: string;
  author: string;
  titleVi: string;
  titleEn: string;
  costumeId: string;
  costumeName: string;
  destination: string;
  score: number;
  likes: number;
  date: string;
  photoUrl: string;
  accentHex: string;
  tags: string[];
}

export interface WardrobeItem {
  id: string;
  [key: string]: unknown;
}

export interface UserContext {
  isLoggedIn: boolean;
  name: string;
  email: string;
}

const COMMUNITY_KEY = 'vheritage_community_v1';
const WARDROBE_KEY = 'vheritage_wardrobe_v1';
const USER_KEY = 'vheritage_current_user_v1';

const isBrowser = (): boolean => typeof window !== 'undefined';

/**
 * Utility for persisting and retrieving user data securely across SSR and client.
 */
export const storageHelper = {
  getCommunityLooks(): CommunityLook[] {
    if (!isBrowser()) return [];
    const data = localStorage.getItem(COMMUNITY_KEY);
    if (!data) {
      const initial: CommunityLook[] = [
        {
          id: 'look-seed-1',
          author: 'Trần Thục Uyên (Gen Z Huế)',
          titleVi: 'Hoàng Cung Trầm Mặc - Nhật Bình Viva Magenta',
          titleEn: 'Silent Citadel - Imperial Magenta Nhat Binh',
          costumeId: 'nhat-binh',
          costumeName: 'Áo Nhật Bình',
          destination: 'Cố đô Huế',
          score: 96,
          likes: 142,
          date: 'Hôm nay',
          photoUrl: '',
          accentHex: '#9E1B1B',
          tags: ['#HueCitadel', '#RoyalHighFashion', '#NhatBinh']
        },
        {
          id: 'look-seed-2',
          author: 'Lê Hoàng Nam (Đại học Quốc gia Hà Nội)',
          titleVi: 'Sĩ Tử Kinh Kỳ - Áo Ngũ Thân Tay Chẽn Xanh Chàm',
          titleEn: 'Capital Scholar - Indigo Narrow-Sleeve Ngu Than',
          costumeId: 'ngu-than',
          costumeName: 'Áo Ngũ Thân Tay Chẽn',
          destination: 'Hoàng Thành Thăng Long',
          score: 100,
          likes: 219,
          date: 'Hôm qua',
          photoUrl: '',
          accentHex: '#1C3144',
          tags: ['#HoangThanhThangLong', '#NguThan1744', '#CleanTailoring']
        },
        {
          id: 'look-seed-3',
          author: 'Nguyễn Mai Chi (Fashion Designer)',
          titleVi: 'Kinh Bắc Phong Vân - Giao Lĩnh Hữu Nhậm Tơ Đũi',
          titleEn: 'Kinh Bac Breezes - Cross-Collar Giao Linh',
          costumeId: 'giao-linh',
          costumeName: 'Áo Giao Lĩnh',
          destination: 'Phố cổ Hội An',
          score: 98,
          likes: 185,
          date: '3 ngày trước',
          photoUrl: '',
          accentHex: '#3F5E4D',
          tags: ['#GiaoLinh', '#HuuNham', '#HoiAnVibes']
        },
        {
          id: 'look-seed-4',
          author: 'Trần Thảo My (Gen Z Content Creator)',
          titleVi: 'Hương Sen Đất Việt - Áo Dài Lụa Trắng Hà Đông',
          titleEn: 'Lotus Bloom - Pristine White Silk Ao Dai',
          costumeId: 'ao-dai',
          costumeName: 'Áo Dài Truyền Thống',
          destination: 'Bảo tàng Áo Dài TP. Hồ Chí Minh',
          score: 100,
          likes: 342,
          date: 'Vừa xong',
          photoUrl: '',
          accentHex: '#DB2777',
          tags: ['#AoDaiVietNam', '#LuaHaDong', '#QuocPhucViet']
        }
      ];
      try {
        localStorage.setItem(COMMUNITY_KEY, JSON.stringify(initial));
      } catch (err) {
        console.warn('localStorage setItem failed', err);
      }
      return initial;
    }
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveCommunityLook(look: CommunityLook): CommunityLook[] {
    const list = this.getCommunityLooks();
    list.unshift(look);
    if (isBrowser()) {
      try {
        localStorage.setItem(COMMUNITY_KEY, JSON.stringify(list));
      } catch (err) {
        console.warn('localStorage setItem failed', err);
      }
    }
    return list;
  },

  likeCommunityLook(id: string): CommunityLook[] {
    const list = this.getCommunityLooks();
    const target = list.find((item: CommunityLook) => item.id === id);
    if (target) {
      target.likes = (target.likes || 0) + 1;
      if (isBrowser()) {
        try {
          localStorage.setItem(COMMUNITY_KEY, JSON.stringify(list));
        } catch (err) {
          console.warn('localStorage setItem failed', err);
        }
      }
    }
    return list;
  },

  getWardrobe(): WardrobeItem[] {
    if (!isBrowser()) return [];
    const data = localStorage.getItem(WARDROBE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveToWardrobe(item: WardrobeItem): WardrobeItem[] {
    const list = this.getWardrobe();
    list.unshift(item);
    if (isBrowser()) {
      try {
        localStorage.setItem(WARDROBE_KEY, JSON.stringify(list));
      } catch (err) {
        console.warn('localStorage setItem failed', err);
      }
    }
    return list;
  },

  removeFromWardrobe(id: string): WardrobeItem[] {
    const list = this.getWardrobe().filter((item: WardrobeItem) => item.id !== id);
    if (isBrowser()) {
      try {
        localStorage.setItem(WARDROBE_KEY, JSON.stringify(list));
      } catch (err) {
        console.warn('localStorage setItem failed', err);
      }
    }
    return list;
  },

  getUser(): UserContext {
    if (!isBrowser()) {
      return {
        isLoggedIn: false,
        name: 'Khách Di Sản (Guest)',
        email: 'khach@vietheritage.vn'
      };
    }
    const data = localStorage.getItem(USER_KEY);
    if (!data) {
      return {
        isLoggedIn: false,
        name: 'Khách Di Sản (Guest)',
        email: 'khach@vietheritage.vn'
      };
    }
    try {
      return JSON.parse(data);
    } catch {
      return { isLoggedIn: false, name: 'Guest', email: '' };
    }
  },

  setUser(userObj: UserContext): UserContext {
    if (isBrowser()) {
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(userObj));
      } catch (err) {
        console.warn('localStorage setItem failed', err);
      }
    }
    return userObj;
  }
};

export type LeagueTier =
  | 'Bronze'
  | 'Silver'
  | 'Gold'
  | 'Sapphire'
  | 'Ruby'
  | 'Emerald'
  | 'Amethyst'
  | 'Pearl'
  | 'Obsidian'
  | 'Diamond';

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatarUrl?: string;
  xp: number;
  rank: number;
  league: LeagueTier | string;
  streakCount: number;
  isCurrentUser?: boolean;
}

export interface ActivityRecordResult {
  success: boolean;
  message: string;
  streak: {
    count: number;
    lastActiveDate: string;
  };
  streakFreezesRemaining: number;
}

export interface HeartRefillResult {
  success: boolean;
  hearts: number;
  gemsRemaining: number;
  message: string;
}

export interface HeartConsumeResult {
  success: boolean;
  hearts: number;
  hasHeartsLeft: boolean;
  message: string;
}

export interface StreakFreezePurchaseResult {
  success: boolean;
  streakFreezes: number;
  gemsRemaining: number;
  message: string;
}

export interface ShopItem {
  id: string;
  title: string;
  description: string;
  priceInGems: number;
  icon: string;
  type: 'heart-refill' | 'streak-freeze' | 'cosmetic';
  available: boolean;
}

import type { Metadata } from 'next';
import { ShopView } from '@/features/shop';

export const metadata: Metadata = {
  title: 'Gem Bazaar & Power-Ups',
  description:
    'Spend your hard-earned gems to protect streaks, equip streak freezes, place double wagers, and refill quest hearts.',
};

export default function ShopPage() {
  return <ShopView />;
}

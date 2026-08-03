import { Users, DollarSign, ShoppingCart, Package } from 'lucide-react';

import type { Stat } from './types';

export const statsData: Stat[] = [
  {
    title: 'Total Users',
    value: '12,540',
    change: '+12.5%',
    icon: Users,
  },

  {
    title: 'Revenue',
    value: '$45,200',
    change: '+8.2%',
    icon: DollarSign,
  },

  {
    title: 'Orders',
    value: '3,420',
    change: '+5.4%',
    icon: ShoppingCart,
  },

  {
    title: 'Products',
    value: '860',
    change: '+2.1%',
    icon: Package,
  },
];

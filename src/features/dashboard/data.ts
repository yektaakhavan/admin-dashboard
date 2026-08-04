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

export const recentOrders = [
  {
    id: 1,
    customer: 'John Doe',
    product: 'MacBook Pro',
    status: 'Completed',
    amount: '$2499',
  },

  {
    id: 2,
    customer: 'Sarah',
    product: 'Keyboard',
    status: 'Pending',
    amount: '$180',
  },

  {
    id: 3,
    customer: 'Alex',
    product: 'Mouse',
    status: 'Cancelled',
    amount: '$90',
  },

  {
    id: 4,
    customer: 'Emma',
    product: 'Monitor',
    status: 'Completed',
    amount: '$550',
  },
];

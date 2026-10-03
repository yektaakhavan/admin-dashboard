import type { LucideIcon } from 'lucide-react';

export interface Stat {
  title: string;
  value: string;
  /** Percentage change, e.g. 12.5 or -3.2 */
  change: number;
  icon: LucideIcon;
}

export type OrderStatus = 'Completed' | 'Pending' | 'Cancelled';

export interface Order {
  id: number;
  customer: string;
  product: string;
  status: OrderStatus;
  /** Amount in USD */
  amount: number;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

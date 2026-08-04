export interface Stat {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

export interface Order {
  id: number;
  customer: string;
  product: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  amount: string;
}

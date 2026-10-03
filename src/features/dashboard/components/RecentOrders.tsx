import AnimatedContainer from '@/components/common/AnimatedContainer';
import SectionCard from '@/components/common/SectionCard';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { recentOrders } from '../data';
import { formatCurrency } from '../format';
import type { OrderStatus } from '../types';

const statusStyles: Record<OrderStatus, string> = {
  Completed: 'bg-success/15 text-success',
  Pending: 'bg-warning/15 text-warning',
  Cancelled: 'bg-destructive/10 text-destructive',
};

export default function RecentOrders() {
  return (
    <AnimatedContainer>
      <SectionCard title="Recent Orders" description="Latest customer orders">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.customer}</TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  {order.product}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(statusStyles[order.status])}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(order.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </AnimatedContainer>
  );
}

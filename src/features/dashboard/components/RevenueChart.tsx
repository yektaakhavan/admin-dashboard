import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import AnimatedContainer from '@/components/common/AnimatedContainer';
import SectionCard from '@/components/common/SectionCard';

import { revenueData } from '../chart-data';
import { formatCurrency } from '../format';

export default function RevenueChart() {
  return (
    <AnimatedContainer>
      <SectionCard
        title="Revenue"
        description="Monthly revenue, January to June"
      >
        <div
          role="img"
          aria-label="Line chart of monthly revenue rising from $3,200 in January to $7,300 in June"
          className="h-72 w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <YAxis
                width={56}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCurrency}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => [
                  formatCurrency(Number(value)),
                  'Revenue',
                ]}
                contentStyle={{
                  background: 'var(--popover)',
                  color: 'var(--popover-foreground)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--chart-1)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: 'var(--chart-1)' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </AnimatedContainer>
  );
}

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { revenueData } from '../chart-data';
import AnimatedContainer from '@/components/common/AnimatedContainer';

export default function RevenueChart() {
  return (
    <AnimatedContainer>
      <Card>
        <CardContent className="h-[350px] p-6">
          <h2 className="mb-6 text-xl font-semibold">Revenue</h2>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line type="monotone" dataKey="revenue" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
}

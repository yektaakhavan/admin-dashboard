import PageHeader from '@/components/common/PageHeader';

import RecentOrders from './components/RecentOrders';
import RevenueChart from './components/RevenueChart';
import StatsCard from './components/StatsCard';
import { statsData } from './data';

export default function DashboardView() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here is your business overview."
      />

      <section aria-label="Key statistics">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statsData.map((stat) => (
            <StatsCard key={stat.title} stat={stat} />
          ))}
        </div>
      </section>

      <RevenueChart />
      <RecentOrders />
    </div>
  );
}

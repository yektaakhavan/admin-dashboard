import StatsCard from './components/StatsCard';
import { statsData } from './data';
import RevenueChart from './components/RevenueChart';

export default function DashboardView() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back! Here is your business overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat) => (
          <StatsCard key={stat.title} stat={stat} />
        ))}
      </div>
      <RevenueChart />
    </section>
  );
}

import StatsCard from '@/features/dashboard/components/StatsCard';
import { statsData } from '@/features/dashboard/data';

export default function Dashboard() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <div
        className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      "
      >
        {statsData.map((stat) => (
          <StatsCard key={stat.title} stat={stat} />
        ))}
      </div>
    </div>
  );
}

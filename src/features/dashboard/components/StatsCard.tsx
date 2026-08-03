import { Card, CardContent } from '@/components/ui/card';

import type { Stat } from '../types';

interface Props {
  stat: Stat;
}

export default function StatsCard({ stat }: Props) {
  const Icon = stat.icon;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{stat.title}</p>

            <h2 className="mt-2 text-2xl font-bold">{stat.value}</h2>

            <p className="mt-2 text-sm text-green-600">{stat.change}</p>
          </div>

          <div
            className="
            rounded-lg
            bg-muted
            p-3
          "
          >
            <Icon size={22} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

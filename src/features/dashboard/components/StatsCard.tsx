import { Card, CardContent } from '@/components/ui/card';
import AnimatedContainer from '@/components/common/AnimatedContainer';

import type { Stat } from '../types';

interface Props {
  stat: Stat;
}

export default function StatsCard({ stat }: Props) {
  const Icon = stat.icon;

  return (
    <AnimatedContainer>
      <Card className="group transition-shadow hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>

              <h2 className="mt-2 text-2xl font-bold">{stat.value}</h2>

              <p className="mt-2 text-sm text-green-600">{stat.change}</p>
            </div>

            <div className="rounded-xl bg-muted p-3 transition-transform duration-300 group-hover:scale-110">
              <Icon size={22} />
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
}

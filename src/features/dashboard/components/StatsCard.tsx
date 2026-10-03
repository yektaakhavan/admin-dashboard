import { TrendingDown, TrendingUp } from 'lucide-react';

import AnimatedContainer from '@/components/common/AnimatedContainer';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { Stat } from '../types';

interface StatsCardProps {
  stat: Stat;
}

export default function StatsCard({ stat }: StatsCardProps) {
  const Icon = stat.icon;
  const isPositive = stat.change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <AnimatedContainer>
      <Card className="py-5 transition-shadow hover:shadow-md">
        <CardContent className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <p className="text-2xl font-semibold tracking-tight">
              {stat.value}
            </p>

            <p
              className={cn(
                'flex items-center gap-1 text-xs font-medium',
                isPositive ? 'text-success' : 'text-destructive',
              )}
            >
              <TrendIcon className="size-3.5" aria-hidden="true" />
              <span>
                {isPositive ? '+' : ''}
                {stat.change}%
              </span>
              <span className="font-normal text-muted-foreground">
                vs last month
              </span>
            </p>
          </div>

          <div className="rounded-lg bg-muted p-2.5 text-muted-foreground">
            <Icon className="size-5" aria-hidden="true" />
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
}

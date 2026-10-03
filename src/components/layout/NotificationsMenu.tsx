import { Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// UI-only for now: there is no notifications API in this project yet.
const notifications = [
  { id: 1, title: 'New order received', time: '5 minutes ago' },
  { id: 2, title: 'Payment of $2,499 completed', time: '1 hour ago' },
  { id: 3, title: 'Weekly report is ready', time: 'Yesterday' },
];

export default function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`Notifications (${notifications.length} new)`}
        >
          <Bell />
          <span
            aria-hidden="true"
            className="absolute top-2 right-2 size-2 rounded-full bg-destructive"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="flex-col items-start gap-0.5"
          >
            <span className="text-sm font-medium">{item.title}</span>
            <span className="text-xs text-muted-foreground">{item.time}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

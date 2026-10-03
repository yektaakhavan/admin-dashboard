import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSidebarStore } from '@/stores/sidebar.store';

import NotificationsMenu from './NotificationsMenu';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const openMobile = useSidebarStore((state) => state.openMobile);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation"
          onClick={openMobile}
          className="lg:hidden"
        >
          <Menu />
        </Button>

        <span className="font-semibold lg:hidden">Admin Panel</span>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <ThemeToggle />
        <NotificationsMenu />

        <div className="ml-2 flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
          >
            AD
          </div>

          <div className="hidden text-sm leading-tight md:block">
            <p className="font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@example.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}

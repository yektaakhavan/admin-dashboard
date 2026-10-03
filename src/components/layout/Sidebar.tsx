import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/stores/sidebar.store';

import { navItems } from './nav-items';

export default function Sidebar() {
  const isMobileOpen = useSidebarStore((state) => state.isMobileOpen);
  const closeMobile = useSidebarStore((state) => state.closeMobile);

  // Close the mobile drawer with the Escape key.
  useEffect(() => {
    if (!isMobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMobile();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMobileOpen, closeMobile]);

  return (
    <>
      {/* Backdrop (mobile only). Decorative: the close button is the accessible control. */}
      {isMobileOpen && (
        <div
          aria-hidden="true"
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card p-4',
          'transition-[transform,visibility] duration-300 lg:translate-x-0',
          // `invisible` removes the closed drawer from the tab order on mobile.
          isMobileOpen ? 'translate-x-0' : '-translate-x-full max-lg:invisible',
        )}
      >
        <div className="mb-6 flex h-10 items-center justify-between px-2">
          <span className="text-lg font-semibold tracking-tight">
            Admin Panel
          </span>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Close navigation"
            onClick={closeMobile}
            className="lg:hidden"
          >
            <X />
          </Button>
        </div>

        <nav aria-label="Main" className="space-y-1">
          {navItems.map(({ title, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground',
                )
              }
            >
              <Icon className="size-4" />
              {title}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

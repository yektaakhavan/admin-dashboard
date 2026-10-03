import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className="
        flex
        h-16
        items-center
        justify-between
        border-b
        px-4
        sm:px-6
      "
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="
            rounded-md
            p-2
            hover:bg-muted
            lg:hidden
          "
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <h1 className="font-semibold">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-md p-2 hover:bg-muted"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-primary
            text-sm
            font-medium
            text-primary-foreground
          "
        >
          Y
        </div>
      </div>
    </header>
  );
}

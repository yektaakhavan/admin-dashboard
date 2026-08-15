import { Menu } from 'lucide-react';

import { useSidebarStore } from '@/stores/sidebar.store';

export default function Navbar() {
  const toggle = useSidebarStore((state) => state.toggle);

  return (
    <header
      className="
      flex h-16 items-center justify-between
      border-b bg-white px-6
    "
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="rounded-md p-2 hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <h1 className="font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button type="button">🔔</button>

        <div
          className="
          flex h-9 w-9 items-center justify-center
          rounded-full bg-black text-white
        "
        >
          Y
        </div>
      </div>
    </header>
  );
}

import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  PanelLeftClose,
} from 'lucide-react';

import { useSidebarStore } from '@/stores/sidebar.store';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    icon: Users,
  },
  {
    title: 'Products',
    icon: Package,
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
  },
  {
    title: 'Settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <aside
      className={`
        border-r bg-white
        transition-all duration-300
        ${isOpen ? 'w-64' : 'w-20'}
      `}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {isOpen && <h2 className="text-lg font-bold">Admin Panel</h2>}

        <button
          type="button"
          onClick={toggle}
          className="rounded-md p-2 hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <PanelLeftClose size={20} />
        </button>
      </div>

      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              type="button"
              className={`
                flex w-full items-center gap-3
                rounded-lg px-3 py-2
                hover:bg-gray-100
                ${!isOpen ? 'justify-center' : ''}
              `}
            >
              <Icon size={20} />

              {isOpen && <span>{item.title}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

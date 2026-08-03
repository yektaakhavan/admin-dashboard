import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
} from 'lucide-react';

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
  return (
    <aside className="w-64 border-r bg-white p-5">
      <h2 className="mb-8 text-xl font-bold">Admin Panel</h2>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-2
              hover:bg-gray-100
              "
            >
              <Icon size={20} />

              {item.title}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

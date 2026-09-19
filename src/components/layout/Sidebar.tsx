import { LayoutDashboard, Users } from 'lucide-react';

import { NavLink } from 'react-router-dom';

const links = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    path: '/users',
    icon: Users,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        fixed
        left-0
        top-0
        h-screen
        w-64
        border-r
        bg-card
        p-5
      "
    >
      <h2 className="mb-8 text-xl font-bold">Admin Panel</h2>

      <nav className="space-y-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-sm
                transition
                ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }
                `
              }
            >
              <Icon size={18} />

              {item.title}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

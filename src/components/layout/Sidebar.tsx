import { LayoutDashboard, Users, X } from 'lucide-react';

import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-64
          border-r
          bg-card
          p-5
          transition-transform
          duration-300
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">Admin Panel</h2>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="
              rounded-md
              p-2
              hover:bg-muted
              lg:hidden
            "
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
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
    </>
  );
}

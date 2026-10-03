import { LayoutDashboard, Users, type LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Users', path: '/users', icon: Users },
];

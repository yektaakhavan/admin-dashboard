import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Sidebar />

      <div className="lg:pl-64">
        <Header />

        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto w-full max-w-7xl p-4 outline-none sm:p-6 lg:p-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

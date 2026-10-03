import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import QueryProvider from '@/app/query-provider';
import { router } from '@/app/router';
import '@/stores/theme.store'; // applies the saved theme before the first render
import '@/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>,
);

# Admin Dashboard

A responsive admin dashboard built with React and TypeScript, with a light/dark theme,
a users management screen and an end-to-end test suite.

## Tech stack

React 19 · TypeScript · Rsbuild · Tailwind CSS v4 · shadcn/ui · React Router ·
Zustand · TanStack Query · React Hook Form + Zod · Recharts · Motion · Lucide · Playwright

## Features

- **Dashboard**: statistics cards, revenue chart, recent orders
- **Users**: list (TanStack Query) with loading / error (+ retry) / empty states,
  live search, and a create-user form (React Hook Form + Zod) that updates the query cache
- **Layout**: responsive sidebar (off-canvas drawer on mobile), header with notifications
  menu, theme toggle and user area, active navigation state, skip-to-content link
- **Light / dark theme**: follows the OS on first visit, then remembers the choice
- **404 page** and a route-level error boundary; pages are lazy-loaded

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script                | What it does                                        |
| --------------------- | --------------------------------------------------- |
| `npm run build`       | Production build                                    |
| `npm run preview`     | Serve the production build                          |
| `npm run typecheck`   | TypeScript check                                    |
| `npm run lint`        | ESLint                                              |
| `npm run test:e2e`    | Playwright tests (builds and serves the app itself) |
| `npm run test:e2e:ui` | Playwright interactive UI mode                      |

First time running the tests: `npx playwright install chromium`.

## Architecture

```
src/
├── app/            router + providers
├── components/
│   ├── ui/         shadcn/ui primitives
│   ├── common/     shared building blocks (PageHeader, EmptyState, TextField, ...)
│   └── layout/     DashboardLayout, Sidebar, Header, ...
├── features/       one folder per feature: components, hooks, schema, types
│   ├── dashboard/
│   └── users/
├── pages/          thin route components
├── services/       API calls (no React in here)
├── stores/         Zustand: client/UI state only (sidebar drawer, theme)
├── hooks/          shared hooks
└── lib/            utilities
e2e/                Playwright tests + fixtures
```

**State rules.** Server data (users) lives in TanStack Query. Zustand holds only client/UI
state that is shared across components (mobile sidebar, theme).

**About the API.** Users come from [JSONPlaceholder](https://jsonplaceholder.typicode.com),
which accepts `POST` requests but never stores anything. So after creating a user the app writes
it into the query cache instead of refetching (a refetch would make the new user vanish). With a
real backend, switch `useCreateUser` to `invalidateQueries` (see the comment in that file).

## Testing

Playwright tests run against the production build. The external API is **fully mocked** with
`page.route` (see `e2e/fixtures.ts`), so tests are fast, deterministic and offline-safe, and any
request that isn't mocked fails loudly. Tests use accessible locators (roles, labels), never CSS classes.



<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="section divider" />

## 👨‍💻 Author

**Yekta Akhavan**

<p align="center">
  <a href="mailto:yekta.akhavan.dev@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-yekta.akhavan.dev%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0D1117" alt="Email" />
  </a>
  &nbsp;
  <a href="https://www.linkedin.com/in/yekta-akhavan/">
    <img src="https://img.shields.io/badge/LinkedIn-Yekta%20Akhavan-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0D1117" alt="LinkedIn" />
  </a>
  &nbsp;
  <a href="https://www.instagram.com/yektaakhavan.dev?igsi=d2Vya2RqazhqZ2Z2">
    <img src="https://img.shields.io/badge/Instagram-yekta--akhavan-E4405F?style=for-the-badge&logo=instagram&logoColor=white&labelColor=0D1117" alt="Instagram" />
  </a>
  &nbsp;
  <a href="https://yekta-akhavan.vercel.app/">
    <img src="https://img.shields.io/badge/Portfolio-yekta--akhavan.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=0D1117" alt="Portfolio" />
  </a>
</p>

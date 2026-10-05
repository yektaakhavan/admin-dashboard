# 📊 Admin Dashboard

A responsive admin dashboard built with React 19 and TypeScript, focused on real-world frontend engineering: clear state management, accessible UI, a feature-based architecture, and a mocked-API end-to-end test suite.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://admin-dashboard-rsbuild.vercel.app)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Language](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Testing](https://img.shields.io/badge/E2E-Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)

---

## ✨ Overview

This project is a modern admin panel with a dashboard overview and a users management screen.

It was built to practice the things that make a frontend project feel production-ready rather than tutorial-level:

- A clear separation between **server state** and **UI state**
- Complete **loading, error and empty states**
- **Accessible** forms and navigation
- A **responsive** layout with a mobile navigation drawer
- **Light and dark** themes
- **End-to-end tests** that never depend on an external service

👉 **Live demo:** [admin-dashboard-rsbuild.vercel.app](https://admin-dashboard-rsbuild.vercel.app)

---

## 📸 Screenshots

### Dashboard

![Dashboard in light mode](./docs/screenshots/dashboard-light.png)

### Dark mode & mobile

<table>
  <tr>
    <td><img src="./docs/screenshots/dashboard-dark.png" alt="Dashboard in dark mode" /></td>
    <td width="30%"><img src="./docs/screenshots/mobile.png" alt="Dashboard on a phone" /></td>
  </tr>
</table>

### Users

![Users page](./docs/screenshots/users.png)

---

## 🚀 Features

### 📈 Dashboard

- Statistics cards with up/down trend indicators
- Revenue line chart with theme-aware colors and formatted axis/tooltip
- Recent orders table with status badges
- Subtle entrance animations that respect `prefers-reduced-motion`

### 👥 Users

- Users list fetched with TanStack Query
- Loading skeleton, error state with **Try again**, and empty state
- Live search by name, username or email, with a result counter
- Create-user form with React Hook Form + Zod validation
- Success and error feedback after submitting
- Newly created users appear instantly through a cache update

### 🧭 Layout & Navigation

- Sidebar that becomes an off-canvas drawer on mobile (closes with `Esc`, the close button or a link click)
- Header with notifications menu, theme toggle and user area
- Active navigation state
- Skip-to-content link

### 🌗 Theme

- Light and dark mode
- Follows the OS preference on the first visit, then remembers the choice

### 🛣️ Routing

- Nested layout routing with `Outlet`
- Lazy-loaded pages (code splitting)
- 404 page inside the layout
- Route-level error boundary
- Page titles updated per route

### ♿ Accessibility

- Semantic landmarks and heading hierarchy
- Labelled form fields with `aria-invalid` and linked error messages
- Keyboard support and visible focus states
- Closed mobile drawer removed from the tab order

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI development |
| TypeScript | Type safety |
| Rsbuild | Development and build tooling |
| Tailwind CSS v4 | Styling and responsive UI |
| shadcn/ui (Radix UI) | Accessible UI components |
| React Router | Routing |
| TanStack Query | Server state: fetching, caching, mutations |
| Zustand | Client/UI state: sidebar and theme |
| React Hook Form | Form management |
| Zod | Form validation |
| Recharts | Dashboard chart |
| Motion | Animations |
| Lucide React | Icons |
| Playwright | End-to-end testing |
| Vercel | Deployment |

---

## 🗂️ Project Structure

```text
src/
├── app/                 Router and providers
├── components/
│   ├── ui/              shadcn/ui primitives
│   ├── common/          Shared building blocks (PageHeader, EmptyState, TextField, ...)
│   └── layout/          DashboardLayout, Sidebar, Header, ThemeToggle, ...
├── features/
│   ├── dashboard/       Stats, revenue chart, recent orders
│   └── users/           Table, form, hooks (useUsers, useCreateUser), schema
├── pages/               Thin route components
├── services/            API calls (no React in here)
├── stores/              Zustand stores (sidebar, theme)
├── hooks/               Shared hooks
└── lib/                 Utilities

e2e/                     Playwright tests and fixtures
```

Each feature owns its components, hooks, schema and types. Shared pieces live in `components/`.

---

## 🧠 Key Implementation Details

### Server State vs. UI State

Data that lives on a server (the users list) is handled by **TanStack Query**, which provides loading and error states, caching and refetching.

**Zustand** only holds UI state that several components share: the mobile sidebar and the theme.

The two are never mixed.

### Updating the Cache After a Mutation

Creating a user uses `useMutation`. After it succeeds there are two common options: invalidate the query, or update the cache manually.

The demo API ([JSONPlaceholder](https://jsonplaceholder.typicode.com)) accepts `POST` requests but never stores anything, so refetching would make the new user disappear. The app therefore writes the new user straight into the query cache and gives it a unique id.

With a real backend, switch to `invalidateQueries`. A comment in `useCreateUser.ts` shows where.

### Typed Forms

Form values are inferred from the Zod schema, and the new-user payload type is derived from the `User` type with `Omit<User, 'id'>`.

### Accessible Form Field

A shared `TextField` component connects the label, input, `aria-invalid` and the error message, so every form gets accessibility for free.

---

## 🧪 Testing

The project has **23 Playwright end-to-end tests**.

They run against the **production build** with a fully **mocked API** (`page.route`), so they are fast, deterministic and independent of any external service. Any request that is not mocked fails loudly.

Tested flows:

- Dashboard content (stats, chart, recent orders)
- Sidebar navigation and active link state
- 404 page and back-to-dashboard link
- Users list: loaded, loading, error with retry, empty
- Search and filtering
- Create-user validation (empty and invalid values)
- Successful user creation (request payload, cache update, form reset, unique ids)
- Failed creation keeps the typed values
- Mobile drawer: open, close, `Esc`, link navigation, no horizontal overflow
- Dark mode toggle persisting after a reload

Tests use accessible locators (roles and labels), never CSS classes, and no fixed timeouts.

Run them with:

```bash
npx playwright install chromium   # first time only
npm run test:e2e
```

---

## ⚡ Performance

- Route-based code splitting with the router `lazy` option
- Production build optimization through Rsbuild

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js `^20.19.0` or `>=22.12.0`
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/yektaakhavan/admin-dashboard.git
cd admin-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | Run the TypeScript check |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run the Playwright tests (builds and serves the app itself) |
| `npm run test:e2e:ui` | Run Playwright in interactive UI mode |

---

## 🚢 Deployment

The app is deployed on Vercel. Because it uses client-side routing, `vercel.json` rewrites every path to `index.html`, so refreshing `/users` does not return a 404.

---

## ⚠️ Known Limitations

- Dashboard figures (statistics, revenue, orders) are static sample data.
- Users come from JSONPlaceholder, so created users live only in the browser cache and disappear on reload.
- Notifications and the user area are UI only; there is no authentication.
- Only create and read are implemented for users.

---

## 🗺️ Roadmap

* [ ] Edit and delete users
* [ ] Products and Orders pages
* [ ] Connect to a real backend API
* [ ] Authentication and protected routes
* [ ] Analytics page

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

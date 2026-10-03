import { test as base, type Page, type Route } from '@playwright/test';

import type { NewUser, User } from '../src/features/users/types';

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'nathan@yesenia.net',
  },
];

/** Registers a handler for one HTTP method; other methods fall through to earlier routes. */
function onMethod(
  page: Page,
  method: 'GET' | 'POST',
  handler: (route: Route) => Promise<void> | void,
) {
  return page.route(USERS_URL, (route) =>
    route.request().method() === method ? handler(route) : route.fallback(),
  );
}

interface MockApi {
  /** Bodies of every POST /users request the app sent. */
  createdBodies: NewUser[];
  respondWithUsers: (users: User[]) => Promise<unknown>;
  failLoadingUsers: () => Promise<unknown>;
  failCreatingUser: () => Promise<unknown>;
  /** Holds the GET /users response until the returned function is called. */
  holdUsersResponse: () => Promise<() => void>;
}

/**
 * Every test gets a fully mocked API, so the suite never depends on the real
 * (external, unreliable) JSONPlaceholder service. Routes registered later win,
 * so a test can override the defaults, e.g. `await api.failLoadingUsers()`.
 */
export const test = base.extend<{ api: MockApi }>({
  api: [
    async ({ page }, use) => {
      const createdBodies: NewUser[] = [];

      // Lowest priority: anything we forgot to mock fails loudly instead of hitting the network.
      await page.route('https://jsonplaceholder.typicode.com/**', (route) =>
        route.abort(),
      );

      await onMethod(page, 'GET', (route) =>
        route.fulfill({ json: mockUsers }),
      );

      // Like the real JSONPlaceholder: always answers 201 with id 11, stores nothing.
      await onMethod(page, 'POST', (route) => {
        const body = route.request().postDataJSON() as NewUser;
        createdBodies.push(body);
        return route.fulfill({ status: 201, json: { id: 11, ...body } });
      });

      await use({
        createdBodies,
        respondWithUsers: (users) =>
          onMethod(page, 'GET', (route) => route.fulfill({ json: users })),
        failLoadingUsers: () =>
          onMethod(page, 'GET', (route) =>
            route.fulfill({ status: 500, json: { message: 'Server error' } }),
          ),
        failCreatingUser: () =>
          onMethod(page, 'POST', (route) =>
            route.fulfill({ status: 500, json: { message: 'Server error' } }),
          ),
        holdUsersResponse: async () => {
          let release!: () => void;
          const gate = new Promise<void>((resolve) => (release = resolve));

          await onMethod(page, 'GET', async (route) => {
            await gate;
            await route.fulfill({ json: mockUsers });
          });

          return release;
        },
      });
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';

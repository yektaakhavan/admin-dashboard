import { expect, mockUsers, test } from './fixtures';

test.describe('Users list', () => {
  test('loads and shows the users table', async ({ page }) => {
    await page.goto('/users');

    await expect(
      page.getByRole('heading', { name: 'Users', level: 1 }),
    ).toBeVisible();

    const table = page.getByRole('table', { name: 'List of users' });
    await expect(table.getByRole('row')).toHaveCount(mockUsers.length + 1);

    for (const user of mockUsers) {
      await expect(
        table.getByRole('row', {
          name: new RegExp(`${user.name}.*${user.email}`),
        }),
      ).toBeVisible();
    }
    await expect(page.getByText('Showing 3 of 3 users')).toBeVisible();
  });

  test('shows a loading state while the request is pending', async ({
    page,
    api,
  }) => {
    const release = await api.holdUsersResponse();

    await page.goto('/users');

    await expect(
      page.getByRole('status', { name: 'Loading users' }),
    ).toBeVisible();
    await expect(page.getByRole('table')).toBeHidden();
    // The create form is usable even while the list loads.
    await expect(
      page.getByRole('button', { name: 'Create user' }),
    ).toBeVisible();

    release();

    await expect(
      page.getByRole('status', { name: 'Loading users' }),
    ).toBeHidden();
    await expect(
      page.getByRole('table', { name: 'List of users' }),
    ).toBeVisible();
  });

  test('shows an error state and recovers with "Try again"', async ({
    page,
    api,
  }) => {
    await api.failLoadingUsers();

    await page.goto('/users');

    const error = page
      .getByRole('alert')
      .filter({ hasText: 'Failed to load users' });
    await expect(error).toBeVisible();
    await expect(page.getByRole('table')).toBeHidden();

    // The server "comes back", and the user retries.
    await api.respondWithUsers(mockUsers);
    await error.getByRole('button', { name: 'Try again' }).click();

    await expect(
      page.getByRole('table', { name: 'List of users' }),
    ).toBeVisible();
    await expect(error).toBeHidden();
  });

  test('shows an empty state when there are no users', async ({
    page,
    api,
  }) => {
    await api.respondWithUsers([]);

    await page.goto('/users');

    await expect(page.getByText('No users yet')).toBeVisible();
    await expect(page.getByRole('table')).toBeHidden();
  });

  test('filters users by name, username or email', async ({ page }) => {
    await page.goto('/users');
    const table = page.getByRole('table', { name: 'List of users' });
    const search = page.getByRole('searchbox', { name: 'Search users' });

    await search.fill('ervin');
    await expect(table.getByRole('row')).toHaveCount(2); // header + 1
    await expect(
      table.getByRole('row', { name: /Ervin Howell/ }),
    ).toBeVisible();
    await expect(page.getByText('Showing 1 of 3 users')).toBeVisible();

    await search.fill('yesenia.net'); // by email
    await expect(
      table.getByRole('row', { name: /Clementine Bauch/ }),
    ).toBeVisible();
    await expect(table.getByRole('row')).toHaveCount(2);

    await search.fill('does-not-exist');
    await expect(page.getByText('No users match your search')).toBeVisible();
    await expect(table).toBeHidden();

    await search.clear();
    await expect(table.getByRole('row')).toHaveCount(mockUsers.length + 1);
  });
});

test.describe('Create user form', () => {
  test('shows validation errors when submitted empty', async ({
    page,
    api,
  }) => {
    await page.goto('/users');

    await page.getByRole('button', { name: 'Create user' }).click();

    await expect(
      page.getByText('Name must be at least 2 characters'),
    ).toBeVisible();
    await expect(
      page.getByText('Username must be at least 3 characters'),
    ).toBeVisible();
    await expect(page.getByText('Please enter a valid email')).toBeVisible();
    await expect(page.getByLabel('Name', { exact: true })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(api.createdBodies).toHaveLength(0); // nothing was sent
  });

  test('rejects invalid values and clears errors once fixed', async ({
    page,
    api,
  }) => {
    await page.goto('/users');

    await page.getByLabel('Name', { exact: true }).fill('A');
    await page.getByLabel('Username').fill('ab');
    await page.getByLabel('Email').fill('not-an-email');
    await page.getByRole('button', { name: 'Create user' }).click();

    await expect(
      page.getByText('Name must be at least 2 characters'),
    ).toBeVisible();
    await expect(
      page.getByText('Username must be at least 3 characters'),
    ).toBeVisible();
    await expect(page.getByText('Please enter a valid email')).toBeVisible();

    await page.getByLabel('Email').fill('valid@example.com');
    await expect(page.getByText('Please enter a valid email')).toBeHidden();
    expect(api.createdBodies).toHaveLength(0);
  });

  test('creates a user and shows it at the top of the table', async ({
    page,
    api,
  }) => {
    await page.goto('/users');
    const table = page.getByRole('table', { name: 'List of users' });
    await expect(table.getByRole('row')).toHaveCount(mockUsers.length + 1);

    await page.getByLabel('Name', { exact: true }).fill('Ada Lovelace');
    await page.getByLabel('Username').fill('ada');
    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByRole('button', { name: 'Create user' }).click();

    // Feedback + request payload
    await expect(page.getByRole('status')).toHaveText(
      /Ada Lovelace.*was created/,
    );
    expect(api.createdBodies).toEqual([
      { name: 'Ada Lovelace', username: 'ada', email: 'ada@example.com' },
    ]);

    // Query cache was updated: the new user is in the table, newest first
    await expect(table.getByRole('row')).toHaveCount(mockUsers.length + 2);
    await expect(table.getByRole('row').nth(1)).toContainText('Ada Lovelace');
    await expect(page.getByText('Showing 4 of 4 users')).toBeVisible();

    // The form is reset
    await expect(page.getByLabel('Name', { exact: true })).toHaveValue('');
    await expect(page.getByLabel('Username')).toHaveValue('');
    await expect(page.getByLabel('Email')).toHaveValue('');
  });

  test('gives every created user a unique id', async ({ page }) => {
    // The fake API answers every POST with id 11. The app must assign its own
    // unique ids, otherwise rows share a React key.
    await page.goto('/users');
    const table = page.getByRole('table', { name: 'List of users' });

    for (const [name, username] of [
      ['First New', 'first'],
      ['Second New', 'second'],
    ]) {
      await page.getByLabel('Name', { exact: true }).fill(name);
      await page.getByLabel('Username').fill(username);
      await page.getByLabel('Email').fill(`${username}@example.com`);
      await page.getByRole('button', { name: 'Create user' }).click();
      await expect(
        table.getByRole('row', { name: new RegExp(name) }),
      ).toBeVisible();
    }

    await expect(table.getByRole('row')).toHaveCount(mockUsers.length + 3);

    const ids = await table
      .getByRole('row')
      .evaluateAll((rows) =>
        rows
          .map((row) => row.getAttribute('data-user-id'))
          .filter((id): id is string => id !== null),
      );
    expect(ids).toHaveLength(mockUsers.length + 2);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('a newly created user is found by search', async ({ page }) => {
    await page.goto('/users');

    await page.getByLabel('Name', { exact: true }).fill('Grace Hopper');
    await page.getByLabel('Username').fill('grace');
    await page.getByLabel('Email').fill('grace@example.com');
    await page.getByRole('button', { name: 'Create user' }).click();
    await expect(page.getByRole('status')).toBeVisible();

    await page.getByRole('searchbox', { name: 'Search users' }).fill('grace');

    const table = page.getByRole('table', { name: 'List of users' });
    await expect(table.getByRole('row')).toHaveCount(2);
    await expect(
      table.getByRole('row', { name: /Grace Hopper/ }),
    ).toBeVisible();
  });

  test('shows an error and keeps the form values when creation fails', async ({
    page,
    api,
  }) => {
    await api.failCreatingUser();
    await page.goto('/users');

    await page.getByLabel('Name', { exact: true }).fill('Failing User');
    await page.getByLabel('Username').fill('failing');
    await page.getByLabel('Email').fill('failing@example.com');
    await page.getByRole('button', { name: 'Create user' }).click();

    await expect(
      page.getByRole('alert').filter({ hasText: 'Failed to create user' }),
    ).toBeVisible();
    await expect(page.getByLabel('Name', { exact: true })).toHaveValue(
      'Failing User',
    );
    await expect(page.getByRole('row', { name: /Failing User/ })).toBeHidden();
  });
});

import { expect, test } from './fixtures';

test.describe('Sidebar navigation', () => {
  test('navigates between pages and marks the active link', async ({
    page,
  }) => {
    await page.goto('/dashboard');

    const nav = page.getByRole('navigation', { name: 'Main' });
    const dashboardLink = nav.getByRole('link', { name: 'Dashboard' });
    const usersLink = nav.getByRole('link', { name: 'Users' });

    await expect(dashboardLink).toHaveAttribute('aria-current', 'page');
    await expect(usersLink).not.toHaveAttribute('aria-current', 'page');

    await usersLink.click();

    await expect(page).toHaveURL(/\/users$/);
    await expect(
      page.getByRole('heading', { name: 'Users', level: 1 }),
    ).toBeVisible();
    await expect(page).toHaveTitle(/Users/);
    await expect(usersLink).toHaveAttribute('aria-current', 'page');
    await expect(dashboardLink).not.toHaveAttribute('aria-current', 'page');

    await dashboardLink.click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(
      page.getByRole('heading', { name: 'Dashboard', level: 1 }),
    ).toBeVisible();
  });

  test('keeps working with the browser back button', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: 'Users' }).click();
    await expect(page).toHaveURL(/\/users$/);

    await page.goBack();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(
      page.getByRole('heading', { name: 'Dashboard', level: 1 }),
    ).toBeVisible();
  });
});

test.describe('404 page', () => {
  test('shows a not-found page for unknown URLs, with the layout intact', async ({
    page,
  }) => {
    await page.goto('/this-page-does-not-exist');

    await expect(page.getByText('404 – Page not found')).toBeVisible();
    await expect(page).toHaveTitle(/Page not found/);
    // The sidebar is still there, so people can get back to the app.
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
  });

  test('"Back to dashboard" leads back to the dashboard', async ({ page }) => {
    await page.goto('/nope');

    await page.getByRole('link', { name: 'Back to dashboard' }).click();

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(
      page.getByRole('heading', { name: 'Dashboard', level: 1 }),
    ).toBeVisible();
  });
});

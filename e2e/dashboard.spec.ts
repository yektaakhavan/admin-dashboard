import { expect, test } from './fixtures';

test.describe('Dashboard', () => {
  test('redirects the root URL to the dashboard', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page).toHaveTitle(/Dashboard/);
  });

  test('shows statistics, revenue chart and recent orders', async ({
    page,
  }) => {
    await page.goto('/dashboard');

    await expect(
      page.getByRole('heading', { name: 'Dashboard', level: 1 }),
    ).toBeVisible();

    // Statistics cards
    const stats = page.getByRole('region', { name: 'Key statistics' });
    for (const title of ['Total Users', 'Revenue', 'Orders', 'Products']) {
      await expect(stats.getByText(title, { exact: true })).toBeVisible();
    }
    await expect(stats.getByText('$45,200')).toBeVisible();
    await expect(stats.getByText('+12.5%')).toBeVisible();
    await expect(stats.getByText('-2.1%')).toBeVisible();

    // Revenue chart
    const chart = page.getByRole('img', {
      name: /line chart of monthly revenue/i,
    });
    await expect(chart).toBeVisible();
    await expect(chart.locator('svg').first()).toBeVisible();

    // Recent orders
    const orders = page.getByRole('table');
    await expect(
      orders.getByRole('columnheader', { name: 'Customer' }),
    ).toBeVisible();
    await expect(orders.getByRole('row')).toHaveCount(5); // header + 4 orders
    await expect(
      orders.getByRole('row', {
        name: /John Doe.*MacBook Pro.*Completed.*\$2,499/,
      }),
    ).toBeVisible();
    await expect(
      orders.getByRole('row', { name: /Alex Johnson.*Cancelled/ }),
    ).toBeVisible();
  });
});

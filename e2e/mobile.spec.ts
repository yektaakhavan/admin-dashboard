import { expect, test } from './fixtures';

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('hides the sidebar by default and opens it from the menu button', async ({
    page,
  }) => {
    await page.goto('/dashboard');

    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav).toBeHidden();

    await page.getByRole('button', { name: 'Open navigation' }).click();

    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Users' })).toBeVisible();
  });

  test('navigates and closes the drawer after choosing a link', async ({
    page,
  }) => {
    await page.goto('/dashboard');

    await page.getByRole('button', { name: 'Open navigation' }).click();
    const nav = page.getByRole('navigation', { name: 'Main' });
    await nav.getByRole('link', { name: 'Users' }).click();

    await expect(page).toHaveURL(/\/users$/);
    await expect(
      page.getByRole('heading', { name: 'Users', level: 1 }),
    ).toBeVisible();
    await expect(nav).toBeHidden();
  });

  test('closes with the close button and with Escape', async ({ page }) => {
    await page.goto('/dashboard');
    const nav = page.getByRole('navigation', { name: 'Main' });
    const openButton = page.getByRole('button', { name: 'Open navigation' });

    await openButton.click();
    await expect(nav).toBeVisible();
    await page.getByRole('button', { name: 'Close navigation' }).click();
    await expect(nav).toBeHidden();

    await openButton.click();
    await expect(nav).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(nav).toBeHidden();
  });

  test('users page content is usable on a small screen', async ({ page }) => {
    await page.goto('/users');

    await expect(
      page.getByRole('table', { name: 'List of users' }),
    ).toBeVisible();
    await expect(page.getByLabel('Name', { exact: true })).toBeVisible();

    // The page itself must not scroll sideways (wide tables scroll inside their own container).
    const hasHorizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});

test.describe('Desktop layout', () => {
  test('shows the sidebar permanently and no menu button', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Open navigation' }),
    ).toBeHidden();
  });
});

import { expect, test } from './fixtures';

test.describe('Theme', () => {
  test('toggles dark mode and remembers it after a reload', async ({
    page,
  }) => {
    await page.goto('/dashboard');
    const html = page.locator('html');

    await expect(html).not.toHaveClass(/dark/);

    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await expect(html).toHaveClass(/dark/);
    await expect(
      page.getByRole('button', { name: 'Switch to light theme' }),
    ).toBeVisible();

    await page.reload();
    await expect(html).toHaveClass(/dark/);

    await page.getByRole('button', { name: 'Switch to light theme' }).click();
    await expect(html).not.toHaveClass(/dark/);
  });
});

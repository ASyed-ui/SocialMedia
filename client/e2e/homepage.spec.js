import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Tests', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.*ConnectSphere.*/i);
  });

  test('should have login link visible', async ({ page }) => {
    await page.goto('/');
    const loginLink = page.getByRole('link', { name: /login/i });
    await expect(loginLink).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /login/i }).click();
    await expect(page).toHaveURL(/.*login/);
  });
});

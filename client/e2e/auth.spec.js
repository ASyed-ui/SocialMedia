import { test, expect } from '@playwright/test';

test.describe('Authentication E2E Tests', () => {
  test('should display login form elements', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    // Button might have different text, just check form exists
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should have register link on login page', async ({ page }) => {
    await page.goto('/login');
    const registerLink = page.getByRole('link', { name: /register/i });
    await expect(registerLink).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: /register/i }).click();
    await expect(page).toHaveURL(/.*register/);
  });
});

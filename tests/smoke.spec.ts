import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check that the main elements are present
    await expect(page.getByRole('heading', { name: /digging the moon/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /meet the team/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /our sponsors/i })).toBeVisible();
  });

  test('team page loads correctly', async ({ page }) => {
    await page.goto('/team');
    
    // Check that the team page loads
    await expect(page.getByRole('heading', { name: /our team/i })).toBeVisible();
    
    // Check that member cards are present
    const memberCards = page.locator('[data-testid="member-card"]');
    await expect(memberCards).toHaveCountGreaterThan(0);
  });

  test('sponsors page loads correctly', async ({ page }) => {
    await page.goto('/sponsors');
    
    // Check that the sponsors page loads
    await expect(page.getByRole('heading', { name: /our sponsors/i })).toBeVisible();
    
    // Check that sponsor tiers are present
    const sponsorTiers = page.locator('[data-testid="sponsor-tier"]');
    await expect(sponsorTiers).toHaveCountGreaterThan(0);
  });

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to team page
    await page.getByRole('link', { name: /team/i }).first().click();
    await expect(page).toHaveURL('/team');
    
    // Test navigation to sponsors page
    await page.getByRole('link', { name: /sponsors/i }).first().click();
    await expect(page).toHaveURL('/sponsors');
    
    // Test navigation back to home
    await page.getByRole('link', { name: /home/i }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('theme toggle works', async ({ page }) => {
    await page.goto('/');
    
    // Check initial theme
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('class');
    
    // Click theme toggle
    await page.getByRole('button', { name: /toggle theme/i }).click();
    
    // Check that theme changed
    const newTheme = await html.getAttribute('class');
    expect(newTheme).not.toBe(initialTheme);
  });
});

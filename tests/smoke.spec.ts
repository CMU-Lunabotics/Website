import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check that the main elements are present
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // Use .first() since there are multiple "Join Us" links (hero + footer)
    await expect(page.getByRole('link', { name: /join us/i }).first()).toBeVisible();
    // Use .first() since there are multiple "Meet the Team" links (hero + footer)
    await expect(page.getByRole('link', { name: /meet the team/i }).first()).toBeVisible();
  });

  test('team page loads correctly', async ({ page }) => {
    await page.goto('/team');
    
    // Check that the team page loads - use .first() to avoid "About Our Team" heading conflict
    await expect(page.getByRole('heading', { name: 'Our Team' }).first()).toBeVisible();
    
    // Check that member cards are present
    const memberCards = page.locator('[data-testid="member-card"]');
    await expect(memberCards.first()).toBeVisible();
  });

  test('sponsors page loads correctly', async ({ page }) => {
    await page.goto('/sponsors');
    
    // Check that the sponsors page loads
    await expect(page.getByRole('heading', { name: /our sponsors/i })).toBeVisible();
    
    // Check that sponsors are present (we removed tiers, now just have sponsor cards)
    const sponsorCards = page.locator('text=Synopsys').or(page.locator('text=Prof. Howie Choset'));
    await expect(sponsorCards.first()).toBeVisible();
  });

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to team page
    await page.getByRole('link', { name: /team/i }).first().click();
    await expect(page).toHaveURL('/team');
    
    // Test navigation to sponsors page
    await page.getByRole('link', { name: /sponsors/i }).first().click();
    await expect(page).toHaveURL('/sponsors');
    
    // // Test navigation back to home
    // await page.getByRole('link', { name: /home/i }).first().click();
    // await expect(page).toHaveURL('/');
  });
});

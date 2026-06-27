import { test, expect } from '@playwright/test'

test.describe('Navigation & Routing', () => {
  test('Shop page loads and shows products grid', async ({ page }) => {
    await page.goto('/shop')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('About / Studio page loads', async ({ page }) => {
    await page.goto('/about')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL('/about')
    await expect(page.locator('body')).toBeVisible()
  })

  test('Bulk Order page loads', async ({ page }) => {
    await page.goto('/bulk-order')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL('/bulk-order')
  })

  test('Contact page loads', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL('/contact')
  })

  test('Cart page loads', async ({ page }) => {
    await page.goto('/cart')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL('/cart')
  })

  test('WhatsApp button is visible on public pages', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Use aria-label to target the floating WhatsApp button specifically
    const waButton = page.locator('a[aria-label="Chat on WhatsApp"]')
    await expect(waButton).toBeVisible()
  })

  test('WhatsApp button is NOT visible on admin pages', async ({ page }) => {
    await page.goto('/admin/login')
    await page.waitForLoadState('networkidle')
    const waButton = page.locator('a[href*="wa.me"]')
    await expect(waButton).toHaveCount(0)
  })

  test('footer is visible on public pages', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('footer')).toBeVisible()
  })

  test('footer is NOT visible on admin pages', async ({ page }) => {
    await page.goto('/admin/login')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('footer')).toHaveCount(0)
  })

  test('mobile nav hamburger opens menu', async ({ page, isMobile }) => {
    if (!isMobile) test.skip()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const hamburger = page.locator('button[aria-label="Toggle menu"]')
    await expect(hamburger).toBeVisible()
    await hamburger.click()
    await expect(page.locator('nav a', { hasText: 'Shop' }).first()).toBeVisible()
  })
})

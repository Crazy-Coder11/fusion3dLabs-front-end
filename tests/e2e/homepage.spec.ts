import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for hydration
    await page.waitForLoadState('networkidle')
  })

  test('renders hero section with headline and CTAs', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Custom 3D Printing Services in India/i)
    await expect(page.locator('a', { hasText: 'Get a 3D Printing Quote' })).toBeVisible()
    await expect(page.locator('a', { hasText: 'Explore 3D Printing Services' })).toBeVisible()
  })

  test('navbar is visible and links work', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible()
    await expect(page.getByRole('link', { name: /Fusion3DLabs/i }).first()).toBeVisible()
    await expect(page.locator('header a', { hasText: '3D Printing' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Shop', exact: true })).toBeVisible()
    await expect(page.locator('header a', { hasText: 'About' })).toBeVisible()

    // Navigate to shop
    await page.click('header a[href="/shop"]')
    await expect(page).toHaveURL('/shop')
  })

  test('Process section renders step 01 Share', async ({ page }) => {
    // Scroll past hero into the process section and wait for GSAP to settle
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5))
    await page.waitForTimeout(1500)
    // Step text is in the DOM (absolute positioned, may be CSS hidden until GSAP runs)
    // Just verify the element exists and is attached — GSAP controls visibility
    const shareHeading = page.getByRole('heading', { name: 'Share', exact: true })
    await expect(shareHeading).toBeAttached()
    await expect(page.getByText('The Process', { exact: true })).toBeAttached()
  })

  test('shows the product range and the live featured product', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Objects with depth/i })).toBeAttached()
    await expect(page.getByText('Illustrative category showcase', { exact: true })).toBeAttached()
    await expect(page.getByText('Live featured product', { exact: true })).toBeAttached()
    await expect(page.getByRole('link', { name: 'View Featured Product', exact: true })).toHaveAttribute('href', '/product/firdge-magnet')
    await expect(page.getByRole('heading', { name: 'Shop 3D printed products', exact: true })).toBeAttached()
    await expect(page.getByRole('link', { name: 'View shop', exact: true })).toHaveAttribute('href', '/shop')
  })

  test('project callout section is present', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6))
    await page.waitForTimeout(600)
    await expect(page.getByRole('heading', { name: /Your Vision/i })).toBeAttached()
    await expect(page.getByRole('link', { name: 'Start Your Project', exact: true })).toBeAttached()
  })

  test('FAQ section answers core ordering questions', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(600)
    await expect(page.getByRole('heading', { name: '3D printing questions', exact: true })).toBeAttached()
    await expect(page.locator('summary').filter({ hasText: 'What materials do you use for 3D printing?' })).toBeAttached()
  })

  test('site uses the configured light theme', async ({ page }) => {
    const html = page.locator('html')
    await expect(html).toHaveAttribute('data-theme', 'light')
  })

  test('no public navbar on admin routes', async ({ page }) => {
    await page.goto('/admin/login')
    await page.waitForLoadState('networkidle')
    // Public nav should NOT be present on admin pages
    await expect(page.locator('header nav a[href="/shop"]')).toHaveCount(0)
  })
})

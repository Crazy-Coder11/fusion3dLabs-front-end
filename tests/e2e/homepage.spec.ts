import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for hydration
    await page.waitForLoadState('networkidle')
  })

  test('renders hero section with headline and CTAs', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Art that/i)
    await expect(page.locator('a', { hasText: 'Explore Collection' })).toBeVisible()
    await expect(page.locator('a', { hasText: 'Our Process' })).toBeVisible()
  })

  test('navbar is visible and links work', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('header a', { hasText: 'Fusion3D Labs' })).toBeVisible()
    await expect(page.locator('header a', { hasText: 'Shop' })).toBeVisible()
    await expect(page.locator('header a', { hasText: 'Studio' })).toBeVisible()

    // Navigate to shop
    await page.click('header a[href="/shop"]')
    await expect(page).toHaveURL('/shop')
  })

  test('Process section renders step 01 Design', async ({ page }) => {
    // Scroll past hero into the process section and wait for GSAP to settle
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5))
    await page.waitForTimeout(1500)
    // Step text is in the DOM (absolute positioned, may be CSS hidden until GSAP runs)
    // Just verify the element exists and is attached — GSAP controls visibility
    const designHeading = page.locator('h3', { hasText: 'Design' })
    await expect(designHeading).toBeAttached()
    await expect(page.locator('text=THE PROCESS')).toBeAttached()
  })

  test('Callout section is present', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6))
    await page.waitForTimeout(600)
    await expect(page.locator('text=Browse.')).toBeVisible()
  })

  test('Testimonials section renders all 3 cards', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(600)
    await expect(page.locator('blockquote')).toHaveCount(3)
  })

  test('dark/light mode toggle works', async ({ page }) => {
    const html = page.locator('html')
    const initialClass = await html.getAttribute('data-theme')
    await page.click('button[aria-label*="Switch to"]')
    await expect(html).not.toHaveAttribute('data-theme', initialClass ?? '')
  })

  test('no public navbar on admin routes', async ({ page }) => {
    await page.goto('/admin/login')
    await page.waitForLoadState('networkidle')
    // Public nav should NOT be present on admin pages
    await expect(page.locator('header nav a[href="/shop"]')).toHaveCount(0)
  })
})

import { test, expect } from '@playwright/test'

const LOCAL_EMAIL = 'admin@fusion3dlabs.com'
const LOCAL_PASSWORD = 'Lavesh_11'

/** Seed the Zustand persist store so admin pages work without backend */
async function seedLocalAuth(page: any) {
  await page.goto('/admin/login')
  await page.evaluate(() => {
    const store = {
      state: { token: 'local-dev-token', adminEmail: 'admin@fusion3dlabs.com' },
      version: 0,
    }
    localStorage.setItem('fusion3d-admin', JSON.stringify(store))
  })
}

test.describe('Admin Panel', () => {
  test('redirects unauthenticated users to login', async ({ page }) => {
    // Navigate first so localStorage is accessible
    await page.goto('/admin/login')
    await page.evaluate(() => localStorage.removeItem('fusion3d-admin'))
    await page.goto('/admin')
    await expect(page).toHaveURL('/admin/login')
  })

  test('login page renders correctly', async ({ page }) => {
    await page.goto('/admin/login')
    await expect(page.locator('h1', { hasText: 'Admin Sign In' })).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('logs in with local dev credentials', async ({ page }) => {
    await page.goto('/admin/login')
    await page.fill('input[type="email"]', LOCAL_EMAIL)
    await page.fill('input[type="password"]', LOCAL_PASSWORD)
    await page.click('button[type="submit"]')
    await page.waitForURL('/admin', { timeout: 5000 })
    await expect(page.locator('h1', { hasText: 'Dashboard' })).toBeVisible()
  })

  test('admin sidebar has correct navigation items', async ({ page }) => {
    await seedLocalAuth(page)
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('aside a', { hasText: 'Products' })).toBeVisible()
    await expect(page.locator('aside a', { hasText: 'Orders' })).toBeVisible()
    await expect(page.locator('aside a', { hasText: 'Bulk Inquiries' })).toBeVisible()
    await expect(page.locator('aside a', { hasText: '← View Site' })).toBeVisible()
  })

  test('admin logo navigates to homepage', async ({ page }) => {
    await seedLocalAuth(page)
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')

    await page.click('aside a[href="/"]')
    await expect(page).toHaveURL('/')
  })

  test('products page loads in local mode', async ({ page }) => {
    await seedLocalAuth(page)
    await page.goto('/admin/products')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('h1', { hasText: 'Products' })).toBeVisible()
    await expect(page.locator('text=local storage')).toBeVisible()
    await expect(page.locator('button', { hasText: 'Add Product' })).toBeVisible()
  })

  test('Add Product drawer opens and closes', async ({ page }) => {
    await seedLocalAuth(page)
    await page.goto('/admin/products')
    await page.waitForLoadState('networkidle')

    await page.locator('button:has-text("Add Product")').click({ force: true })
    await expect(page.locator('[data-testid="product-drawer"]')).toHaveAttribute('data-open', 'true')

    // Close via Escape key
    await page.keyboard.press('Escape')
    await expect(page.locator('[data-testid="product-drawer"]')).toHaveAttribute('data-open', 'false', { timeout: 8080 })
  })

  test('Add Product saves a product locally', async ({ page }) => {
    await seedLocalAuth(page)
    // Clear any previously saved products
    await page.evaluate(() => localStorage.removeItem('fusion3d-admin-products'))
    await page.goto('/admin/products')
    await page.waitForLoadState('networkidle')

    await page.click('button:has-text("Add Product")')
    await page.fill('input[placeholder*="Fractal Vase"]', 'Test Sculpture')
    await page.fill('input[placeholder="4999"]', '2999')
    await page.fill('input[placeholder="Sculpture"]', 'Sculpture')
    await page.click('button:has-text("Save Product")')

    await expect(page.locator('text=Product added locally!')).toBeVisible({ timeout: 5000 })
    await expect(page.locator('text=Test Sculpture')).toBeVisible()
  })

  test('sign out clears session and redirects to login', async ({ page }) => {
    await seedLocalAuth(page)
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')

    // Use evaluate to dispatch the click directly on the button element
    await page.evaluate(() => {
      const buttons = [...document.querySelectorAll('button')]
      const signOut = buttons.find(b => b.textContent?.trim() === 'Sign Out')
      signOut?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    })
    await page.waitForURL('/admin/login', { timeout: 8000 })
  })

  test('admin has no public navbar (shop/contact links)', async ({ page }) => {
    await page.goto('/admin/login')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('a[href="/shop"]')).toHaveCount(0)
    await expect(page.locator('a[href="/contact"]')).toHaveCount(0)
  })
})

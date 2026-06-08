import { expect, test } from '@playwright/test'

test.describe('frontend redirect', () => {
  test('redirects the root route to english homepage', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    await expect(page).toHaveURL('http://localhost:3000/en')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Middle Frontend Developer with React, Next.js, and CMS-driven websites.',
    )
  })
})

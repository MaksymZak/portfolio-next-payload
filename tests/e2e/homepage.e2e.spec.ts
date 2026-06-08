import { expect, test } from '@playwright/test'

const locales = [
  {
    locale: 'en',
    path: '/en',
    heroTitle: 'Middle Frontend Developer with React, Next.js, and CMS-driven websites.',
    commercialTitle: 'Commercial landing pages',
    projectsTitle: 'Selected projects',
    contactTitle: 'Get in touch',
    resumeCta: 'View resume',
    contactCta: 'Get in touch',
  },
  {
    locale: 'uk',
    path: '/uk',
    heroTitle: 'Middle Frontend Developer з React, Next.js та CMS-driven websites.',
    commercialTitle: 'Комерційні лендінги',
    projectsTitle: 'Обрані проєкти',
    contactTitle: 'Контакти',
    resumeCta: 'Переглянути резюме',
    contactCta: 'Зв’язатися',
  },
] as const

test.describe('homepage', () => {
  for (const localeConfig of locales) {
    test(`renders recruiter-scan homepage in ${localeConfig.locale}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${localeConfig.path}`)

      await expect(page.getByRole('heading', { level: 1 })).toHaveText(localeConfig.heroTitle)
      await expect(page.getByRole('button', { name: 'Editorial Light' })).toBeVisible()
      await expect(page.getByRole('link', { name: localeConfig.resumeCta })).toBeVisible()
      await expect(page.getByRole('link', { name: localeConfig.contactCta })).toBeVisible()

      await expect(page.getByRole('heading', { name: localeConfig.commercialTitle })).toBeVisible()
      await expect(page.getByRole('heading', { name: localeConfig.projectsTitle })).toBeVisible()
      await expect(page.getByRole('heading', { name: localeConfig.contactTitle })).toBeVisible()

      await expect(page.locator('[data-testid="selected-project-card"]')).toHaveCount(3)
      await expect(page.locator('[data-testid="commercial-proof-card"]')).toHaveCount(6)
      await expect(page.locator('[data-testid="selected-project-card-link"]')).toHaveCount(1)
    })
  }

  test('jumps to contact and persists theme choice', async ({ page }) => {
    await page.goto('http://localhost:3000/en')

    await page.getByRole('link', { name: 'Get in touch' }).click()
    await expect(page).toHaveURL(/#contact$/)
    await expect(page.locator('#contact')).toBeInViewport()

    await page.getByRole('button', { name: 'Graphite Dark' }).click()
    await expect
      .poll(async () => page.evaluate(() => document.documentElement.dataset.theme))
      .toBe('dark')

    await page.reload()

    await expect
      .poll(async () => page.evaluate(() => document.documentElement.dataset.theme))
      .toBe('dark')
  })
})

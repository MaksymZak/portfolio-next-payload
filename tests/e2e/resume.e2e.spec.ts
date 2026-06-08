import { expect, test } from '@playwright/test'

const resumeLocales = [
  {
    path: '/en/resume',
    title: 'Maksym Zakaliuzhnyi',
    printButton: 'Print resume',
    sections: ['Positioning summary', 'Core skills', 'Experience summary', 'Selected projects', 'Contacts'],
  },
  {
    path: '/uk/resume',
    title: 'Максим Закалюжний',
    printButton: 'Друкувати резюме',
    sections: ['Позиціонування', 'Ключові навички', 'Досвід', 'Обрані проєкти', 'Контакти'],
  },
] as const

test.describe('resume pages', () => {
  for (const localeConfig of resumeLocales) {
    test(`renders compact resume for ${localeConfig.path}`, async ({ page }) => {
      await page.goto(`http://localhost:3000${localeConfig.path}`)

      await expect(page.getByRole('heading', { level: 1 })).toHaveText(localeConfig.title)
      await expect(page.getByRole('button', { name: localeConfig.printButton })).toBeVisible()

      for (const sectionTitle of localeConfig.sections) {
        await expect(page.getByRole('heading', { name: sectionTitle })).toBeVisible()
      }
    })
  }

  test('hides shell chrome in print mode', async ({ page }) => {
    await page.goto('http://localhost:3000/en/resume')

    await expect(page.locator('.portfolio-header')).toBeVisible()
    await expect(page.locator('[data-testid="print-resume-button"]')).toBeVisible()

    await page.emulateMedia({ media: 'print' })

    await expect(page.locator('.portfolio-header')).toBeHidden()
    await expect(page.locator('.portfolio-footer')).toBeHidden()
    await expect(page.locator('[data-testid="print-resume-button"]')).toBeHidden()
  })
})

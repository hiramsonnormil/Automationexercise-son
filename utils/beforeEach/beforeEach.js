import test from '@playwright/test';
import process from 'node:process';

export async function SetupBeforeach() {
  test.beforeEach(async ({ page }) => {
  await page.goto(`${process.env.SITE}`);
  await page.waitForLoadState("load")
});
}

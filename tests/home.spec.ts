import { test, expect } from '@playwright/test';

test('ページの表示テスト', async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/最初のページ/);
    await expect(page.getByRole('heading')).toHaveText(/Playwright ハンズオン/);
    await expect(page.getByRole('button', {name: '操作ボタン'})).toBeVisible();
});

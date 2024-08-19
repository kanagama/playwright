import { test, expect } from '@playwright/test';

test('フォーム画面への遷移', async ({page}) => {
    await page.goto('/')
    await page.getByRole('link', {name: '入力フォーム'}).click();

    await expect(page.getByRole('heading', {name: '入力フォーム'})).toBeVisible();
    await expect(page).toHaveURL('/form');
});

test('フォーム操作のテスト', async ({page}) => {
    await page.goto('/form');
    await page.getByRole('textbox', {name: /一人目/}).fill('項羽');
    await page.getByRole('textbox', {name: /二人目/}).fill('劉邦');
    await page.getByRole('button', {name: /シャッフル/}).click();
    await expect(page.getByRole('status', {name: /結果/})).toHaveText(/(項羽→劉邦)|(劉邦→項羽)/);
});

test('フォーム操作のテスト（サーバーモック）', async ({page}) => {
    await page.route('/api/shuffle', async route => {
        const json = [{members: ['張飛', '関羽', '劉備',]}];
        await route.fulfill({json});
    });

    await page.goto('/form');
    await page.getByRole('textbox', {name: /一人目/}).fill('劉備');
    await page.getByRole('textbox', {name: /二人目/}).fill('関羽');
    await page.getByRole('textbox', {name: /三人目/}).fill('張飛');
    await page.getByRole('button', {name: /シャッフル/}).click();
    await expect(page.getByRole('status', {name: /結果/})).toHaveText(/張飛→関羽→劉備/);
});

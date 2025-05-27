import { test, expect } from "@playwright/test";

const baseUrl = process.env.NEXT_PUBLIC_TEST_URL || "http://localhost:3000";

test.describe("Ambyint Movie list App E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });
  test.describe("Homepage", () => {
    test("should show at least one movie card with poster and title", async ({
      page,
    }) => {
      const cards = page.getByTestId("movie-card");
      const count = await cards.count();
      await page.waitForTimeout(1000);
      expect(count).toBeGreaterThan(0);

      await expect(cards.first().locator("h2")).toBeVisible();
      await expect(cards.first().locator("img")).toBeVisible();
    });
  });

  test.describe("Pagination & Navigation", () => {
    test('clicking "Load more" increases movie cards count', async ({
      page,
    }) => {
      const cards = page.getByTestId("movie-card");
      const initialCount = await cards.count();

      await page.getByRole("button", { name: /load more/i }).click();
      await page.waitForTimeout(2000);
      const newCards = page.getByTestId("movie-card");
      const newCount = await newCards.count();

      expect(newCount).toBeGreaterThan(initialCount);
    });

    test("clicking a movie navigates to detail page and titles match", async ({
      page,
    }) => {
      const firstCard = page.getByTestId("movie-card").first();
      const titleOnGrid = await firstCard.locator("h2").innerText();

      await firstCard.click();
      await expect(page).toHaveURL(/\/movie\/\d+$/);

      const titleOnDetail = await page.locator("h1").innerText();
      expect(titleOnDetail).toBe(titleOnGrid);
    });
  });
});

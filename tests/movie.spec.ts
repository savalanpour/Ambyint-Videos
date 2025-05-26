import { test, expect } from "@playwright/test";

test.describe("Ambyint Movie list App E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });
  test.describe("Homepage", () => {
    test("should show at least one movie card with poster and title", async ({
      page,
    }) => {
      const cards = page.getByTestId("movie-card");
      const count = await cards.count();
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

  test.describe("Movie Details Page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3000/movie/550");
      await expect(page).toHaveURL(/\/movie\/550$/);
    });

    test("should display movie title, overview, duration and genres", async ({
      page,
    }) => {
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.getByText("Duration:")).toBeVisible();
      await expect(page.getByText("Genres:")).toBeVisible();
    });

    test("should display Top Actors section with at least one actor", async ({
      page,
    }) => {
      const section = page.locator("h2", { hasText: "Top Actors" });
      await expect(section).toBeVisible();

      const actorImages = section.locator("..").locator("img");
      const actorCount = await actorImages.count();
      expect(actorCount).toBeGreaterThan(0);
    });

    test("should display Production Companies section", async ({
      page,
    }) => {
      const section = page.locator("h2", { hasText: "Production Companies" });
      await expect(section).toBeVisible();
    });
  });
});

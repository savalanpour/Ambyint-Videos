import { test, expect } from "@playwright/test";

test.describe("Ambyint Movie Details Page E2E", () => {
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

  test("should display Production Companies section", async ({ page }) => {
    const section = page.locator("h2", { hasText: "Production Companies" });
    await expect(section).toBeVisible();
  });
});

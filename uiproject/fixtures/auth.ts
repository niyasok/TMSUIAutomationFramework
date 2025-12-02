import { Page, test as baseTest, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export interface AuthFixtures {
  authenticatedPage: Page;
  standardUser: Page;
  performanceUser: Page;
}

export const test = baseTest.extend<AuthFixtures>({
  
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("validUser");
    await use(page);
  },

  standardUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("validUser");
    await use(page);
  },

  performanceUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("performanceGlitchUser");
    await use(page);
  },
});


import { Page, test as baseTest, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { AuthFixtures } from "./auth";
import { CustomerPage } from "uiproject/pages/CustomerPage";
import { ProductPage } from "uiproject/pages/ProductPage";
import { CheckoutPage } from "uiproject/pages/CheckoutPage";

export interface PomFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  customerPage: CustomerPage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: AuthFixtures["authenticatedPage"];
}

export const test = baseTest.extend<PomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  inventoryPage: async ({ authenticatedPage }, use) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await use(inventoryPage);
  },

  customerPage: async ({ page }, use) => {
    const customerPage = new CustomerPage(page);
    await use(customerPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

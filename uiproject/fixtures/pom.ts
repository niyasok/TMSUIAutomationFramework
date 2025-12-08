import { Page, test as baseTest, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CustomerPage } from "uiproject/pages/CustomerPage";
import { ProductPage } from "uiproject/pages/ProductPage";
import { CheckoutPage } from "uiproject/pages/CheckoutPage";
import { ExcelWriter } from "../../utils/ExcelWriter";

// import JSON data (tsconfig.json already has resolveJsonModule: true)
import productEansData from "../test-data/qa/products.json";

export interface PomFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  customerPage: CustomerPage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
  productEans: string[];
  excelWriter: ExcelWriter;
}

export const test = baseTest.extend<PomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
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

  // NEW fixture to provide the array of EANs to tests
  productEans: async ({}, use) => {
    await use(productEansData as string[]);
  },

  excelWriter: async ({}, use) => {
    const excelWriter = new ExcelWriter();
    await use(excelWriter);
    // Write to file after test completes
    await excelWriter.write();
  },
});


import { Page, test as baseTest, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
// import { InventoryPage } from "../pages/InventoryPage";
import { CustomerPage } from "uiproject/pages/CustomerPage";
import { ProductPage } from "uiproject/pages/ProductPage";
import { CheckoutPage } from "uiproject/pages/CheckoutPage";
import { ExcelWriter } from "../../utils/ExcelWriter";
import { MultiProductPage } from "../pages/MultiProductPage";
//import { loadEANsFromExcel } from "../../utils/excelReader";
import { loadEANRowsFromExcel } from "../../utils/excelReader";

// import JSON data (tsconfig.json already has resolveJsonModule: true)
import productEansData from "../test-data/qa/products.json";

export interface PomFixtures {
  loginPage: LoginPage;
  // inventoryPage: InventoryPage;
  customerPage: CustomerPage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
  productEans: string[];
  excelWriter: ExcelWriter;
 // excelProductEans: { ean: string; qty: string }[];   // NEW
 excelProductGroups: { ean: string; qty: string }[][]; // groups of rows
  multiProductPage: MultiProductPage;                 // NEW
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

  // JSON‑based EANs
  productEans: async ({}, use) => {
    await use(productEansData as string[]);
  },

  // NEW fixture for MultiProductPage
  multiProductPage: async ({ page }, use) => {
    const multiProductPage = new MultiProductPage(page);
    await use(multiProductPage);
  },

  // Excel‑based EANs
  // excelProductEans: async ({}, use) => {
  //   // Use relative path from project root
  //   const eans = loadEANsFromExcel(
  //     "uiproject/test-data/qa/eans.xlsx",
  //     "Sheet1"
  //   );
  //   await use(eans);
  // },

  excelProductGroups: async ({}, use) => { 
    const eanGroups = loadEANRowsFromExcel( "uiproject/test-data/qa/eans.xlsx", "Sheet1" ); 
    await use(eanGroups); },

  excelWriter: async ({}, use) => {
  const excelWriter = new ExcelWriter();

  // Clear any previous run data before the test(s) start
  try {
    excelWriter.clear(); // ✅ use clear() instead of clearFile()
  } catch (e) {
    console.warn("Could not clear ExcelWriter data before run:", e);
  }

  // Provide the writer to the test
  await use(excelWriter);

  // After test completes, write grouped mappings to Excel
  await excelWriter.write();


  },
});

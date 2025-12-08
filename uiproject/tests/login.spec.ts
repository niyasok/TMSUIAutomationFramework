import { test, expect } from "../fixtures/BaseTest";

test.describe("TMS ATG Order Creation Functionality", () => {
  test("successful login with user and store", async ({
    loginPage,
    customerPage,
    productPage,
    checkoutPage,
  }) => {
    await loginPage.login("validUser");
    await expect(await loginPage.validateStoreCodePage()).toBeVisible();

    await loginPage.storeLocation("1162");
    await expect(await loginPage.validateHomePage()).toBeVisible();

    await customerPage.findCustomer("1003066575");
    await expect(await customerPage.customerDetailPage()).toBeVisible();

    await productPage.addProductByEAN("03276167", "1");

    await checkoutPage.proceedToCheckout("000"); // CVC code
  });

 
});

import { test, expect } from "../fixtures/BaseTest";

test.describe("TMS ATG Order Creation Functionality", () => {
  test("successful login with user and store", async ({
    loginPage,
    customerPage,
    productPage,
    checkoutPage,
    productEans, // NEW
    excelWriter,
  }) => {
    await loginPage.login("validUser");
    await expect(await loginPage.validateStoreCodePage()).toBeVisible();

    await loginPage.storeLocation("1162");
    await expect(await loginPage.validateHomePage()).toBeVisible();

    await customerPage.findCustomer("1003066575");
    await expect(await customerPage.customerDetailPage()).toBeVisible();

    // Loop through all product EANs and add each product (quantity "1")
    for (const ean of productEans) {
      await productPage.addProductByEAN(ean, "1");
      const orderId = await checkoutPage.proceedToCheckout("000"); // CVC code

      excelWriter.addMapping(ean, orderId);
      console.log(`Product EAN: ${ean}, Order ID: ${orderId}`);
    }
  });
});

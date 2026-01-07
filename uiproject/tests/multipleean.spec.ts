import { test, expect } from "../fixtures/BaseTest";
import { loadOrderData } from "../../utils/testDataLoader";
import { MultiProductPage } from "../pages/MultiProductPage";

test.describe("TMS ATG Order Creation Functionality", () => {
  test("successful login with user and store, add multiple EANs in one order", async ({
    loginPage,
    customerPage,
    checkoutPage,
    excelWriter,
    page,
  }) => {
    const orderData = loadOrderData();
    const { storeCode, customerNumber, checkoutCode } = orderData;

    // --- Login & store selection ---
    await loginPage.login("validUser");
    await expect(await loginPage.validateStoreCodePage()).toBeVisible();
    await loginPage.storeLocation(storeCode);
    await expect(await loginPage.validateHomePage()).toBeVisible();

    // --- Customer search ---
    await customerPage.findCustomer(customerNumber);
    await expect(await customerPage.customerDetailPage()).toBeVisible();

    // --- Multiple EANs to add ---
    const eans = [
      { ean: "04030423", qty: "1" },
      { ean: "03276167", qty: "1" },
    ];

    // --- Add all products to basket ---
    const multiProductPage = new MultiProductPage(page);
    await multiProductPage.addProductsByEAN(eans);

    // --- Transition to basket ---
    // Click the correct active Add to basket button (not the disabled submit)
    

    // --- Checkout once ---
    const orderId = await checkoutPage.proceedToCheckout(checkoutCode);

    // --- Map each EAN to the same orderId ---
    for (const { ean } of eans) {
      excelWriter.addMapping(ean, orderId);
      console.log(`Product EAN: ${ean}, Order ID: ${orderId}`);
    }
  });
});

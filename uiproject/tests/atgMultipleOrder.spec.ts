import { test, expect } from "../fixtures/BaseTest";
import { loadOrderData } from "../../utils/testDataLoader";
test("TMS ATG Order Creation Functionality", async ({
  loginPage,
  customerPage,
  checkoutPage,
  multiProductPage,
  excelProductGroups,
  excelWriter,
}) => {
  //Load JSON test data
  const orderData = loadOrderData();
  const { storeCode, customerNumber, checkoutCode } = orderData;

  await loginPage.login("validUser");
  await expect(await loginPage.validateStoreCodePage()).toBeVisible();

  await loginPage.storeLocation(storeCode);
  await expect(await loginPage.validateHomePage()).toBeVisible();

  await customerPage.findCustomer(customerNumber);
  await expect(await customerPage.customerDetailPage()).toBeVisible();

  //Loop through each row (order)
  for (const group of excelProductGroups) {
    await multiProductPage.addProductsByEAN(group);
    const orderId = await checkoutPage.proceedToCheckout(checkoutCode);

    for (const { ean } of group) {
      excelWriter.addMapping(ean, orderId);
      console.log(`Order ID: ${orderId}, Product EAN: ${ean}, Qty: 1`);
    }
  }
});

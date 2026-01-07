import { test, expect } from "../fixtures/BaseTest";
import { loadOrderData } from "../../utils/testDataLoader"; 
test("order with Excel EANs", async ({
  loginPage,
  customerPage,
  checkoutPage,
  multiProductPage,
  
  excelProductGroups, // injected by fixture
  excelWriter,
}) => {
  // 🔹 Load JSON test data
    const orderData = loadOrderData();
    const { storeCode, customerNumber, checkoutCode } = orderData;

    // --- Login ---
    await loginPage.login("validUser");
    await expect(await loginPage.validateStoreCodePage()).toBeVisible();

    // --- Store selection ---
    await loginPage.storeLocation(storeCode);
    await expect(await loginPage.validateHomePage()).toBeVisible();

    // --- Customer search ---
    await customerPage.findCustomer(customerNumber);
    await expect(await customerPage.customerDetailPage()).toBeVisible();

  

  // --- Loop through each row (order) --- 
   for (const group of excelProductGroups) { 
    await multiProductPage.addProductsByEAN(group); 
    const orderId = await checkoutPage.proceedToCheckout(checkoutCode); 
    // for (const { ean } of group) { 
    //     excelWriter.addMapping(ean, orderId); 
    //     console.log(`Order ID: ${orderId}, Product EAN: ${ean}, Qty: 1`);

    for (const { ean } of group) {
         excelWriter.addMapping(ean, orderId); 
         console.log(`Order ID: ${orderId}, Product EAN: ${ean}, Qty: 1`);

  }
}
});

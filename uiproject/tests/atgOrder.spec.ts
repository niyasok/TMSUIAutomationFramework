import { test, expect } from "../fixtures/BaseTest";
import { OrderSummaryPage } from "../pages/OrderSummaryPage";
import { saveOrderData } from "../../utils/orderUtils";
import { loadOrderData } from "../../utils/testDataLoader";

const testData = loadOrderData();

test.describe("TMS ATG Order Creation Functionality", () => {
  test("successful login with user and store", async ({
    loginPage,
    customerPage,
    productPage,
    page,
  }) => {
    await loginPage.login("validUser");
    await expect(await loginPage.validateStoreCodePage()).toBeVisible();

    await loginPage.storeLocation(testData.storeCode);
    await expect(await loginPage.validateHomePage()).toBeVisible();

    await customerPage.findCustomer(testData.customerNumber);
    await expect(await customerPage.customerDetailPage()).toBeVisible();

    await productPage.addProductByEAN(testData.ean, testData.quantity);

    const orderSummaryPage = new OrderSummaryPage(page);
    const orderNo = await orderSummaryPage.proceedToCheckout(
      testData.checkoutCode,
      testData.ean
    );

    saveOrderData(orderNo, testData.ean, false);
  });
});

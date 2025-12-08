import test, { expect, Page } from "@playwright/test";
import { BasePageUI } from "../pages/BasePageUI";

export class CheckoutPage extends BasePageUI {
  private readonly baseUrl = this.uiBaseURL;
  // Selectors
  private readonly productsNavBar = ".js-search-product";
  private readonly proceedToCheckoutBtn = '[data-action="proceedToCheckout"]';
  private readonly creditcardCvcInput = '[id="cvc"]';
  private readonly payAndPlaceOrderBtn = '[data-action="payAndPlaceOrder"]';
  private readonly orderId = '[id="sapOrderId"]';
  private readonly finishWithThisOrderBtn = '[value="Finish with this order"]';

  constructor(page: Page) {
    super(page);
  }

  async proceedToCheckout(cvcNo: string) {
    // await this.page.locator(this.proceedToCheckoutBtn).first().isVisible();
    await this.page.locator(this.proceedToCheckoutBtn).first().click();

    await this.page
      .locator(this.creditcardCvcInput)
      .waitFor({ state: "visible", timeout: 50000 });
    await this.page.fill(this.creditcardCvcInput, cvcNo);

    await this.page.locator(this.payAndPlaceOrderBtn).first().click();

    // expect(await this.page.locator(this.orderId).isVisible());
    // let orderNo = await this.page.locator(this.orderId).innerText();

    await this.page.locator(this.orderId).waitFor({ state: "visible" });
    const orderNo = await this.page.locator(this.orderId).innerText();

    console.log("Order ID is: ", orderNo);
    await this.page.locator(this.finishWithThisOrderBtn).click();

    return orderNo;
  }

  async productDetailPage() {
    return this.page.locator(this.productsNavBar);
  }
}

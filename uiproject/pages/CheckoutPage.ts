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
  private readonly giftCardOption = "[.js-modal.js-giftcard-link]";
  private readonly giftCardNumber = "[.input-text.form-medium.js-enables]";
  private readonly giftCardPin = ".input-text.form-small.js-enables";
  private readonly checkBalanceBtn = "[.btn.btn-tertiary.js-check-balance]";
  private readonly applyGiftCardBtn = "[.btn.btn-primary.js-gift-card-btn]";
  constructor(page: Page) {
    super(page);
  }

  async proceedToCheckout(cvcNo: string) {
    // await this.page.locator(this.proceedToCheckoutBtn).first().isVisible();
    await this.page.locator(this.proceedToCheckoutBtn).first().click();

    await this.page.locator(this.creditcardCvcInput).first().click();
    while (await this.page.locator(".loader-overlay-text").isVisible()) {
      await this.page.waitForTimeout(5000);
    }
    await this.page.fill(this.creditcardCvcInput, cvcNo);

    await this.page.locator(this.payAndPlaceOrderBtn).first().click();

    while (await this.page.locator(".loader-overlay-text").isVisible()) {
      await this.page.waitForTimeout(5000);
    }
    const orderNo = await this.page.locator(this.orderId).innerText();

    console.log("Order ID is: ", orderNo);
    await this.page.locator(this.finishWithThisOrderBtn).click();

    return orderNo;
  }

  async productDetailPage() {
    return this.page.locator(this.productsNavBar);
  }

  // Make sure these selectors are strings, not arrays

  async useGiftCard(giftCardNo: string, giftCardPin: string) {
    await this.page.locator(this.giftCardOption).click();

    await this.page.fill(this.giftCardNumber, giftCardNo);

    await this.page.fill(this.giftCardPin, giftCardPin);

    await this.page.locator(this.checkBalanceBtn).click();

    await this.page.locator(this.applyGiftCardBtn).click();
    await this.page.locator(this.payAndPlaceOrderBtn).first().click();
    let orderNo = await this.page.locator(this.orderId).innerText();
    console.log("Order ID is: ", orderNo);
    await this.page.locator(this.finishWithThisOrderBtn).click();
  }
}

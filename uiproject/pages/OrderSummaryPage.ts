import { Page } from "@playwright/test";
import { BasePageUI } from "../pages/BasePageUI";
import fs from "fs";

export class OrderSummaryPage extends BasePageUI {
  private readonly productsNavBar = ".js-search-product";
  private readonly productsTab = "//a[@data-title='Products'][@role]";
  private readonly eanNoInput = "#ean1";
  private readonly eanQtyInput = '[name="ean1qty"]';

  private readonly homeDelivery = '//input[@value="homeDelivery"]';
  private readonly legend = "//legend";

  private readonly addToBasketBtn = '[value="Add to basket"]';
  private readonly proceedToBasketBtn = "#proceed-basket";
  private readonly proceedToCheckoutBtn = '[data-action="proceedToCheckout"]';
  private readonly creditcardCvcInput = "#cvc";

  private readonly payAndPlaceOrderBtn = '[data-action="payAndPlaceOrder"]';
  private readonly orderId = "#sapOrderId";
  private readonly finishWithThisOrderBtn = '[value="Finish with this order"]';

  private readonly giftCardOption = ".js-modal.js-giftcard-link";
  private readonly giftCardNumber = ".input-text.form-medium.js-enables";
  private readonly giftCardPin = ".input-text.form-small.js-enables";
  private readonly checkBalanceBtn = ".btn.btn-tertiary.js-check-balance";
  private readonly applyGiftCardBtn = ".btn.btn-primary.js-gift-card-btn";

  constructor(page: Page) {
    super(page);
  }

  /**
   * Proceed to checkout, place the order, and return the order ID.
   * Also writes orderId + ean into order.json.
   */
  async proceedToCheckout(cvcNo: string, eanUsed: string): Promise<string> {
    await this.page.locator(this.proceedToCheckoutBtn).first().click();
    await this.page.fill(this.creditcardCvcInput, cvcNo);
    await this.page.locator(this.payAndPlaceOrderBtn).first().click();

    const orderNo = await this.page.locator(this.orderId).innerText();
    console.log("Order ID is:", orderNo);

    // Write JSON file with orderId + EAN
    const data = {
      orderId: orderNo,
      ean: eanUsed,
      timestamp: new Date().toISOString(),
    };

    // Overwrite each run
    fs.writeFileSync("order.json", JSON.stringify(data, null, 2));

    // If you want to append instead of overwrite, uncomment:
    /*
    let existing: any[] = [];
    if (fs.existsSync("order.json")) {
      existing = JSON.parse(fs.readFileSync("order.json", "utf-8"));
    }
    existing.push(data);
    fs.writeFileSync("order.json", JSON.stringify(existing, null, 2));
    */

    await this.page.locator(this.finishWithThisOrderBtn).click();
    return orderNo;
  }

  async productDetailPage() {
    return this.page.locator(this.productsNavBar);
  }

  async useGiftCard(giftCardNo: string, giftCardPin: string): Promise<string> {
    await this.page.locator(this.giftCardOption).click();
    await this.page.fill(this.giftCardNumber, giftCardNo);
    await this.page.fill(this.giftCardPin, giftCardPin);
    await this.page.locator(this.checkBalanceBtn).click();
    await this.page.locator(this.applyGiftCardBtn).click();
    await this.page.locator(this.payAndPlaceOrderBtn).first().click();

    const orderNo = await this.page.locator(this.orderId).innerText();
    console.log("Order ID is:", orderNo);

    await this.page.locator(this.finishWithThisOrderBtn).click();
    return orderNo;
  }
}

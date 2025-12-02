import test, { expect, Page } from "@playwright/test";
import { BasePageUI } from "../pages/BasePageUI";
import { readJsonFile } from "../../utils/DataReader";

export class CheckoutPage extends BasePageUI {
  private readonly baseUrl = this.uiBaseURL;
  // Selectors
  private readonly productsNavBar = ".js-search-product";
  private readonly productsTab = "//a[@data-title='Products'][@role]";
  private readonly eanNoInput = '[id="ean1"]';
  private readonly eanQtyInput = '[name="ean1qty"]';

  private readonly homeDelivery = '//input[@value="homeDelivery"]';
  private readonly legend = "//legend";

  private readonly addToBasketBtn = '[value="Add to basket"]';
  private readonly proceedToBasketBtn = '[id="proceed-basket"]';
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
    await this.page.fill(this.creditcardCvcInput, cvcNo);
    await this.page.locator(this.payAndPlaceOrderBtn).first().click();
    let orderNo = await this.page.locator(this.orderId).innerText();
    console.log("Order ID is: ", orderNo);
    await this.page.locator(this.finishWithThisOrderBtn).click();
  }

  async productDetailPage() {
    return this.page.locator(this.productsNavBar);
  }
}

import test, { expect, Page } from "@playwright/test";
import { BasePageUI } from "../pages/BasePageUI";

export class MultiProductPage extends BasePageUI {
  private readonly baseUrl = this.uiBaseURL;
  // Selectors
  private readonly productsNavBar = ".js-search-product";
  private readonly productsTab = "//a[@data-title='Products'][@role]";
  private readonly legend = "//legend";
  private readonly addToBasketBtn = '[value="Add to basket"]';
  private readonly proceedToBasketBtn = '[id="proceed-basket"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Add multiple products by filling EAN inputs dynamically.
   * @param eans Array of objects: { ean: string, qty: string }
   */
  async addProductsByEAN(eans: { ean: string; qty: string }[]) {
    await this.page.locator(this.productsNavBar).click();
    await this.page.locator(this.productsTab).click();

    // Loop through each EAN entry
    for (let i = 0; i < eans.length; i++) {
      const { ean, qty } = eans[i];

      const eanInput = `[id="ean${i + 1}"]`;
      const qtyInput = `[name="ean${i + 1}qty"]`;

      await this.page.waitForSelector(eanInput, { state: "visible" });
      await this.page.fill(eanInput, ean);
      await this.page.fill(qtyInput, qty);
    }

    await this.page.locator(this.legend).click();

    await this.page.locator(this.addToBasketBtn).click();
    await this.page.locator(this.proceedToBasketBtn).click();
  }

  async productDetailPage() {
    return this.page.locator(this.productsNavBar);
  }
}

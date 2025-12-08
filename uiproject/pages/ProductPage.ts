import test, { expect, Page } from "@playwright/test";
import { BasePageUI } from "../pages/BasePageUI";

export class ProductPage extends BasePageUI {
  private readonly baseUrl = this.uiBaseURL;
  // Selectors
  private readonly productsNavBar = ".js-search-product";
  private readonly productsTab = "//a[@data-title='Products'][@role]";
  private readonly eanNoInput = '[id="ean1"]';
  private readonly eanQtyInput = '[name="ean1qty"]';
  private readonly legend = "//legend";
  private readonly addToBasketBtn = '[value="Add to basket"]';
  private readonly proceedToBasketBtn = '[id="proceed-basket"]';

  constructor(page: Page) {
    super(page);
  }

  async addProductByEAN(eanNo: string, quantity: string) {
    await this.page.locator(this.productsNavBar).click();

    // await this.page.waitForSelector(this.productsNavBar, {
    //   state: "visible",
    //   timeout: 30000, // 30 seconds
    // });
    await this.page.locator(this.productsTab).click();
    await this.page.waitForSelector(this.eanNoInput, { state: "visible" });

    await this.page.fill(this.eanNoInput, eanNo);
    await this.page.fill(this.eanQtyInput, quantity);
    await this.page.locator(this.legend).click();
    await this.page.locator(this.addToBasketBtn).click();
    await this.page.locator(this.proceedToBasketBtn).click();
  }

  async productDetailPage() {
    return this.page.locator(this.productsNavBar);
  }
}

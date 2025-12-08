import { expect, Page } from "@playwright/test";
import { BasePageUI } from "../pages/BasePageUI";

export class CustomerPage extends BasePageUI {
  private readonly customerBar = '[data-title="Customers"]';
  private readonly customerNoInput = '[id="customernumber"]';
  private readonly customerFindBtn = '//input[@data-title="Customers"]';
  private readonly customerAccDetails =
    '//h3[contains(text(), "Account details")]';

  constructor(page: Page) {
    super(page);
  }

  async findCustomer(customerNo: string) {
    await this.page.locator(this.customerBar).click();

    await this.page.fill(this.customerNoInput, customerNo);
    await this.page.locator(this.customerFindBtn).click();
  }

  async customerDetailPage() {
    return this.page.locator(this.customerAccDetails);
  }
}

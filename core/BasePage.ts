import { Page, expect } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async getElementText(selector: string) {
    return await this.page.textContent(selector);
  }

  async isElementVisible(selector: string) {
    return await this.page.isVisible(selector);
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async expectUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }
}

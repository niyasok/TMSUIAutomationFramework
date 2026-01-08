import { expect, Page } from "@playwright/test";
import { BasePageUI } from "../pages/BasePageUI";
import { readJsonFile } from "../../utils/DataReader";

export class LoginPage extends BasePageUI {
  private readonly baseUrl = this.uiBaseURL;
  // Selectors
  private readonly usernameInput = '[id="user"]';
  private readonly passwordInput = '[id="pwd"]';
  private readonly loginButton = '//input[@type="submit"]';
  private readonly errorMessage = '[data-test="error"]';
  private readonly storeCodeInput = '[id="location"]';
  private readonly confirmLocationBtn = '[id="confirmLocation"]';
  private readonly continueBtn =
    '//input[contains(@class,"location-continue" )]';
  private readonly finishUser = '[id="finish-dropdown"]';

  private data: any;

  constructor(page: Page) {
    super(page);
    console.log(this.baseUrl);
  }

  async goto() {
    await this.page.goto(this.baseUrl);
  }

  async enterUsername(username: string) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async login(usertype: string) {
    this.data = readJsonFile(`uiproject/test-data/${this.env}/loginData.json`);
    const user = this.data[usertype];
    await this.enterUsername(user.username);
    await this.enterPassword(user.password);
    await this.clickLoginButton();
  }

  async validateStoreCodePage() {
    // await this.page.waitForLoadState("networkidle"); // waits until network is idle
    return this.page.locator(this.storeCodeInput);
  }

  async storeLocation(storeCode: string) {
    await this.page.fill(this.storeCodeInput, storeCode);
    await this.page.click(this.confirmLocationBtn);
    await this.page.click(this.continueBtn);
  }

  async validateHomePage() {
    // await this.page.waitForLoadState("networkidle"); // waits until network is idle
    return this.page.locator(this.finishUser);
  }

  async getErrorMessage() {
    await this.waitForElement(this.errorMessage);
    return this.getElementText(this.errorMessage);
  }

  async expectErrorMessage() {
    return this.page.locator(this.errorMessage);
  }
}

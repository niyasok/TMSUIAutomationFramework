import { Page, expect } from "@playwright/test";
import { readJsonFile } from "../../utils/DataReader";
import { BasePage } from "../../core/BasePage";

export class BasePageUI extends BasePage {
  protected env: string;
  protected uiBaseURL: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.env = (process.env.ENV || "dev").toLowerCase();
    const envConfig = readJsonFile(
      `uiproject/config/env.${this.env}.json`,
    );
    this.uiBaseURL = envConfig.uiBaseURL;
    console.log("running in...", this.env, "environment");
  }

}
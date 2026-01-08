import { defineConfig } from "@playwright/test";

const DEFAULT_ENV = "qa";
const ENV = process.env.ENV || DEFAULT_ENV;
process.env.ENV = ENV;

export default defineConfig({
  timeout: 600000,
  use: {
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    trace: "on",
  },
  reporter: [["list"], ["allure-playwright"], ["html", { open: "never" }]],

  outputDir: "test-results/",
});

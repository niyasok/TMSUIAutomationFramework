import { Page } from "@playwright/test";
import { BasePageUI } from "uiproject/pages/BasePageUI";

export class InventoryPage extends BasePageUI {
  // Selectors
  private readonly addToCartButtonPrefix = '[data-test="add-to-cart-';
  private readonly removeButtonPrefix = '[data-test="remove-';
  private readonly cartBadge = ".shopping_cart_badge";
  private readonly cartLink = ".shopping_cart_link";
  private readonly inventoryItem = ".inventory_item";
  private readonly inventoryItemName = ".inventory_item_name";
  private readonly inventoryItemPrice = ".inventory_item_price";

  constructor(page: Page) {
    super(page);
  }

  async addToCart(productName: string) {
    await this.page.click(`${this.addToCartButtonPrefix}${productName}"]`);
  }

  async removeFromCart(productName: string) {
    await this.page.click(`${this.removeButtonPrefix}${productName}"]`);
  }

  async openCart() {
    await this.page.click(this.cartLink);
  }

  async getCartCount() {
    const badge = this.page.locator(this.cartBadge);
    if ((await badge.count()) === 0) return "0";
    return (await badge.textContent()) || "0";
  }

  async getCartBadgeVisibility() {
    const badge = this.page.locator(this.cartBadge);
    return (await badge.count()) > 0 && (await badge.isVisible());
  }

  async getProductPrice(productName: string) {
    const product = this.page
      .locator(this.inventoryItem)
      .filter({ hasText: productName });
    return await product.locator(this.inventoryItemPrice).textContent();
  }

  async getButtonState(productName: string) {
    const addButton = this.page.locator(
      `${this.addToCartButtonPrefix}${productName}"]`,
    );
    const removeButton = this.page.locator(
      `${this.removeButtonPrefix}${productName}"]`,
    );
    const isAddVisible =
      (await addButton.count()) > 0 && (await addButton.isVisible());
    const isRemoveVisible =
      (await removeButton.count()) > 0 && (await removeButton.isVisible());
    return {
      isAddVisible,
      isRemoveVisible,
    };
  }
  async isInventoryPageVisible() {
    return await this.isElementVisible(this.inventoryItem);
  }
}

// import { test, expect } from "../../fixtures/BaseTest";

//     const productName = "sauce-labs-backpack";

// test.describe("Add Single Product to Cart", () => {
//   test("should add single product to cart successfully", async ({
//     authenticatedPage,inventoryPage
//   }) => {

//     // Verify initial state
//     expect(await inventoryPage.getCartBadgeVisibility()).toBe(false);

//     // Get initial button state
//     const initialState = await inventoryPage.getButtonState(productName);
//     expect(initialState.isAddVisible).toBe(true);
//     expect(initialState.isRemoveVisible).toBe(false);

//     // Add product to cart
//     await inventoryPage.addToCart(productName);

//     // Verify cart badge
//     expect(await inventoryPage.getCartBadgeVisibility()).toBe(true);
//     expect(await inventoryPage.getCartCount()).toBe("1");

//     // Verify button state changed
//     const finalState = await inventoryPage.getButtonState(productName);
//     expect(finalState.isAddVisible).toBe(false);
//     expect(finalState.isRemoveVisible).toBe(true);

//     // Verify cart contents
//     await inventoryPage.openCart();
//     const cartItem = authenticatedPage.locator(".cart_item");
//     await expect(cartItem).toHaveCount(1);
//     await expect(cartItem.locator(".inventory_item_name")).toHaveText(
//       "Sauce Labs Backpack",
//     );
//   });

//   test("should handle add to cart button state correctly", async ({inventoryPage
//   }) => {

//     // Add product
//     await inventoryPage.addToCart(productName);

//     // Verify button state changed
//     let buttonState = await inventoryPage.getButtonState(productName);
//     expect(buttonState.isRemoveVisible).toBe(true);
//     expect(buttonState.isAddVisible).toBe(false);

//     // Remove product
//     await inventoryPage.removeFromCart(productName);

//     // Verify button state changed back
//     buttonState = await inventoryPage.getButtonState(productName);
//     expect(buttonState.isAddVisible).toBe(true);
//     expect(buttonState.isRemoveVisible).toBe(false);
//   });

//   test("should update cart badge correctly", async ({ inventoryPage }) => {

//     // Initially no badge
//     expect(await inventoryPage.getCartBadgeVisibility()).toBe(false);

//     // Add product
//     await inventoryPage.addToCart(productName);

//     // Verify badge shows "1"
//     expect(await inventoryPage.getCartBadgeVisibility()).toBe(true);
//     expect(await inventoryPage.getCartCount()).toBe("1");

//     // Remove product
//     await inventoryPage.removeFromCart(productName);

//     // Verify badge is gone
//     expect(await inventoryPage.getCartBadgeVisibility()).toBe(false);
//   });
// });

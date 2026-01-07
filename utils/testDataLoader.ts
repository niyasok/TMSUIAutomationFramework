
// utils/testDataLoader.ts
import fs from "fs";
import path from "path";

export interface OrderData {
  storeCode: string;
  customerNumber: string;
  checkoutCode: string;
  defaultQuantity: string;
}

export function loadOrderData(): OrderData {
  const filePath = path.resolve(__dirname, "../uiproject/test-data/qa/orderData.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData) as OrderData;
}























// import fs from "fs";
// import path from "path";

// export interface OrderData {
//   storeCode: string;
//   customerNumber: string;
//   ean: string;
//   checkoutCode: string;
//   quantity: string;
// }

// export function loadOrderData(): OrderData {
//   const filePath = path.resolve(__dirname, "../uiproject/test-data/qa/orderData.json");
//   console.log("Resolved path:", filePath); // debug check
//   const rawData = fs.readFileSync(filePath, "utf-8");
//   return JSON.parse(rawData) as OrderData;
// }

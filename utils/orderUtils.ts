// utils/orderUtils.ts
import fs from "fs";

export interface OrderData {
  orderId: string;
  ean: string;
  timestamp: string;
}

/**
 * Save order data to JSON file.
 * @param orderId - The order number
 * @param ean - The product EAN
 * @param append - If true, append to array; else overwrite
 */
export function saveOrderData(orderId: string, ean: string, append = false) {
  const data: OrderData = {
    orderId,
    ean,
    timestamp: new Date().toISOString(),
  };

  if (append) {
    let existing: OrderData[] = [];
    if (fs.existsSync("order.json")) {
      existing = JSON.parse(fs.readFileSync("order.json", "utf-8"));
    }
    existing.push(data);
    fs.writeFileSync("order.json", JSON.stringify(existing, null, 2));
  } else {
    fs.writeFileSync("order.json", JSON.stringify(data, null, 2));
  }
}

/**
 * Read the last saved order data.
 */
export function readOrderData(): OrderData | null {
  if (!fs.existsSync("order.json")) return null;
  return JSON.parse(fs.readFileSync("order.json", "utf-8"));
}

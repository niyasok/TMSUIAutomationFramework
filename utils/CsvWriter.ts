import * as fs from "fs";
import * as path from "path";

export interface EanOrderMapping {
  ean: string;
  orderId: string;
}

export class ExcelWriter {
  private filePath: string;
  private data: EanOrderMapping[] = [];

  constructor(fileName: string = "ean_order_mapping.csv") {
    // Using CSV format as it's simpler and works without external dependencies
    // You can replace with xlsx if needed
    const outputDir = path.join(process.cwd(), "test-results");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    this.filePath = path.join(outputDir, fileName);
  }

  addMapping(ean: string, orderId: string): void {
    this.data.push({ ean, orderId });
  }
  async write(): Promise<void> {
    try {
      const headers = "EAN,Order ID\n";
      const rows = this.data
        .map((item) => `${item.ean},${item.orderId}`)
        .join("\n");
      const content = headers + rows;

      fs.writeFileSync(this.filePath, content, "utf-8");
      console.log(`✓ EAN-Order mapping written to: ${this.filePath}`);
    } catch (error) {
      console.error(`✗ Failed to write Excel file: ${error}`);
      throw error;
    }
  }

  //Clear all collected data (useful for multiple test runs)
  clear(): void {
    this.data = [];
  }

  getFilePath(): string {
    return this.filePath;
  }
}

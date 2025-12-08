import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";

export interface EanOrderMapping {
  ean: string;
  orderId: string;
}

export class ExcelWriter {
  private filePath: string;
  private data: EanOrderMapping[] = [];

  constructor(fileName: string = "ean_order_mapping.xlsx") {
    const outputDir = path.join(process.cwd(), "test-results");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    this.filePath = path.join(outputDir, fileName);
  }

  /**
   * Add an EAN and Order ID pair to the mapping
   */
  addMapping(ean: string, orderId: string): void {
    this.data.push({ ean, orderId });
  }

  /**
   * Write all collected mappings to Excel file (.xlsx)
   */
  async write(): Promise<void> {
    try {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Convert data to sheet
      const worksheet = XLSX.utils.json_to_sheet(this.data, {
        header: ["EAN", "order No"],
      });

      // Set column widths for better readability
      worksheet["!cols"] = [
        { wch: 20 }, // EAN column width
        { wch: 20 }, // Order ID column width
      ];

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "EAN-Order Mapping");

      // Write file
      XLSX.writeFile(workbook, this.filePath);
      console.log(`✓ EAN-Order mapping written to: ${this.filePath}`);
    } catch (error) {
      console.error(`✗ Failed to write Excel file: ${error}`);
      throw error;
    }
  }

  /**
   * Clear all collected data (useful for multiple test runs)
   */
  clear(): void {
    this.data = [];
  }

  /**
   * Get the file path
   */
  getFilePath(): string {
    return this.filePath;
  }
}

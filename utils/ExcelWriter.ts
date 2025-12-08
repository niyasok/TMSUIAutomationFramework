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

  addMapping(ean: string, orderId: string): void {
    this.data.push({ ean, orderId });
  }

  /**
   * Overwrite the target XLSX file with only the header row (clears prior data).
   */
  clearFile(): void {
    try {
      const workbook = XLSX.utils.book_new();
      // Create a sheet with just header row
      const headerSheet = XLSX.utils.aoa_to_sheet([["EAN", "Order No"]]);
      XLSX.utils.book_append_sheet(workbook, headerSheet, "EAN-Order Mapping");
      XLSX.writeFile(workbook, this.filePath);
      // Also clear in-memory buffer
      this.data = [];
      console.log(`✓ Cleared existing Excel file at: ${this.filePath}`);
    } catch (error) {
      console.warn(`Could not clear Excel file: ${error}`);
    }
  }

  async write(): Promise<void> {
    try {
      const workbook = XLSX.utils.book_new();

      // Convert data to sheet
      // map object keys to the same column headers used for the sheet
      const sheetData = this.data.map((d) => ({
        EAN: d.ean,
        "Order No": d.orderId,
      }));
      const worksheet = XLSX.utils.json_to_sheet(sheetData, {
        header: ["EAN", "Order No"],
      });

      worksheet["!cols"] = [{ wch: 20 }, { wch: 20 }];

      XLSX.utils.book_append_sheet(workbook, worksheet, "EAN-Order Mapping");
      XLSX.writeFile(workbook, this.filePath);
      console.log(`✓ EAN-Order mapping written to: ${this.filePath}`);
    } catch (error) {
      console.error(`✗ Failed to write Excel file: ${error}`);
      throw error;
    }
  }

  clear(): void {
    this.data = [];
  }

  getFilePath(): string {
    return this.filePath;
  }
}

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

  clear(): void {
    this.data = [];
  }

  getFilePath(): string {
    return this.filePath;
  }

  async write(): Promise<void> {
    try {
      const workbook = XLSX.utils.book_new();

      //Group EANs by orderId
      const grouped: Record<string, string[]> = {};
      for (const { ean, orderId } of this.data) {
        if (!grouped[orderId]) {
          grouped[orderId] = [];
        }
        grouped[orderId].push(ean);
      }

      //Convert grouped data into rows
      const sheetData = Object.entries(grouped).map(([orderId, eans]) => ({
        "Order No": orderId,
        EANs: eans.join(", "),
        Count: eans.length,
      }));

      const worksheet = XLSX.utils.json_to_sheet(sheetData, {
        header: ["Order No", "EANs", "Count"],
      });

      worksheet["!cols"] = [{ wch: 20 }, { wch: 50 }, { wch: 10 }];

      XLSX.utils.book_append_sheet(workbook, worksheet, "EAN-Order Mapping");
      XLSX.writeFile(workbook, this.filePath);

      console.log(`Grouped EAN-Order mapping written to: ${this.filePath}`);
    } catch (error) {
      console.error(`Failed to write Excel file: ${error}`);
      throw error;
    }
  }
}

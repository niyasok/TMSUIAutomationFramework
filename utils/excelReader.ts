import * as XLSX from "xlsx";

export function loadEANRowsFromExcel(filePath: string, sheetName: string) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];

  // Read rows as arrays (header:1 keeps raw rows)
  const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });

  return rows
    .filter((row) => row.length > 0) // skip empty rows
    .map(
      (row) =>
        row

          .filter((cell) => cell) // skip empty cells
          .map((ean) => ({ ean: String(ean), qty: "1" })) // hardcode qty = 1
    );
}

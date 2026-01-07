import * as XLSX from "xlsx";

/**
 * Reads an Excel sheet where each row contains multiple EANs.
 * Example Excel:
 * | EAN1    | EAN2   | EAN3   |
 * |---------|--------|--------|
 * | 1234567 | 456789 | 678905 |
 * | 345632  | 876543 | 673542 |
 *
 * Returns:
 * [
 *   [ { ean: "1234567", qty: "1" }, { ean: "456789", qty: "1" }, { ean: "678905", qty: "1" } ],
 *   [ { ean: "345632", qty: "1" }, { ean: "876543", qty: "1" }, { ean: "673542", qty: "1" } ]
 * ]
 */
export function loadEANRowsFromExcel(filePath: string, sheetName: string) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];

  // Read rows as arrays (header:1 keeps raw rows)
  const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });

  return rows
    .filter((row) => row.length > 0) // skip empty rows
    .map((row) =>
      row
    
        .filter((cell) => cell) // skip empty cells
        .map((ean) => ({ ean: String(ean), qty: "1" })) // hardcode qty = 1
    );
}













// import * as XLSX from "xlsx";

// interface EANRow {
//   EAN: string | number;
//   Qty: string | number;
// }

// export function loadEANsFromExcel(filePath: string, sheetName: string) {
//   const workbook = XLSX.readFile(filePath);
//   const sheet = workbook.Sheets[sheetName];
//   const rows = XLSX.utils.sheet_to_json<EANRow>(sheet); // 👈 generic type

//   return rows.map((row) => ({
//     ean: String(row.EAN),
//     qty: String(row.Qty),
//   }));
// }


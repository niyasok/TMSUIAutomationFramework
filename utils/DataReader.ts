import * as fs from "fs";
export function readJsonFile(filePath: string) {
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}
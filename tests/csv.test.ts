import { getCsvData } from "../src/csv";
import * as path from 'path';

describe("getCsvData", () => {
  it("throws if the file does not exist", async () => {
    const filename = "this-file-does-not-exist.csv";

    await expect(getCsvData(filename)).rejects.toBeTruthy();
  });

  it("returns the data if the file exists and is valid", async () => {
    const filename = path.resolve(__dirname, '../data', 'technical-challenge-tenants-september-2024.csv');

    const results = await getCsvData(filename);

    expect(results.length).toBe(250);

    const headers = Object.keys(results[0]);
    expect(headers).toContain("id");
    expect(headers).toContain("propertyId");
    expect(headers).toContain("name");
  });
});

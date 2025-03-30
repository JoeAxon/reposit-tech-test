import * as property from "../src/property";
import { getCsvData } from "../src/csv";
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

/**
 * This is essentially just here to pull all the pieces together and show the usage.
 * The individual pieces have been tested separately.
 */
describe("Reposit technical challenge", () => {
  it("works with the provided data", async () => {
    // 0. Load the supplied CSV data
    const tenantDataFile = path.resolve(__dirname, '../data', 'technical-challenge-tenants-september-2024.csv');
    const tenantData = await getCsvData(tenantDataFile);

    const propertyDataFile = path.resolve(__dirname, '../data', 'technical-challenge-properties-september-2024.csv');
    const propertyData = await getCsvData(propertyDataFile);

    const properties = property.fromCsvData(propertyData, tenantData);

    // 1. Calculate the average rent of properties by region
    const averages: [string, number][] = [
      ["ENGLAND", 166928],
      ["N.IRELAND", 133990],
      ["SCOTLAND", 186373],
      ["WALES", 152955],
    ];

    averages.forEach(([region, expected]) => {
      expect(property.calculateAverageRentByRegion(properties, region)).toBe(expected);
    });

    // 2. Calculate the monthly rent, per tenant for a given property
    const monthlyRent: [property.PropertyId, number][] = [
      ["p_1007", 26020],
      ["p_1008", 47940],
      ["p_1008", 47940],
      ["p_1014", 17620],
    ];

    monthlyRent.forEach(([id, expected]) => {
      const p = properties.find(p => p.id === id);
      expect(p).not.toBeUndefined();
      expect(property.calculateRentPerTenant(p as property.Property)).toBe(expected);
    });

    // 3. Validate the postcode of all properties
    const expectedIdsWithInvalidPostcodes: property.PropertyId[] = [ "p_1005", "p_1008", "p_1011" ];

    const propertiesWithInvalidPostcodes = property.findPropertiesWithInvalidPostcodes(properties);

    expect(propertiesWithInvalidPostcodes.length).toBe(39);
    expectedIdsWithInvalidPostcodes.forEach((propertyId) => {
      expect(propertiesWithInvalidPostcodes).toContain(propertyId);
    });

    // 4. Get the 'status' of a property
    const statuses: [property.PropertyId, property.PropertyStatus][] = [
      ["p_1003", "PARTIALLY_VACANT"],
      ["p_1002", "PROPERTY_OVERDUE"],
      ["p_1007", "PROPERTY_ACTIVE"],
      ["p_1008", "PROPERTY_ACTIVE"],
      ["p_1029", "PROPERTY_VACANT"],
    ];

    statuses.forEach(([id, expectedStatus]) => {
      const p = properties.find(p => p.id === id);
      expect(p).not.toBeUndefined();
      expect(property.getStatus(p as property.Property)).toBe(expectedStatus);
    });
  });
});

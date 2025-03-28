import { findPropertiesWithInvalidPostcodes } from "../src/property";
import { propertyFixture } from "./fixtures";

describe("Validate the postcode of all properties", () => {

  /*
   - Able to validate whether a postcode is a valid UK postcode.
   -  Returns a list of property IDs which have an invalid postcode.
   */

  it("returns a list of property IDs which have an invalid postcode", () => {
    const properties = [
      propertyFixture({id: "1", postcode: "ABC"}), // Invalid
      propertyFixture({id: "2", postcode: "SW7 5BD"}),
      propertyFixture({id: "3", postcode: "SW7 56D"}), // Invalid
      propertyFixture({id: "4", postcode: "OX20 1PP"}),
    ];

    const result = findPropertiesWithInvalidPostcodes(properties);

    expect(result.length).toBe(2);

    expect(result).toContain("1");
    expect(result).toContain("3");
  });
});

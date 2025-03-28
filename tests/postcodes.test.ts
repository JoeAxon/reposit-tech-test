import { isValidUkPostcode } from "../src/postcode";

// TODO: This should be a little more thorough and be based on
// the actual post code specification.
describe("isValidUkPostcode", () => {
  it("is valid for known good postcodes", () => {
    const postcodes = [
      "SW1A 2AA",
      "NW1 6XE",
      "WC2R 0BP",
      "CB2 1TN",
      "EH1 2NG",
      "L3 4AD",
      "EC3N 4AB",
    ];

    postcodes.forEach(p => {
      expect(isValidUkPostcode(p)).toBe(true);
    });
  });

  it("is invalid for known bad postcodes", () => {
    const postcodes = [
      "SW1A AAA",
      "NW1 66E",
      "WC2R 000",
      "CB2 1T0",
      "1H1 2NG",
      "L3AAA 4AD",
      // "EC3N4AB", - Worth noting that current implementation doesn't care about spaces
    ];

    postcodes.forEach(p => {
      expect(isValidUkPostcode(p)).toBe(false);
    });
  });
});

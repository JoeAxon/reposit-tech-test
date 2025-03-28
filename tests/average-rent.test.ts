import { Property, calculateAverageRentByRegion } from "../src/property";
import { propertyFixture } from "./fixtures";

describe("Calculate the average rent of properties by region", () => {
  /*
   - Accepts a region to get the average rent for.
   - Returns the average rent for the given region as a number.
  */
 it("returns 0 when there are no properties", () => {
   expect(calculateAverageRentByRegion([], "Any")).toBe(0);
 });

 it("correctly calculates the average for a given region", () => {
   const properties: Property[] = [
     propertyFixture({monthlyRentPence: 10, region: "ENGLAND"}),
     propertyFixture({monthlyRentPence: 20, region: "ENGLAND"}),
     propertyFixture({monthlyRentPence: 30, region: "ENGLAND"}),
   ];

   expect(calculateAverageRentByRegion(properties, "ENGLAND")).toBe(20);
 });

 // NOTE: This might not be desirable but at least there's a test for it!
 it("rounds the average down to the nearest pence", () => {
   const properties: Property[] = [
     propertyFixture({monthlyRentPence: 10, region: "ENGLAND"}),
     propertyFixture({monthlyRentPence: 20, region: "ENGLAND"}),
     propertyFixture({monthlyRentPence: 25, region: "ENGLAND"}),
   ];

   expect(calculateAverageRentByRegion(properties, "ENGLAND")).toBe(18);
 });

 it("only includes properties with the matching region", () => {
   const properties: Property[] = [
     propertyFixture({monthlyRentPence: 10, region: "ENGLAND"}),
     propertyFixture({monthlyRentPence: 20, region: "ENGLAND"}),
     propertyFixture({monthlyRentPence: 25, region: "WALES"}),
   ];

   expect(calculateAverageRentByRegion(properties, "ENGLAND")).toBe(15);
 });
});

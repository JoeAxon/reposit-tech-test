import { Property, calculateAverageRentByRegion } from "../src/property";

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
     { id: "1", address: "Address 1", postcode: "HU7 0DY", monthlyRentPence: 10, region: "ENGLAND", capacity: 0, tenancyEndDate: new Date() },
     { id: "2", address: "Address 2", postcode: "HU7 0DY", monthlyRentPence: 20, region: "ENGLAND", capacity: 0, tenancyEndDate: new Date() },
     { id: "3", address: "Address 3", postcode: "HU7 0DY", monthlyRentPence: 30, region: "ENGLAND", capacity: 0, tenancyEndDate: new Date() },
   ];

   expect(calculateAverageRentByRegion(properties, "ENGLAND")).toBe(20);
 });

 // NOTE: This might not be desirable but at least there's a test for it!
 it("rounds the average down to the nearest pence", () => {
   const properties: Property[] = [
     { id: "1", address: "Address 1", postcode: "HU7 0DY", monthlyRentPence: 10, region: "ENGLAND", capacity: 0, tenancyEndDate: new Date() },
     { id: "2", address: "Address 2", postcode: "HU7 0DY", monthlyRentPence: 20, region: "ENGLAND", capacity: 0, tenancyEndDate: new Date() },
     { id: "3", address: "Address 3", postcode: "HU7 0DY", monthlyRentPence: 25, region: "ENGLAND", capacity: 0, tenancyEndDate: new Date() },
   ];

   expect(calculateAverageRentByRegion(properties, "ENGLAND")).toBe(18);
 });

 it("only includes properties with the matching region", () => {
   const properties: Property[] = [
     { id: "1", address: "Address 1", postcode: "HU7 0DY", monthlyRentPence: 10, region: "ENGLAND", capacity: 0, tenancyEndDate: new Date() },
     { id: "2", address: "Address 2", postcode: "HU7 0DY", monthlyRentPence: 20, region: "ENGLAND", capacity: 0, tenancyEndDate: new Date() },
     { id: "3", address: "Address 3", postcode: "HU7 0DY", monthlyRentPence: 25, region: "WALES", capacity: 0, tenancyEndDate: new Date() },
   ];

   expect(calculateAverageRentByRegion(properties, "ENGLAND")).toBe(15);
 });
});

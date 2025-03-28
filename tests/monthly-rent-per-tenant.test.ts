import { calculateRentPerTenant } from "../src/property";
import { propertyFixture } from "./fixtures";

describe("Calculate the monthly rent, per tenant for a given property", () => {
  /*
   - Accepts a property.
   - The total property monthly rent is split equally between the tenants.
   - The monthly rent, per tenant can be requested in pence or pounds.
   - If there are no tenants, an error should be thrown.
   - Returns the average monthly rent, per tenant as a number.
  */

 it("should throw an error if the property has no tenants", () => {
   const propertyWithoutTenants = propertyFixture({tenants: []});

   expect(() => calculateRentPerTenant(propertyWithoutTenants)).toThrow();
 });

 it("splits the monthly rent equally between the tenants", () => {
   const property = propertyFixture({
     monthlyRentPence: 300,
     tenants: [
       {id: "1", name: "Jane Doe"},
       {id: "2", name: "John Smith"},
       {id: "3", name: "Jenny Smith"},
     ]
   });

   expect(calculateRentPerTenant(property)).toBe(100);
 });

 // Again, this might not be the correct solution but I wanted to handle it
 it("rounds the monthly rent up to the nearest pence", () => {
   const property = propertyFixture({
     monthlyRentPence: 400,
     tenants: [
       {id: "1", name: "Jane Doe"},
       {id: "2", name: "John Smith"},
       {id: "3", name: "Jenny Smith"},
     ]
   });

   expect(calculateRentPerTenant(property)).toBe(134);
 });
});

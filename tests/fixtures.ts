import type { Property } from "../src/property";

const defaultProperty: Property = {
  id: "1",
  address: "Address 1",
  postcode: "SW1A 2AA",
  monthlyRentPence: 10,
  region: "ENGLAND",
  capacity: 0,
  tenancyEndDate: new Date(),
  tenants: []
};

export function propertyFixture(partial: Partial<Property>): Property {
  return { ...defaultProperty, ...partial };
}


import type { Tenant } from "./tenant";
import { isValidUkPostcode } from "./postcode";

type PropertyId = string;

type Property = {
  id: PropertyId;
  address: string;
  postcode: string;
  monthlyRentPence: number;
  region: string;
  capacity: number;
  tenancyEndDate: Date;
  tenants: Tenant[];
};

function calculateAverageRentByRegion(properties: Property[], region: string): number {
  const propertiesInRegion = properties.filter(p => p.region === region);

  if (propertiesInRegion.length === 0) {
    return 0;
  }

  const totalRent = propertiesInRegion.reduce((acc, { monthlyRentPence }) => acc + monthlyRentPence, 0);

  return Math.floor(totalRent / propertiesInRegion.length);
}

/**
 * @throws {Error}
 */
function calculateRentPerTenant(property: Property): number {
  if (property.tenants.length === 0) {
    throw new Error("Expected the property to have at least 1 tenant");
  }

  return Math.ceil(property.monthlyRentPence / property.tenants.length);
}

function findPropertiesWithInvalidPostcodes(properties: Property[]): PropertyId[] {
  return properties.filter(p => !isValidUkPostcode(p.postcode)).map(({id}) => id);
}

export { Property, calculateAverageRentByRegion, calculateRentPerTenant, findPropertiesWithInvalidPostcodes };

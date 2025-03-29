import type { Tenant } from "./tenant";
import { isValidUkPostcode } from "./postcode";

type PropertyId = string;

type PropertyStatus = "PROPERTY_VACANT" | "PARTIALLY_VACANT" | "PROPERTY_ACTIVE" | "PROPERTY_OVERDUE";

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

function getStatus(property: Property): PropertyStatus {
  if (property.tenants.length === 0) {
    return "PROPERTY_VACANT";
  }

  if (property.tenancyEndDate < new Date()) {
    return "PROPERTY_OVERDUE";
  }

  return property.tenants.length === property.capacity ? "PROPERTY_ACTIVE" : "PARTIALLY_VACANT";
}

export { Property, calculateAverageRentByRegion, calculateRentPerTenant, findPropertiesWithInvalidPostcodes, getStatus };

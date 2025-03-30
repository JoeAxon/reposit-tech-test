import type { Tenant } from "./tenant";
import type { CsvData } from "./csv";
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

function fromCsvData(propertyData: CsvData[], tenantData: CsvData[]): Property[] {
  const propertyToTenants = tenantData.reduce<{[k: string]: Tenant[]}>((acc, data) => {
    if (!acc[data.propertyId]) {
      acc[data.propertyId] = [];
    }

    acc[data.propertyId].push({
      id: data.id,
      name: data.name,
    });

    return acc;
  }, {});

  return propertyData.map(d => ({
    id: d.id,
    address: d.address,
    postcode: d.postcode,
    monthlyRentPence: Number(d.monthlyRentPence),
    region: d.region,
    capacity: Number(d.capacity),
    tenancyEndDate: new Date(d.tenancyEndDate),
    tenants: propertyToTenants[d.id] || [],
  }));
}

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

export {
  Property,
  PropertyId,
  PropertyStatus,
  calculateAverageRentByRegion,
  calculateRentPerTenant,
  findPropertiesWithInvalidPostcodes,
  fromCsvData,
  getStatus
};

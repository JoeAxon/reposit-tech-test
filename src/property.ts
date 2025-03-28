type Property = {
  id: string;
  address: string;
  postcode: string;
  monthlyRentPence: number;
  region: string;
  capacity: number;
  tenancyEndDate: Date;
};

function calculateAverageRentByRegion(properties: Property[], region: string): number {
  const propertiesInRegion = properties.filter(p => p.region === region);

  if (propertiesInRegion.length === 0) {
    return 0;
  }

  const totalRent = propertiesInRegion.reduce((acc, { monthlyRentPence }) => acc + monthlyRentPence, 0);

  return Math.floor(totalRent / propertiesInRegion.length);
}

export { Property, calculateAverageRentByRegion };

import { getStatus } from "../src/property";
import { propertyFixture } from "./fixtures";

describe("Get the 'status' of a property", () => {
  /*
   - Accepts a property.
   - If a property has no tenants, return "PROPERTY_VACANT".
   - If a property has at least one tenant but fewer tenants than the capacity and the current date is not past the tenancy end date, return "PARTIALLY_VACANT".
   - If a property has tenants and no capacity, and the current date is not past the tenancy end date, return "PROPERTY_ACTIVE".
   - If a property has at least one tenant but the current date is past the tenancy end date, return "PROPERTY_OVERDUE".
   */

  it("returns PROPERTY_VACANT if the property has no tenants", () => {
    const property = propertyFixture({tenants: []});

    expect(getStatus(property)).toBe("PROPERTY_VACANT");
  });

  it("returns PROPERTY_OVERDUE if the tenancy end date has passed", () => {
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    const property = propertyFixture({tenants: [{id: "1", name: "Jack"}], tenancyEndDate: previousMonth});
    expect(getStatus(property)).toBe("PROPERTY_OVERDUE");
  });

  it("returns PARTIALLY_VACANT if the property is not at capacity", () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const property = propertyFixture({tenants: [{id: "1", name: "Jack"}], capacity: 2, tenancyEndDate: nextMonth});
    expect(getStatus(property)).toBe("PARTIALLY_VACANT");
  });

  it("returns PROPERTY_ACTIVE if the property is at capacity", () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const property = propertyFixture({tenants: [{id: "1", name: "Jack"}, {id: "2", name: "Jill"}], capacity: 2, tenancyEndDate: nextMonth});
    expect(getStatus(property)).toBe("PROPERTY_ACTIVE");
  });
});

# Reposit technical challenge

In the spirit of simplicity:

```
npm install
npm test
```

## Overview

Most of the functionality lives in `src/property.ts`. I opted to use simple
type aliases and functions throughout as I don't think the requirements
warranted anything more elaborate.

The provided data files are included in the `/data` directory.

Tests are in the `/test` directory and are named to match the requirements that
they relate to. The `test/index.test.ts` file exercises all of the functionality
so it might be a good place to start.

## Versions

I used node.js 23.10.0 (see .tool-versions). I imagine it should work on earlier
versions but I haven't tested it.

## Requirements

1. Calculate the average rent of properties by region. Please code a solution that satisfies the following acceptance criteria:

- Accepts a region to get the average rent for.
- Returns the average rent for the given region as a number.

2. Calculate the monthly rent, per tenant for a given property. Please code a solution that satisfies the following acceptance criteria:

- Accepts a property.
- The total property monthly rent is split equally between the tenants.
- The monthly rent, per tenant can be requested in pence or pounds.
- If there are no tenants, an error should be thrown.
- Returns the average monthly rent, per tenant as a number.

3. Validate the postcode of all properties. Please code a solution that satisfies the following acceptance criteria:

- Ableto validate whether a postcode is a valid UK postcode.
-  Returns a list of property IDs which have an invalid postcode.

4. Get the 'status' of a property. Please code a solution that satisfies the following acceptance criteria:

- Accepts a property.
- If a property has no tenants, return "PROPERTY_VACANT".
- If a property has at least one tenant but fewer tenants than the capacity and the current date is not past the tenancy end date, return "PARTIALLY_VACANT".
- If a property has tenants and no capacity, and the current date is not past the tenancy end date, return "PROPERTY_ACTIVE".
- If a property has at least one tenant but the current date is past the tenancy end date, return "PROPERTY_OVERDUE".

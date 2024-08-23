export type GrowthRates = { [date: string]: number };

export function setGrowthRate(
  growthRates: GrowthRates,
  date: Date,
  rate: number
) {
  const dateKey = date.toISOString().split("T")[0];
  growthRates[dateKey] = rate;
  return growthRates;
}

export function adjustGrowthRates(
  growthRates: GrowthRates,
  startDate: Date,
  rate: number
): void {
  const currentDate = new Date(startDate);

  // Adjust the growth rate for the next 60 months
  for (let month = 0; month < 60; month++) {
    setGrowthRate(growthRates, currentDate, rate);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
}

export function calculateProjections(
  initialCustomers: number,
  startDate: Date,
  growthRates: GrowthRates
): number[] {
  const projections: number[] = [];
  let currentCustomers = initialCustomers;

  const currentDate = new Date(startDate);

  // 60 months 5 years
  for (let month = 0; month < 60; month++) {
    const dateKey = currentDate.toISOString().split("T")[0];

    const growthRate = growthRates[dateKey] ?? 0;

    currentCustomers += growthRate;

    projections.push(currentCustomers);

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return projections;
}

export function printProjections(projections: number[], startDate: Date): void {
  const currentDate = new Date(startDate);

  projections.forEach((customers) => {
    console.log(
      `${currentDate.toISOString().split("T")[0]}: ${customers} customers`
    );
    currentDate.setMonth(currentDate.getMonth() + 1);
  });
}

const initialCustomers = 1000;
const startDate = new Date("2023-08-01");
let growthRates: GrowthRates = {};

adjustGrowthRates(growthRates, startDate, 100);

const specificDate = new Date("2028-02-01");
growthRates = setGrowthRate(growthRates, specificDate, 10000);

const specificDateDecrease = new Date("2028-05-01");
growthRates = setGrowthRate(growthRates, specificDateDecrease, -9000);

const projections = calculateProjections(
  initialCustomers,
  startDate,
  growthRates
);
printProjections(projections, startDate);

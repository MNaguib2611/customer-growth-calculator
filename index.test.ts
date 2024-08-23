import {
  GrowthRates,
  setGrowthRate,
  adjustGrowthRates,
  calculateProjections,
  printProjections,
} from "./index";

describe("Growth Rate Functions", () => {
  test("setGrowthRate should set the correct rate for a specific date", () => {
    const growthRates: GrowthRates = {};
    const date = new Date("2023-08-01");
    const rate = 100;

    const updatedGrowthRates = setGrowthRate(growthRates, date, rate);

    expect(updatedGrowthRates["2023-08-01"]).toBe(100);
  });

  test("adjustGrowthRates should set the growth rates for the next 60 months", () => {
    const growthRates: GrowthRates = {};
    const startDate = new Date("2023-08-01");
    const rate = 100;

    adjustGrowthRates(growthRates, startDate, rate);

    expect(Object.keys(growthRates)).toHaveLength(60);
    expect(growthRates["2023-08-01"]).toBe(100);
    expect(growthRates["2028-07-01"]).toBe(100);
  });

  test("calculateProjections should return correct customer projections", () => {
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

    expect(projections).toHaveLength(60);
    expect(projections[0]).toBe(1100);
    expect(projections[59]).toBe(7800);
  });
});

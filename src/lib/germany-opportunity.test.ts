import { test } from "node:test";
import { strict as assert } from "node:assert";
import { GERMANY_OPPORTUNITY } from "./germany-opportunity";

test("2026 monthly financial requirement is 1,091 euros", () => {
  assert.equal(GERMANY_OPPORTUNITY.year, 2026);
  assert.equal(GERMANY_OPPORTUNITY.monthlyFundsEUR, 1091);
});
test("points route requires at least six points", () => {
  assert.equal(GERMANY_OPPORTUNITY.minimumPoints, 6);
});
test("initial job-search stay is up to twelve months", () => {
  assert.equal(GERMANY_OPPORTUNITY.maximumSearchMonths, 12);
});
test("part-time work is limited to twenty hours per week", () => {
  assert.equal(GERMANY_OPPORTUNITY.weeklyWorkHours, 20);
});
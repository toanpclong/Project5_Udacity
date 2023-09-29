import { checkForDate } from "../js/dateChecker";
describe("Testing the submit functionality", () => {
  test("Testing the checkForDate() function with time more than now", () => {
    const time = new Date();
    const dateInput = new Date(time.getTime() + 1000 * 3600 * 24);
    const stringTime = `${dateInput.getFullYear()}-${
      dateInput.getMonth() + 1
    }-${dateInput.getDate()}`;
    expect(checkForDate(stringTime)).toBeGreaterThanOrEqual(0);
  });

  test("Testing the checkForDate() function with time more than now less than now", () => {
    const time = new Date();
    const dateInput = new Date(time.getTime() - 1000 * 3600 * 24);
    const stringTime = `${dateInput.getFullYear()}-${
      dateInput.getMonth() + 1
    }-${dateInput.getDate()}`;
    expect(checkForDate(stringTime)).toBeLessThan(0);
  });
});

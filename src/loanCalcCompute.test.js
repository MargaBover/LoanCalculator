const computeLoan = (loanAmount, durationMonths, anualInterestRate) => {
  const totalAmountRepayable =
    loanAmount * Math.pow(1 + anualInterestRate, durationMonths / 12);
  const monthlyRepayment =
    Math.ceil((totalAmountRepayable / durationMonths) * 100) / 100;
  const totalOwned = Math.ceil(monthlyRepayment * durationMonths * 100) / 100;
  return {
    monthlyRepayment,
    totalOwned,
  };
};

describe("Loan calculator", () => {
  test("Test 1 year 5% rate", () => {
    const loanAmount = 1000;
    const durationMonths = 12;
    const anualInterestRate = 0.05;
    expect(computeLoan(loanAmount, durationMonths, anualInterestRate)).toEqual({
      monthlyRepayment: (1000 * (1 + 0.05)) / 12,
      totalOwned: 1000 * (1 + 0.05),
    });
  });

  test("Test 3 year 10% rate", () => {
    const loanAmount = 2000;
    const durationMonths = 36;
    const anualInterestRate = 0.1;
    const valueExpected = {
      monthlyRepayment:
        Math.ceil(((2000 * Math.pow(1 + 0.1, 3)) / 36) * 100) / 100,
      totalOwned:
        (Math.ceil(((2000 * Math.pow(1 + 0.1, 3)) / 36) * 100) / 100) * 36,
    };
    const result = computeLoan(loanAmount, durationMonths, anualInterestRate);
    expect(result.totalOwned).toBeCloseTo(valueExpected.totalOwned);
    expect(result.monthlyRepayment).toBeCloseTo(valueExpected.monthlyRepayment);
  });
});

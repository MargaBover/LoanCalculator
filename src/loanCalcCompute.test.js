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
});

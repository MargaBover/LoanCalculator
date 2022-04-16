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

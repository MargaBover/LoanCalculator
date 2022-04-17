/**
 * Compute the loan total repayable amount and monthly repayments.
 * @param {number} loanAmount Total loan amount
 * @param {number} durationMonths Loan duration in months
 * @param {number} anualInterestRate Annual interest rate
 * @returns {object} The monthly repayment and total repayable amount.
 */
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

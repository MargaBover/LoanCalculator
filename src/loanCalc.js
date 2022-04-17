const loanAmountSlider = document.getElementById("loanAmountSlider");
const loanAmountTextBox = document.getElementById("loanAmountBox");
const loanDurationSlider = document.getElementById("loanDurationSlider");
const loanDurationTextBox = document.getElementById("loanDurationBox");
const durationText = document.getElementById("durationText");
const totalAmountRepayable = document.getElementById(
  "totalAmountRepayableText"
);
const monthlyPaymentText = document.getElementById("monthlyPaymentText");
const interestRateText = document.getElementById("interestRateText");
let loanAmount;
let loanDurationMonths;
let interestRate = 0.05;

/**
 * initForm Initialize the values and limit of the loan calculator form.
 *
 * Future work: Fetch the data from an API.
 */
const initForm = () => {
  const defaultLoanAmount = 3000;
  const minLoanAmount = 1000;
  const maxLoanAmount = 50000;
  const defaultLoanDurationMonths = 12;
  const minLoanDurationMonths = 12;
  const maxLoanDurationMonths = 12 * 10;

  loanAmount = defaultLoanAmount;
  loanAmountSlider.min = minLoanAmount;
  loanAmountSlider.max = maxLoanAmount;
  loanAmountSlider.step = 100;
  loanAmountSlider.value = defaultLoanAmount;

  loanAmountTextBox.min = minLoanAmount;
  loanAmountTextBox.max = maxLoanAmount;
  loanAmountTextBox.value = defaultLoanAmount;

  loanDurationMonths = defaultLoanDurationMonths;
  loanDurationSlider.min = minLoanDurationMonths;
  loanDurationSlider.max = maxLoanDurationMonths;
  loanDurationSlider.value = defaultLoanDurationMonths;

  loanDurationTextBox.min = minLoanDurationMonths;
  loanDurationTextBox.max = maxLoanDurationMonths;
  loanDurationTextBox.value = defaultLoanDurationMonths;

  updateLoanStats();
};

/**
 * Update the form with the new loan amount.
 * @param {number} value
 */
const updateLoanAmount = (value) => {
  loanAmount = value;
  loanAmountTextBox.value = value;
  loanAmountSlider.value = value;
  updateLoanStats();
};

/**
 * Formats the loan duration as text in years and months.
 * @param {number} durationMonths
 * @returns formated text
 */
const computeDurationText = (durationMonths) => {
  const years = Math.floor(durationMonths / 12);
  const months = durationMonths % 12;
  const yearText = years > 1 ? "years" : "year";
  const monthText = months > 1 ? "months" : "month";
  if (years > 0 && months > 0) {
    return `${years} ${yearText} and ${months} ${monthText}`;
  }
  if (months > 0) {
    return `${months} ${monthText}`;
  }
  return `${years} ${yearText}`;
};

/**
 * Update the form with the new loan duration.
 * @param {number} value
 */
const updateLoanDuration = (value) => {
  loanDurationMonths = value;
  loanDurationTextBox.value = value;
  loanDurationSlider.value = value;
  durationText.innerHTML = `(${computeDurationText(value)})`;
  updateLoanStats();
};

/**
 * Update the loan information (Total amount repayable and monthly repayments)
 */
const updateLoanStats = () => {
  const loanStat = computeLoan(loanAmount, loanDurationMonths, interestRate);
  totalAmountRepayable.innerHTML = `£ ${loanStat.totalOwned}`;
  monthlyPaymentText.innerHTML = `£ ${loanStat.monthlyRepayment}`;
  interestRateText.innerHTML = `${interestRate * 100} %`;
};

// The event listener handlers

loanAmountSlider.addEventListener("change", (event) =>
  updateLoanAmount(loanAmountSlider.value)
);

loanAmountTextBox.addEventListener("change", (event) =>
  updateLoanAmount(loanAmountTextBox.value)
);

loanDurationSlider.addEventListener("change", (event) =>
  updateLoanDuration(loanDurationSlider.value)
);

loanDurationTextBox.addEventListener("change", (event) =>
  updateLoanDuration(loanDurationTextBox.value)
);

window.addEventListener("load", initForm);

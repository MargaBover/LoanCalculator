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

const initForm = () => {
  const defaultLoanAmount = 2000;
  const minLoanAmount = 1000;
  const maxLoanAmount = 50000;
  const defaultLoanDurationMonths = 12;
  const minLoanDurationMonths = 12;
  const maxLoanDurationMonths = 12 * 10;

  loanAmount = defaultLoanAmount;
  loanAmountSlider.value = String(defaultLoanAmount);
  loanAmountSlider.min = String(minLoanAmount);
  loanAmountSlider.max = String(maxLoanAmount);
  loanAmountSlider.step = 100;
  loanAmountTextBox.value = String(defaultLoanAmount);
  loanAmountTextBox.min = String(minLoanAmount);
  loanAmountTextBox.max = String(maxLoanAmount);

  loanDurationMonths = defaultLoanDurationMonths;
  loanDurationSlider.value = String(defaultLoanDurationMonths);
  loanDurationSlider.min = String(minLoanDurationMonths);
  loanDurationSlider.max = String(maxLoanDurationMonths);
  loanDurationTextBox.value = String(defaultLoanDurationMonths);
  loanDurationTextBox.min = String(minLoanDurationMonths);
  loanDurationTextBox.max = String(maxLoanDurationMonths);

  updateLoanStats();
};

const updateloanAmount = (value) => {
  loanAmount = value;
  loanAmountTextBox.value = value;
  loanAmountSlider.value = value;
  updateLoanStats();
};

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

const updateLoanDuration = (value) => {
  loanDurationMonths = value;
  loanDurationTextBox.value = value;
  loanDurationSlider.value = value;
  durationText.innerHTML = `(${computeDurationText(value)})`;
  updateLoanStats();
};

const updateLoanStats = () => {
  const loanStat = computeLoan(loanAmount, loanDurationMonths, interestRate);
  totalAmountRepayable.innerHTML = `£ ${loanStat.totalOwned}`;
  monthlyPaymentText.innerHTML = `£ ${loanStat.monthlyRepayment}`;
  interestRateText.innerHTML = `${interestRate * 100} %`;
};

const computeLoan = (loanAmount, durationMonths, anualInterestRate) => {
  const totalAmountRepayable =
    loanAmount * Math.pow(1 + anualInterestRate, durationMonths / 12);
  return {
    monthlyRepayment: Math.ceil(totalAmountRepayable / durationMonths),
    totalOwned: Math.ceil(totalAmountRepayable),
  };
};

loanAmountSlider.addEventListener("change", (event) =>
  updateloanAmount(loanAmountSlider.value)
);

loanAmountTextBox.addEventListener("change", (event) =>
  updateloanAmount(loanAmountTextBox.value)
);

loanDurationSlider.addEventListener("change", (event) =>
  updateLoanDuration(loanDurationSlider.value)
);

loanDurationTextBox.addEventListener("change", (event) =>
  updateLoanDuration(loanDurationTextBox.value)
);

initForm();

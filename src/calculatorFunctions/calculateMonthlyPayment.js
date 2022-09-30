function calculateMonthlyPayment(inputs) {
  for (const [key, value] of Object.entries(inputs)) {
    inputs[key] = Number(value)
  }

  const {
    homePrice,
    downPayment,
    interestRate,
    yearsOfLoan,
    propertyTax,
    insurance,
  } = inputs

  const i = interestRate / 100 / 12
  const n = yearsOfLoan * 12
  const principal = homePrice - downPayment
  const tax = propertyTax / 100 / 12

  // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]

  return (
    principal * ((i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)) +
    tax +
    insurance
  )
}

export default calculateMonthlyPayment

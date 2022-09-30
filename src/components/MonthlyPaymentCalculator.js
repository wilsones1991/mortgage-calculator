import styles from "../styles/Forms.module.css"

import { useState, useRef } from "react"

import calculateMonthlyPayment from "../calculatorFunctions/calculateMonthlyPayment"

function MonthlyPaymentCalculator() {
  const [formData, setFormData] = useState({
    homePrice: "",
    downPayment: "",
    interestRate: "",
    yearsOfLoan: "",
    propertyTax: "",
    insurance: "",
  })

  const [disableSubmit, setDisableSubmit] = useState(true)

  const [monthlyPayment, setMonthlyPayment] = useState(null)

  const monthlyPaymentForm = useRef(null)

  function showError(input, error) {
    switch (error.getAttribute("name")) {
      case "homePrice":
      case "downPayment":
      case "insurance":
        if (input.validity.valueMissing) {
          error.textContent = "Please enter a valid price."
        } else if (input.validity.rangeUnderflow) {
          error.textContent = "Please enter a number greater than 0."
        } else if (input.validity.stepMismatch) {
          error.textContent = "Value must be rounded to nearest cent."
        }
        break
      case "interestRate":
      case "propertyTax":
        if (input.validity.valueMissing) {
          error.textContent = "Please enter a valid percentage."
        } else if (
          input.validity.rangeUnderflow ||
          input.validity.rangeOverflow
        ) {
          error.textContent = "Please enter a percentage between 0 and 100."
        }
        break
      case "yearsOfLoan":
        if (input.validity.valueMissing) {
          error.textContent = "Please enter a valid amount of years."
        } else if (input.validity.rangeUnderflow) {
          error.textContent = "Amount of years must be greater than zero."
        } else if (input.validity.stepMismatch) {
          error.textContent = "Years must be a whole number."
        }
        break
      default:
        break
    }
  }

  function handleChange(e) {
    const input = e.target
    const error = input.nextSibling
    if (input.validity.valid) {
      error.textContent = ""
      input.classList?.remove(styles.inputError)
    } else {
      showError(input, error)
      input.classList.add(styles.inputError)
    }

    if (monthlyPaymentForm.current.checkValidity()) {
      setDisableSubmit(false)
    } else {
      setDisableSubmit(true)
    }
    const id = e.target.id

    setFormData({ ...formData, [id]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
    setMonthlyPayment(calculateMonthlyPayment(formData))
  }

  return (
    <>
      <form
        ref={monthlyPaymentForm}
        noValidate
        className={styles.calculatorForm}
        onSubmit={handleSubmit}
      >
        <h2>Monthly Mortgage Calculator</h2>
        <div className={styles.numberInput}>
          <label>Price of home:</label>
          <input
            id="homePrice"
            required
            min="0"
            step=".01"
            type="number"
            value={formData.homePrice}
            onChange={handleChange}
          />
          <span
            name="homePrice"
            className={styles.error}
            aria-live="polite"
          ></span>
        </div>
        <div className={styles.numberInput}>
          <label>Down Payment:</label>
          <input
            id="downPayment"
            type="number"
            min="0"
            step=".01"
            value={formData.downPayment}
            onChange={handleChange}
          />
          <span
            name="downPayment"
            className={styles.error}
            aria-live="polite"
          ></span>
        </div>
        <div className={styles.numberInput}>
          <label>Interest Rate:</label>
          <input
            id="interestRate"
            required
            type="number"
            min="0"
            max="100"
            step=".00001"
            value={formData.interestRate}
            onChange={handleChange}
          />
          <span
            name="interestRate"
            className={styles.error}
            aria-live="polite"
          ></span>
        </div>
        <div className={styles.numberInput}>
          <label>Length of loan (years):</label>
          <input
            id="yearsOfLoan"
            required
            type="number"
            min="0"
            value={formData.yearsOfLoan}
            onChange={handleChange}
          />
          <span
            name="yearsOfLoan"
            className={styles.error}
            aria-live="polite"
          ></span>
        </div>
        <div className={styles.numberInput}>
          <label>Property Tax Rate:</label>
          <input
            id="propertyTax"
            type="number"
            step=".00001"
            min="0"
            max="100"
            value={formData.propertyTax}
            onChange={handleChange}
          />
          <span
            name="propertyTax"
            className={styles.error}
            aria-live="polite"
          ></span>
        </div>
        <div className={styles.numberInput}>
          <label>Monthly Insurance:</label>
          <input
            id="insurance"
            type="number"
            min="0"
            step=".01"
            value={formData.insurance}
            onChange={handleChange}
          />
          <span
            name="insurance"
            className={styles.error}
            aria-live="polite"
          ></span>
        </div>
        <button type="submit" disabled={disableSubmit}>
          Calculate!
        </button>
      </form>
      <div className={styles.result}>
        <p>
          <strong>Monthly Payment Amount:</strong>
          <span> {monthlyPayment && `$${monthlyPayment?.toFixed(2)}`}</span>
        </p>
      </div>
    </>
  )
}

export default MonthlyPaymentCalculator

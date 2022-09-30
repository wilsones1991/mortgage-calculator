import DownPaymentCalculator from "./DownPaymentCalculator"
import MonthlyPaymentCalculator from "./MonthlyPaymentCalculator"
import PaymentsRemainingCalculator from "./PaymentsRemainingCalculator"

import styles from "./CalculatorFrame.module.css"

function CalculatorFrame() {
  return (
    <div className={styles.calculatorFrame}>
      <ul className={styles.tablist} role="tablist">
        <li id="monthly-payment-calculator-tab" className={styles.tab}>
          Monthly Payment Calculator
        </li>
        <li id="down-payment-calculator-tab" className={styles.tab}>
          Down Payment Calculator
        </li>
        <li id="payments-remaining-calculator-tab" className={styles.tab}>
          Payments Remaining Calculator
        </li>
      </ul>
      <MonthlyPaymentCalculator />
      <DownPaymentCalculator />
      <PaymentsRemainingCalculator />
    </div>
  )
}

export default CalculatorFrame

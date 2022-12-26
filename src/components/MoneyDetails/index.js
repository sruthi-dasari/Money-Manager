import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props
  return (
    <>
      <div className="card balance-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="logo"
        />
        <div className="sub-card">
          <p className="card-title">Your Balance</p>
          <p className="amount-text" testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="card income-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="logo"
        />
        <div className="sub-card">
          <p className="card-title">Your Income</p>
          <p className="amount-text" testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="card expenses-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="logo"
        />
        <div className="sub-card">
          <p className="card-title">Your Expenses</p>
          <p className="amount-text" testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </>
  )
}

export default MoneyDetails
// testid="expensesAmount"
// testid="incomeAmount"
// testid="balanceAmount"

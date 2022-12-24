import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    balanceAmount: 0,
    incomeAmount: 0,
    expensesAmount: 0,
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  removeTransaction = id => {
    const {transactionsList} = this.state

    const filteredTransactionsList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({transactionsList: filteredTransactionsList})
    const removedTransaction = transactionsList.find(
      eachTransaction => eachTransaction.id === id,
    )

    if (removedTransaction.type === 'Income') {
      this.setState(prevState => ({
        incomeAmount: prevState.incomeAmount - removedTransaction.amount,
        balanceAmount: prevState.balanceAmount - removedTransaction.amount,
        expensesAmount: prevState.expensesAmount,
      }))
    } else if (removedTransaction.type === 'Expenses') {
      this.setState(prevState => ({
        incomeAmount: prevState.incomeAmount,
        balanceAmount: prevState.balanceAmount + removedTransaction.amount,
        expensesAmount: prevState.expensesAmount - removedTransaction.amount,
      }))
    }
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amount: event.target.value})
  }

  onTypeChange = event => {
    this.setState({type: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()

    const {title, type} = this.state
    let {amount} = this.state

    amount = parseInt(amount)

    let newTransaction = {}

    if (type === 'INCOME') {
      this.setState(prevState => ({
        incomeAmount: prevState.incomeAmount + amount,
        balanceAmount: prevState.balanceAmount + amount,
        expensesAmount: prevState.expensesAmount,
      }))
      newTransaction = {
        id: uuidv4(),
        title,
        amount,
        type: 'Income',
      }
    } else if (type === 'EXPENSES') {
      this.setState(prevState => ({
        expensesAmount: prevState.expensesAmount + amount,
        balanceAmount: prevState.balanceAmount - amount,
        incomeAmount: prevState.incomeAmount,
      }))

      newTransaction = {
        id: uuidv4(),
        title,
        amount,
        type: 'Expenses',
      }
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      title: '',
      amount: '',
      type: '',
    }))
  }

  render() {
    const {
      balanceAmount,
      incomeAmount,
      expensesAmount,
      title,
      amount,
      type,
      transactionsList,
    } = this.state

    return (
      <div className="app-container">
        <div className="upper-container">
          <h1 className="name-text">Hi, Richard</h1>
          <p className="subtitle-text">
            Welcome back to your
            <span className="blue-text"> Money Manager</span>
          </p>
        </div>
        <ul className="moneyDetails-container">
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
        </ul>
        <div className="bottom-container">
          <div className="inputs-container">
            <h1 className="transaction-container-title">Add Transaction</h1>
            <form onSubmit={this.onAdd}>
              <label className="input-heading" htmlFor="title">
                TITLE
              </label>
              <input
                onChange={this.onTitleChange}
                value={title}
                className="input-box"
                placeholder="TITLE"
                id="title"
              />
              <label className="input-heading" htmlFor="amount">
                AMOUNT
              </label>
              <input
                onChange={this.onAmountChange}
                value={amount}
                className="input-box"
                placeholder="AMOUNT"
                id="amount"
              />
              <p className="input-heading">TYPE</p>
              <select
                onChange={this.onTypeChange}
                value={type}
                className="type-input"
              >
                {transactionTypeOptions.map(eachObj => (
                  <option key={eachObj.optionId} value={eachObj.optionId}>
                    {eachObj.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
          <ul className="history-container">
            <h1 className="history-container-title">History</h1>
            <li className="history-inputs-title-container">
              <p className="history-title">Title</p>
              <hr className="separator" />
              <p className="history-title">Amount</p>
              <hr className="separator" />
              <p className="history-title">Type</p>
              <hr className="separator" />
            </li>
            {transactionsList.map(eachTransaction => (
              <TransactionItem
                transactionDetails={eachTransaction}
                removeTransaction={this.removeTransaction}
                key={eachTransaction.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager

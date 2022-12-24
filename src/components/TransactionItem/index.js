import './index.css'

const TransactionItem = props => {
  const {transactionDetails, removeTransaction} = props
  const {title, amount, type} = transactionDetails

  const onClickDelete = () => {
    const {id} = transactionDetails
    removeTransaction(id)
  }

  return (
    <li className="list-item-container">
      <p className="history-text">{title}</p>
      <hr className="separator" />
      <p className="history-text">{amount}</p>
      <hr className="separator" />
      <p className="history-text">{type}</p>
      <hr className="separator" />
      <button
        className="delete-btn"
        type="button"
        onClick={onClickDelete}
        testid="delete"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem

//

import React, { useContext } from "react";
import { AppContext } from "../context/AppContex";
import { FiTrash2 } from "react-icons/fi";

const IncomeTransaction = () => {
  const { incomeData, deleteIncome } = useContext(AppContext);

  return (
    <div className="content-wrapper mt-10">
      <h1 className="history-title">
        Income Transactions
      </h1>

      {/* Empty State */}
      {incomeData.length === 0 && (
        <p className="empty-state mt-10">
          No income transactions found.
        </p>
      )}

      {/* Table */}
      {incomeData.length > 0 && (
        <div className="table-container table-scrollable">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Description</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {incomeData.map((transaction) => (
                <tr
                  key={transaction._id}
                >
                  <td>{transaction.title}</td>
                  <td style={{ textTransform: 'capitalize' }}>{transaction.category}</td>
                  <td>
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {transaction.description || '-'}
                  </td>
                  <td className="table-amount income">
                    ₹ {Number(transaction.amount).toLocaleString('en-IN')}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => deleteIncome(transaction._id)}
                      className="card-delete-button"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IncomeTransaction;

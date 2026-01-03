import React, { useContext } from "react";
import { AppContext } from "../context/AppContex";
import { FiTrash2 } from "react-icons/fi";

const ExpenseTransaction = () => {
  const { expenseData, deleteExpense } = useContext(AppContext);

  return (
    <div className="content-wrapper mt-14">
      <h1 className="history-title">
        Expense Transactions
      </h1>

      {/* Empty State */}
      {expenseData.length === 0 && (
        <p className="empty-state mt-10">
          No expense transactions found.
        </p>
      )}

      {/* Table */}
      {expenseData.length > 0 && (
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
              {expenseData.map((t) => (
                <tr key={t._id}>
                  <td>{t.title}</td>
                  <td style={{ textTransform: 'capitalize' }}>{t.category}</td>
                  <td>
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t.description || '-'}
                  </td>
                  <td className="table-amount expense">
                    ₹ {Number(t.amount).toLocaleString('en-IN')}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => deleteExpense(t._id)}
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

export default ExpenseTransaction;

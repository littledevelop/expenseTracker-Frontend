import React, { useContext } from "react";
import { AppContext } from "../context/AppContex";
import { FiTrash2 } from "react-icons/fi";

const ExpenseTransaction = () => {
  const { expenseData, deleteExpense } = useContext(AppContext);

  return (
    <div className="w-full p-4 mt-14">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Expense Transactions
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {expenseData.map((t) => (
              <tr key={t._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.title}</td>
                <td className="p-3">{t.category}</td>
                <td className="p-3">
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td className="p-3 capitalize">{t.type}</td>
                <td className="p-3 text-right font-semibold">
                  ₹ {t.amount}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteExpense(t._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {expenseData.map((t) => (
          <div
            key={t._id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{t.title}</h3>
              <button
                onClick={() => deleteExpense(t._id)}
                className="text-red-500"
              >
                <FiTrash2 />
              </button>
            </div>

            <p className="text-sm text-gray-500">{t.category}</p>
            <p className="text-sm">{new Date(t.date).toLocaleDateString()}</p>
            <p className="font-semibold mt-1">
              ₹ {t.amount} ({t.type})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransaction;

import React, { useContext } from "react";
import { AppContext } from "../context/AppContex";
import { FiTrash2 } from "react-icons/fi";

const IncomeTransaction = () => {
  const { incomeData, deleteIncome } = useContext(AppContext);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Income Transactions
      </h1>

      {/* Empty State */}
      {incomeData.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          No income transactions found.
        </p>
      )}

      {/* ✅ Desktop Table */}
      {incomeData.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {incomeData.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">{transaction.title}</td>
                  <td className="p-4">{transaction.category}</td>
                  <td className="p-4">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right font-semibold text-green-600">
                    ₹ {transaction.amount}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteIncome(transaction._id)}
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
      )}

      {/* ✅ Mobile Card View */}
      <div className="md:hidden space-y-4">
        {incomeData.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-start"
          >
            <div>
              <h2 className="font-semibold text-gray-800">
                {transaction.title}
              </h2>
              <p className="text-sm text-gray-500">
                {transaction.category}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
              <p className="text-green-600 font-bold mt-1">
                ₹ {transaction.amount}
              </p>
            </div>

            <button
              onClick={() => deleteIncome(transaction._id)}
              className="text-red-500 hover:text-red-700"
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeTransaction;

import React, { useContext } from "react";
import Chart from "../components/Chart";
import { AppContext } from "../context/AppContex";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";

const Dashboard = () => {
  const { incomeData, expenseData } = useContext(AppContext);

  const totalIncome = Array.isArray(incomeData)
    ? incomeData.reduce(
        (sum, item) => sum + Number(item.amount || item),
        0
      )
    : 0;

  const totalExpense = Array.isArray(expenseData)
    ? expenseData.reduce(
        (sum, item) => sum + Number(item.amount || item),
        0
      )
    : 0;

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Expense Tracker Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Manage your income and expenses efficiently and track your financial health.
        </p>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 min-h-[280px] sm:min-h-[350px]">
        <Chart
          key={incomeData.length + expenseData.length}
          IncomeData={incomeData}
          ExpenseData={expenseData}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Income */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Income</p>
              <p className="text-xl md:text-2xl font-bold text-green-600 mt-1">
                ₹{totalIncome.toLocaleString("en-IN")}
              </p>
            </div>
            <FaArrowUp className="text-green-500 text-2xl md:text-3xl" />
          </div>
        </div>

        {/* Expense */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Expense</p>
              <p className="text-xl md:text-2xl font-bold text-red-600 mt-1">
                ₹{totalExpense.toLocaleString("en-IN")}
              </p>
            </div>
            <FaArrowDown className="text-red-500 text-2xl md:text-3xl" />
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Balance</p>
              <p
                className={`text-xl md:text-2xl font-bold mt-1 ${
                  totalBalance < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                ₹{totalBalance.toLocaleString("en-IN")}
              </p>
            </div>
            <FaWallet className="text-blue-500 text-2xl md:text-3xl" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

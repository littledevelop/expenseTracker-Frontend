import React, { useContext } from "react";
import Chart from "../components/Chart";
import { AppContext } from "../context/AppContex";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";

const Dashboard = () => {
  const { incomeData, expenseData, userName } = useContext(AppContext);

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
    <div className="dashboard-container fade-in">
      
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Expense Tracker Dashboard
        </h1>
        {userName && (
          <p className="dashboard-welcome">
            Welcome back, <span className="dashboard-user-name">{userName}</span>! 👋
          </p>
        )}
        <p className="dashboard-subtitle">
          Manage your income and expenses efficiently and track your financial health.
        </p>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <Chart
          key={incomeData.length + expenseData.length}
          IncomeData={incomeData}
          ExpenseData={expenseData}
        />
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        
        {/* Income */}
        <div className="summary-card income">
          <div className="summary-card-content">
            <div>
              <p className="summary-card-label">Total Income</p>
              <p className="summary-card-amount income">
                ₹{totalIncome.toLocaleString("en-IN")}
              </p>
            </div>
            <FaArrowUp className="summary-card-icon income" />
          </div>
        </div>

        {/* Expense */}
        <div className="summary-card expense">
          <div className="summary-card-content">
            <div>
              <p className="summary-card-label">Total Expense</p>
              <p className="summary-card-amount expense">
                ₹{totalExpense.toLocaleString("en-IN")}
              </p>
            </div>
            <FaArrowDown className="summary-card-icon expense" />
          </div>
        </div>

        {/* Balance */}
        <div className="summary-card balance">
          <div className="summary-card-content">
            <div>
              <p className="summary-card-label">Total Balance</p>
              <p
                className={`summary-card-amount ${
                  totalBalance < 0 ? "balance-negative" : "balance-positive"
                }`}
              >
                ₹{totalBalance.toLocaleString("en-IN")}
              </p>
            </div>
            <FaWallet className="summary-card-icon balance" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

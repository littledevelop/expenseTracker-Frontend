import React, { useContext } from 'react'
import Chart from '../components/Chart';
import { AppContext } from '../context/AppContex';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';
const Dashboard = () => {
  const {incomeData, expenseData} = useContext(AppContext);

  const totalIncome = incomeData && Array.isArray(incomeData) ? incomeData.reduce((sum,item)=>sum + parseFloat(item.amount || item),0) : 0;
  const totalExpense = expenseData && Array.isArray(expenseData) ? expenseData.reduce((sum,item)=>sum + parseFloat(item.amount || item),0) : 0;

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="p-2 space-y-4">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Expense Tracker Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome to your personal expense tracker! Manage your finances with ease.</p>
      </div>
      <div className="min-h-[400px]">
        <Chart key={incomeData.length + expenseData.length} IncomeData={incomeData} ExpenseData={expenseData}/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500'>
          <div className="flex items-center justify-between">
            <div>
              <h1 className='font-bold text-lg md:text-xl text-gray-700'>Total Income</h1>
              <p className='text-2xl md:text-3xl text-green-600 font-bold mt-2'>${ totalIncome.toFixed(2) }</p>
            </div>
            <FaArrowUp className="text-green-500 text-3xl" />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500'>
          <div className="flex items-center justify-between">
            <div>
              <h1 className='font-bold text-lg md:text-xl text-gray-700'>Total Expense</h1>
              <p className='text-2xl md:text-3xl text-red-600 font-bold mt-2'>${ totalExpense.toFixed(2) }</p>
            </div>
            <FaArrowDown className="text-red-500 text-3xl" />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500 md:col-span-1'>
          <div className="flex items-center justify-between">
            <div>
              <h1 className='font-bold text-lg md:text-xl text-gray-700'>Total Balance</h1>
              <p className={`text-2xl md:text-3xl font-bold mt-2 ${totalBalance < 0 ? 'text-red-600' : 'text-green-600'}`}>${totalBalance.toFixed(2)}</p>
            </div>
            <FaWallet className="text-blue-500 text-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
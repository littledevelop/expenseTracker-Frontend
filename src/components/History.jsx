import React, { useContext, useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import {Chart as ChartJs, ArcElement, Tooltip, Legend, Title} from 'chart.js'
import { AppContext } from '../context/AppContex';
const History = () => {

  ChartJs.register(ArcElement, Tooltip, Legend, Title);
  const {incomeData,expenseData} = useContext(AppContext);

  const parsePrice = (price) =>{
    return typeof price === "number" ? price : parseFloat(price) || 0;
  }

  const [minIncome,setMinIncome] = useState(0)
  const [maxIncome,setMaxIncome] = useState(0)
  const [minExpense,setMinExpense] = useState(0)
  const [maxExpense,setMaxExpense] = useState(0)

  useEffect(()=>{
    const incomePrices = incomeData.map((item)=>parsePrice(item.amount));
    const expensePrices = expenseData.map((item)=>parsePrice(item.amount));

    setMinIncome(incomePrices.length ? Math.min(...incomePrices):0);
    setMaxIncome(incomePrices.length ? Math.max(...incomePrices) : 0 );
    setMinExpense(expensePrices.length ? Math.min(...expensePrices):0);
    setMaxExpense(expensePrices.length ? Math.max(...expensePrices):0);
  },[incomeData, expenseData]);


  const chartData={
    labels:[
      "Total Income",
      "Total Expense",
      "Min Income",
      "Max Income",
      "Min Expense",
      "Max Expense",
    ],
    datasets:[{
      data:[
          incomeData.reduce((sum,item)=> sum + parsePrice(item.amount),0),
          expenseData.reduce((sum,item)=>sum + parsePrice(item.amount),0),
          minIncome,
          maxIncome,
          minExpense,
          maxExpense
      ],
      backgroundColor:[
        "#36A2EB", //TotalIncome
        "#FF6384", //TotalExpense
        "#48C0C0",//minIncome
        "#FFCE56",//maxIncome
        "#9966FF",//minExpense
        "#FF9F40",//maxExpense
      ],
      hoverBackgroundColor:[
        "#66B3FF",
        "#FF6F91",
        "#70D808",
        "#FFD966",
        "#838FFF",
        "#FFB673",
      ]
    }
    ],
  }


  const chartOptions={
    responsive:true,
    plugins:{
      title:{
        display:true,
        text:"Income and Expense Breakdown"
      },
      legend:{
        position:"bottom"
      }
    }
  }

  return (
    <div className='w-full mx-auto p-4'>
      <h1 className='text-2xl md:text-3xl font-semibold text-center mb-6'>Transaction History</h1>

      {/* Chart Section */}
      <div className='mb-8 bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Spend Overview</h2>
        <div className='h-80 md:h-96'>
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Income History */}
      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-4 text-green-600'>Income Transactions</h2>
        <div className='space-y-2 max-h-60 overflow-y-auto'>
          {incomeData.length > 0 ? incomeData.map((item,index)=>(
            <div key={`income-${index}`} className='flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg'>
              <div className='flex flex-col'>
                <h1 className='text-sm font-medium text-gray-800'>{item.title}</h1>
                <p className='text-sm text-gray-600'>Income</p>
              </div>
              <div className='text-sm font-semibold text-green-600'>
                +${parsePrice(item.amount).toFixed(2)}
              </div>
            </div>
          )) : <p className='text-gray-500 text-center'>No income transactions yet.</p>}
        </div>
      </div>

      {/* Expense History */}
      <div className='mb-6'>
        <h2 className='text-sm font-semibold mb-4 text-red-600'>Expense Transactions</h2>
        <div className='space-y-2 max-h-60 overflow-y-auto'>
          {expenseData.length > 0 ? expenseData.map((item,index)=>(
            <div key={`expense-${index}`} className='flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-lg'>
              <div className="flex flex-col">
                <h1 className='text-sm font-medium text-gray-800'>{item.title}</h1>
                <p className='text-sm text-gray-600'>Expense</p>
              </div>
              <div className='text-sm font-semibold text-red-600'>
                -${parsePrice(item.amount).toFixed(2)}
              </div>
            </div>
          )) : <p className='text-gray-500 text-center'>No expense transactions yet.</p>}
        </div>
      </div>

    </div>
  )
}

export default History
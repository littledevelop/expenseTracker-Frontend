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
    <div className='history-container'>
      <h1 className='history-title'>Transaction History</h1>

      {/* Chart Section */}
      <div className='chart-section'>
        <h2 className='chart-title'>Spend Overview</h2>
        <div className='chart-wrapper'>
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Income History */}
      <div className='transaction-section'>
        <h2 className='transaction-section-title income'>Income Transactions</h2>
        <div className='transaction-list'>
          {incomeData.length > 0 ? incomeData.map((item,index)=>(
            <div key={`income-${index}`} className='transaction-item income'>
              <div className='transaction-item-info'>
                <h1 className='transaction-item-title'>{item.title}</h1>
                <p className='transaction-item-type'>Income</p>
              </div>
              <div className='transaction-item-amount income'>
                +${parsePrice(item.amount).toFixed(2)}
              </div>
            </div>
          )) : <p className='empty-state'>No income transactions yet.</p>}
        </div>
      </div>

      {/* Expense History */}
      <div className='transaction-section'>
        <h2 className='transaction-section-title expense'>Expense Transactions</h2>
        <div className='transaction-list'>
          {expenseData.length > 0 ? expenseData.map((item,index)=>(
            <div key={`expense-${index}`} className='transaction-item expense'>
              <div className="transaction-item-info">
                <h1 className='transaction-item-title'>{item.title}</h1>
                <p className='transaction-item-type'>Expense</p>
              </div>
              <div className='transaction-item-amount expense'>
                -${parsePrice(item.amount).toFixed(2)}
              </div>
            </div>
          )) : <p className='empty-state'>No expense transactions yet.</p>}
        </div>
      </div>

    </div>
  )
}

export default History
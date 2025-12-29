import React, { useContext } from 'react'
import logo from '../assets/logo.jpeg';
import {GoGraph} from 'react-icons/go';
import {FaRegCreditCard} from 'react-icons/fa';
import {FaMoneyBillTrendUp} from 'react-icons/fa6';
import {GiExpense} from 'react-icons/gi';
import {IoLogOut} from 'react-icons/io5';
import { FaArrowsDownToLine,FaArrowsUpToLine } from 'react-icons/fa6';
import { AppContext } from '../context/AppContex';
import { NavLink, useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
const Sidebar = ({ onClose }) => {
  const {token,setToken} = useContext(AppContext);
  const navigate = useNavigate();
  
  
  const handleLogOut=()=>{
    setToken(null);
    cookie.remove("token",{path:'/'});
    navigate("/login");
  }
  
  return (
    <div className='bg-gradient-to-b from-green-800 to-green-800 h-screen relative'>
      {/* Close button for mobile */}
      <button
        className="lg:hidden absolute top-4 right-4 text-white"
        onClick={onClose}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className='mt-3 py-2 px-2'>
        <img src={logo} alt="Expense Tracker Logo" onClick={()=>navigate("/")} className='mt-1 w-full hidden md:block flex items-center justify-center '/>
        <img src={logo} alt="Expense Tracker Logo" onClick={()=>navigate("/")} className='w-12 block md:hidden'/>
      </div>

      <div className='flex flex-row items-center lg:hover:bg-red-500 border-red-500 justify-center gap-5 py-2 px-2'>
        <NavLink to={"/"} onClick={onClose} className="w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
          <GoGraph className='text-2xl text-white'/>
          <p className='text-lg font-semibold hidden md:block text-white'>Dashboard</p>
        </NavLink>
      </div>

      <div className='flex flex-row items-center lg:hover:bg-red-500 border-red-500 justify-center gap-5 py-2 px-2'>
        <NavLink to={"/view-transaction"} onClick={onClose} className="w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
          <FaRegCreditCard className='text-2xl text-white'/>
          <p className='text-lg font-semibold hidden md:block text-white'>Transaction</p>
        </NavLink>
      </div>

      <div className='flex flex-row items-center lg:hover:bg-red-500 border-red-500 justify-center gap-5 py-2 px-2'>
        <NavLink to={"/income-transaction"} onClick={onClose} className="w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
          <FaArrowsDownToLine className='text-2xl text-white'/>
          <p className='text-lg font-semibold hidden md:block text-white'>Income History</p>
        </NavLink>
      </div>

      <div className='flex flex-row items-center lg:hover:bg-red-500 border-red-500 justify-center gap-5 py-2 px-2'>
        <NavLink to={"/expense-transaction"} onClick={onClose} className="w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
          <FaArrowsUpToLine className='text-2xl text-white'/>
          <p className='text-lg font-semibold hidden md:block text-white'>Expense History</p>
        </NavLink>
      </div>

      <div className='flex flex-row items-center lg:hover:bg-red-500 border-red-500 justify-center gap-5 py-2 px-2'>
        <NavLink to={"/add-income"} onClick={onClose} className="w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
          <FaMoneyBillTrendUp className='text-2xl text-white'/>
          <p className='text-lg font-semibold hidden md:block text-white'>Income</p>
        </NavLink>
      </div>

      <div className='flex flex-row items-center lg:hover:bg-red-500 border-red-500 justify-center gap-5 py-2 px-2'>
        <NavLink to={"/add-expense"} onClick={onClose} className="w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
          <GiExpense className='text-2xl text-white'/>
          <p className='text-lg font-semibold hidden md:block text-white'>Expense</p>
        </NavLink>
      </div>

      <div className='flex flex-row items-center lg:hover:bg-red-500 border-red-500 justify-center gap-5 py-2 px-2'>
        {token ? (
          <button onClick={() => { handleLogOut()}} className="w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
            <IoLogOut className='text-2xl text-white'/>
            <p className='text-lg font-semibold hidden md:block text-white'>LogOut</p>
          </button>
        ) : (
          <NavLink to="/login"  className="w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
            <IoLogOut className='text-2xl text-white'/>
            <p className='text-lg font-semibold hidden md:block text-white'>LogIn</p>
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Sidebar

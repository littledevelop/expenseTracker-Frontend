import React, { useContext } from "react";
import logo from "../assets/logo.jpeg";
import { GoGraph } from "react-icons/go";
import { FaRegCreditCard } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { FaArrowsDownToLine, FaArrowsUpToLine } from "react-icons/fa6";
import { AppContext } from "../context/AppContex";
import { NavLink, useNavigate } from "react-router-dom";
import cookie from "js-cookie";

// Config outside component
const menuItems = [
  { to: "/", icon: GoGraph, label: "Dashboard" },
  { to: "/view-transaction", icon: FaRegCreditCard, label: "Transaction" },
  { to: "/income-transaction", icon: FaArrowsDownToLine, label: "Income History" },
  { to: "/expense-transaction", icon: FaArrowsUpToLine, label: "Expense History" },
  { to: "/add-income", icon: FaMoneyBillTrendUp, label: "Income" },
  { to: "/add-expense", icon: GiExpense, label: "Expense" },
];

// Reusable MenuItem
const MenuItem = ({ to, Icon, label, onClose }) => (
  <NavLink
    to={to}
    onClick={onClose}
    className={({ isActive }) =>
      `w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer 
       ${isActive ? "bg-red-600" : "lg:hover:bg-red-500"}`
    }
  >
    <Icon className="text-2xl text-white" />
    <p className="text-lg font-semibold hidden md:block text-white">{label}</p>
  </NavLink>
);

const Sidebar = ({ onClose }) => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setToken(null);
    cookie.remove("token", { path: "/" });
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-b from-green-800 to-green-800 h-screen relative">
      {/* Close button for mobile */}
      <button
        className="lg:hidden absolute top-4 right-4 text-white"
        onClick={onClose}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Logo */}
      <div className="mt-3 py-2 px-2">
        <img
          src={logo}
          alt="Expense Tracker Logo"
          onClick={() => navigate("/")}
          className="mt-1 w-full hidden md:block cursor-pointer"
        />
        <img
          src={logo}
          alt="Expense Tracker Logo"
          onClick={() => navigate("/")}
          className="w-12 block md:hidden cursor-pointer"
        />
      </div>

      {/* Menu Items */}
      {menuItems.map(({ to, icon: Icon, label }) => (
        <div key={to} className="flex flex-row items-center justify-center gap-5 py-2 px-2">
          <MenuItem to={to} Icon={Icon} label={label} onClose={onClose} />
        </div>
      ))}

      {/* Auth Action */}
      <div className="flex flex-row items-center justify-center gap-5 py-2 px-2">
        {token ? (
          <button
            onClick={handleLogOut}
            className="w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer lg:hover:bg-red-500"
          >
            <IoLogOut className="text-2xl text-white" />
            <p className="text-lg font-semibold hidden md:block text-white">LogOut</p>
          </button>
        ) : (
          <NavLink
            to="/login"
            className="w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer lg:hover:bg-red-500"
          >
            <IoLogOut className="text-2xl text-white" />
            <p className="text-lg font-semibold hidden md:block text-white">LogIn</p>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
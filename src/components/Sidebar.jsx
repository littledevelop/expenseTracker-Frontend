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

const menuItems = [
  { to: "/", Icon: GoGraph, label: "Dashboard" },
  { to: "/view-transaction", Icon: FaRegCreditCard, label: "Transactions" },
  { to: "/income-transaction", Icon: FaArrowsDownToLine, label: "Income History" },
  { to: "/expense-transaction", Icon: FaArrowsUpToLine, label: "Expense History" },
  { to: "/add-income", Icon: FaMoneyBillTrendUp, label: "Add Income" },
  { to: "/add-expense", Icon: GiExpense, label: "Add Expense" },
];

const MenuItem = ({ to, Icon, label, onClose }) => (
  <NavLink
    to={to}
    onClick={onClose}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition
       ${isActive ? "bg-red-600" : "hover:bg-red-500"}`
    }
  >
    <Icon className="text-xl text-white" />
    <span className="text-white text-sm font-medium hidden md:block">
      {label}
    </span>
  </NavLink>
);

const Sidebar = ({ isOpen, onClose }) => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    cookie.remove("token", { path: "/" });
    navigate("/login");
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-green-800 to-green-700
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-4">
          <img
            src={logo}
            alt="Expense Tracker"
            className="w-32 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1 px-2">
          {menuItems.map((item) => (
            <MenuItem key={item.to} {...item} onClose={onClose} />
          ))}
        </nav>

        {/* Auth */}
        <div className="absolute bottom-4 w-full px-2">
          {token ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-500"
            >
              <IoLogOut className="text-xl text-white" />
              <span className="text-white text-sm hidden md:block">
                Logout
              </span>
            </button>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-500"
            >
              <IoLogOut className="text-xl text-white" />
              <span className="text-white text-sm hidden md:block">
                Login
              </span>
            </NavLink>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
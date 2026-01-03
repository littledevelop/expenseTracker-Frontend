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
      `menu-item ${isActive ? "active" : ""}`
    }
  >
    <Icon className="menu-item-icon" />
    <span className="menu-item-text">
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
    cookie.remove("userName", { path: "/" });
    navigate("/login");
  };

  return (
    <>
      {/* Logo */}
      <div className="sidebar-logo">
        <img
          src={logo}
          alt="Expense Tracker"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Menu */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <MenuItem key={item.to} {...item} onClose={onClose} />
        ))}
      </nav>

      {/* Auth */}
      <div className="sidebar-logout">
        {token ? (
          <button
            onClick={handleLogout}
            className="menu-item menu-item-logout"
          >
            <IoLogOut className="menu-item-icon" />
            <span className="menu-item-text">
              Logout
            </span>
          </button>
        ) : (
          <NavLink
            to="/login"
            className="menu-item"
          >
            <IoLogOut className="menu-item-icon" />
            <span className="menu-item-text">
              Login
            </span>
          </NavLink>
        )}
      </div>
    </>
  );
};

export default Sidebar;
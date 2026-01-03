import "./styles/main.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppContex";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import History from "./components/History";
import ViewTransaction from "./pages/ViewTransaction";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import IncomeTransaction from "./pages/IncomeTransaction";
import ExpenseTransaction from "./pages/ExpenseTransaction";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const location = useLocation();
  const { token, fetchIncomeData, fetchExpenseData } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLogin = !!token;

  const hideMainLayout = [
    "/view-transaction",
    "/add-income",
    "/add-expense",
    "/income-transaction",
    "/expense-transaction",
    "/login",
    "/register",
    "/forgotPassword",
  ].includes(location.pathname);

  useEffect(() => {
    if (token) {
      setSidebarOpen(true);
      fetchIncomeData();
      fetchExpenseData();
    }
  }, [token, fetchIncomeData, fetchExpenseData]);

  return (
    <div className="app-container">
      <ToastContainer />

      {isLogin ? (
        <>
          {/* Sidebar */}
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Hamburger */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          {/* Main */}
          <div className="main-content">
            {!hideMainLayout ? (
              <div className="layout-row">
                <div className="layout-main">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                  </Routes>
                </div>
                <div className="layout-sidebar">
                  <Routes>
                    <Route path="/" element={<History />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <div className="content-wrapper">
                <Routes>
                  <Route path="/view-transaction" element={<ViewTransaction />} />
                  <Route path="/add-income" element={<Income />} />
                  <Route path="/add-expense" element={<Expenses />} />
                  <Route
                    path="/income-transaction"
                    element={<IncomeTransaction fetchIncomeData={fetchIncomeData} />}
                  />
                  <Route
                    path="/expense-transaction"
                    element={<ExpenseTransaction fetchExpenseData={fetchExpenseData} />}
                  />
                  <Route path="/login" element={<Login/>}/>
                </Routes>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Auth Routes */
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;

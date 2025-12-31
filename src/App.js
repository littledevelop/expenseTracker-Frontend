import "./App.css";
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
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />

      {isLogin ? (
        <>
          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 transition-transform duration-300`}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Hamburger */}
          <button
            className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-blue-500 text-white rounded"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          {/* Main */}
          <div className="lg:ml-64">
            {!hideMainLayout ? (
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-4">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                  </Routes>
                </div>
                <div className="lg:w-1/3 p-4">
                  <Routes>
                    <Route path="/" element={<History />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <div className="p-4">
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
        <div className="p-4">
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

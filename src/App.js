// import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './context/AppContex';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './components/History';
import ViewTransaction from './pages/ViewTransaction';
import Income from './pages/Income';
import Expenses from './pages/Expenses';  
import IncomeTransaction from './pages/IncomeTransaction';
import ExpenseTransaction from './pages/ExpenseTransaction';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
function App() {
  const location= useLocation();
  const {token,fetchIncomeData,fetchExpenseData} = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hideMainLayout =['/view-transaction','/add-income','/add-expense','/income-transaction','/expense-transaction','/login','/register'].includes(location.pathname);

  const [isLogin , setIsLogin] = useState(false);

  useEffect(() => {
    if(token){
      setIsLogin(true)
      setSidebarOpen(true)
      fetchIncomeData();
      fetchExpenseData();
    } 
  },[token,location.pathname,fetchIncomeData,fetchExpenseData]);

return (
  <div className="min-h-screen bg-gray-100">
    {isLogin ? (
      <>
        <ToastContainer />
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Hamburger menu for mobile */}
        <button
          className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-blue-500 text-white rounded"
          onClick={() => setSidebarOpen(true)}
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Main Content */}
        <div className="lg:ml-64 transition-all duration-300">
          {!hideMainLayout ? (
            <div className="flex flex-col lg:flex-row w-full overflow-auto">
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
            <div className="flex-1 p-4 max-h-screen w-full overflow-auto">
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
                <Route path='/forgotPassword' element={<ForgotPassword/>}/>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          )}
        </div>
      </>
    ) : (
      <div className="flex-1 p-4 max-h-screen w-full overflow-auto">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      </Routes>
      </div>
    )}
  </div>
);
}

export default App;

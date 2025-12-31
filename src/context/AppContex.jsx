import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";
import {toast} from 'react-toastify';
export const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const navigate = useNavigate();
    const [expenseData, setExpenseData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);
    const [token,setToken]= useState(Boolean(cookie.get("token") || null));
    // const backendUrl = "http://localhost:5000"; //local
    // const backendUrl = "https://expensetracker-backend-zw1n.onrender.com"; //live
    // const API = process.env.REACT_APP_API_URL;//live
    const API =
  process.env.REACT_APP_ENV === "production"
    ? "https://expense-backend.onrender.com"
    : "http://localhost:5000";

    const utoken = cookie.get("token") || null;

    const fetchIncomeData = useCallback(async() => {
        try{
            if(!utoken){
                return;
            }
            const {data} = await axios.get(`${API}/api/get-income`,{
                headers:{
                    "Authorization": `Bearer ${utoken}`
                }});

            if(data.success){
                setIncomeData(data.data);
            }
        }catch(err){
            console.log(err);
        }
    }, [utoken, API]);

    const fetchExpenseData = useCallback(async() => {
        try{
            if(!utoken){
                return;
            }
            const {data} = await axios.get(`${API}/api/get-expense`,{
                headers:{
                    "Authorization": `Bearer ${utoken}`
                }});

            if(data.success){
                setExpenseData(data.data);
            }
        }catch(err){
            console.log(err);
        }
    }, [utoken, API]);

    const ForgotPassword = async(email)=>{
        try{
            const {data} = await axios.post(`${API}/api/forgotPassword`,{email},{
                headers:{
                    "content-type":"application/json",
                }
            });
            if(data.success){
                toast.success(data.message || "Check your email for reset link");
            }

        }catch(error){
            console.log(error);
        }
    }

    const ResetPassword= async(token,password)=>{
        try{
            const {data} = await axios.put(`${API}/api/resetPassword/${token}`,{password},{
                headers:{
                    "Content-Type":"application/json",
                }
            });
            if(data.success){
                toast.success(data.message || "Check your password for Reset Password");
                navigate("/");
            }
            else{
                toast.error("Something Wrong");
            }

        }catch(err){
            console.log(err)
        }
    }

    const addIncome = async(title,amount,category,date,description) => {
        try{
            const {data} = await axios.post(`${API}/api/add-income`,{title,amount,type: "income",category,date,description},{
                headers:{
                    "Authorization": `Bearer ${utoken}`
                }
            });

            if(data.success){
                toast.success(data.message || "Income added successfully");
                fetchIncomeData();
                navigate("/");
            }
        }catch(err){
            console.log(err);
        }
    }   
    

    const addExpense = async(title,amount,category,date,description) => {
        try{
            const {data} = await axios.post(`${API}/api/add-expense`,{title,amount,type: "expense",category,date,description},{
                headers:{
                    "Authorization": `Bearer ${utoken}`
                }
            });
            if(data.success){
                toast.success(data.message || "Expense added successfully");
                fetchExpenseData();
                navigate("/");
            }
        }catch(err){
            console.log(err);
        }
    }

    const deleteIncome = async(id) => {
        try{
            const {data} = await axios.delete(`${API}/api/delete-income/${id}`,{
                headers:{
                    "Authorization": `Bearer ${utoken}`
                }
            });

            if(data.success){
                toast.success(data.message || "Income deleted successfully");
                fetchIncomeData();
            }
        }catch(err){
            console.log(err);
        }
    }

    const deleteExpense = async(id) => {
        try{
            const {data} = await axios.delete(`${API}/api/delete-expense/${id}`,{
                headers:{
                    "Authorization": `Bearer ${utoken}`
                }
            });

            if(data.success){
                toast.success(data.message || "Expense deleted successfully");
                fetchExpenseData();
            }
        }catch(err){
            console.log(err);
        }
    }

    const updateIncome = async(id, title, amount, category, date, description) => {
        try{
            const {data} = await axios.put(`${API}/api/update-income/${id}`, {title, amount, type: "income", category, date, description},{
                headers:{
                    "Authorization": `Bearer ${utoken}`
                }
            });

            if(data.success){
                toast.success(data.message || "Income updated successfully");
                fetchIncomeData();
            }
        }catch(err){
            console.log(err);
        }
    }

    const updateExpense = async(id, title, amount, category, date, description) => {
        try{
            const {data} = await axios.put(`${API}/api/update-expense/${id}`, {title, amount, type: "expense", category, date, description},{
                headers:{
                    "Authorization": `Bearer ${utoken}`
                }
            });

            if(data.success){
                toast.success(data.message || "Expense updated successfully");
                fetchExpenseData();
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleRegister = async(name,email,password) => {
        try{

            const {data} = await axios.post(`${API}/api/register`,{name,email,password},{
                headers:{
                    "content-type":"application/json",
                }
            });

            if(data.success){
                cookie.set("token",data.token,{expires:7});
                setToken(true);
                fetchIncomeData();
                fetchExpenseData();
                toast.success(data.message || "Registeration Successful");
                navigate("/");
            }


        }catch(err){
            console.log("Something Wrong");
            console.log(err);
        }
    }

  const handleLogin = async (email, password) => {
  try {
    const { data } = await axios.post(`${API}/api/login`,{ email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.success) {
      // Store JWT
      cookie.set("token", data.token, {
        expires: 7,
        sameSite: "lax",
        secure: false, // set true in production (HTTPS)
      });

      // Store token in state (NOT boolean)
      setToken(data.token);

      // Fetch protected data
      fetchIncomeData();
      fetchExpenseData();

      toast.success(data.message || "Login Successful");
      navigate("/");
    } else {
      toast.error(data.message || "Invalid credentials");
    }
  } catch (err) {
    console.error("Login error:", err);

    toast.error(
      err.response?.data?.message || "Server error, please try again"
    );
  }
};


    useEffect(() => {   
        fetchIncomeData();
        fetchExpenseData();
    },[fetchIncomeData, fetchExpenseData]);

    useEffect(() => {
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.get("token")}`;
        }else{
            delete axios.defaults.headers.common['Authorization'];
        }
    },[token]);

    const value ={
        API,
        handleRegister,
        handleLogin,
        fetchIncomeData,
        fetchExpenseData,
        addIncome,
        addExpense,
        updateIncome,
        updateExpense,
        deleteIncome,
        deleteExpense,
        expenseData,
        incomeData,
        token,
        setToken,
        ForgotPassword,
        ResetPassword
    }


    return <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider> 
}

export default AppContextProvider;
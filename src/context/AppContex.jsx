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
    const backendUrl = "http://localhost:5000";
    const utoken = cookie.get("token") || null;

    const fetchIncomeData = useCallback(async() => {
        try{
            if(!utoken){
                return;
            }
            const {data} = await axios.get(`${backendUrl}/api/get-income`,{
                headers:{
                    "Authorization": `Bearer ${utoken}`
                }});

            if(data.success){
                setIncomeData(data.data);
            }
        }catch(err){
            console.log(err);
        }
    }, [utoken, backendUrl]);

    const fetchExpenseData = useCallback(async() => {
        try{
            if(!utoken){
                return;
            }
            const {data} = await axios.get(`${backendUrl}/api/get-expense`,{
                headers:{
                    "Authorization": `Bearer ${utoken}`
                }});

            if(data.success){
                setExpenseData(data.data);
            }
        }catch(err){
            console.log(err);
        }
    }, [utoken, backendUrl]);

    const ForgotPassword = async(email)=>{
        try{
            const {data} = await axios.post(`${backendUrl}/api/forgotPassword`,{email},{
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

    const ResetPassword= async(password)=>{
        try{
            
            const {data} = await axios.put(`${backendUrl}/api/resetPassword`,{password},{
                headers:{
                    "Content-Type":"application/json",
                }
            });
            if(data.success){
                toast.success(data.message || "Check your password for Reset Password");
            }

        }catch(err){
            console.log(err)
        }
    }

    const addIncome = async(title,amount,category,date,description) => {
        try{
            const {data} = await axios.post(`${backendUrl}/api/add-income`,{title,amount,type: "income",category,date,description},{
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
            const {data} = await axios.post(`${backendUrl}/api/add-expense`,{title,amount,type: "expense",category,date,description},{
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
            const {data} = await axios.delete(`${backendUrl}/api/delete-income/${id}`,{
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
            const {data} = await axios.delete(`${backendUrl}/api/delete-expense/${id}`,{
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
            const {data} = await axios.put(`${backendUrl}/api/update-income/${id}`, {title, amount, type: "income", category, date, description},{
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
            const {data} = await axios.put(`${backendUrl}/api/update-expense/${id}`, {title, amount, type: "expense", category, date, description},{
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

            const {data} = await axios.post(`${backendUrl}/api/register`,{name,email,password},{
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

    const handleLogin = async(email,password) => {
        try{
            const {data} = await axios.post(`${backendUrl}/api/login`,{email,password},{
                headers:{
                    "content-type":"application/json",
                }
            });
            if(data.success){
                cookie.set("token",data.token,{expires:7});
                setToken(true);
                fetchIncomeData();
                fetchExpenseData();
                toast.success(data.message || "Login Successful");
                navigate("/");
            }

        }catch(err){
            console.log(err);
        }
    }

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
        backendUrl,
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
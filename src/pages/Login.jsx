import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContex";
const Login = () => {
  const Navigate = useNavigate();

  const { handleLogin } = useContext(AppContext);

  const [isModal, setIsModal] = useState(true);

  const [formData, setFormData] = useState({ email: "", password: "" });


  const handleChange=(e)=>{
    const {name,value} = e.target;
    setFormData((prev)=>({...prev,[name]:value }));
  }

  const handleSubmit= (e)=>{
    e.preventDefault();
     handleLogin(formData.email,formData.password);
     setIsModal(false)
     Navigate("/")
  }

  const handleModal = ()=>{
    setIsModal(false)
    Navigate("/")
  }

  return (
    <>
      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold">Login</h2>
              <button onClick={handleModal} className="text-gray-600 hover:text-gray-900 text-xl">
                &times;
              </button>
            </div>

            <form action="" className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  required
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base font-semibold">Login</button>

              <p className="text-sm md:text-base text-center mt-4">Don&apos;t Have an Account ?{" "}
              <button type="button" onClick={()=>Navigate("/register")} className="text-blue-500 hover:underline"> Register </button></p>

              <p className="text-sm md:text-base text-center mt-4"> 
              <button type="button" onClick={()=>Navigate("/forgotPassword")} className="text-blue-500 hover:underline">Forgot Password</button>
              </p>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

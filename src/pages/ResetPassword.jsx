import React,{ useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContex";
const ResetPassword = () => {
    const [password,setPassword] = useState("")
    const [isModal,setIsModal] = useState(true);
    const {ResetPassword} = useContext(AppContext);
  const Navigate = useNavigate();
    const handleModal = ()=>{
        setIsModal(false);
        Navigate("/");
    }
    const handleSubmit= async (e)=>{
      e.preventDefault();
     ResetPassword(password);
      setIsModal(false)
      Navigate("/login")

    }
  return (
    <>
    {isModal && 
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Reset Password</h2>
            <button
              onClick={handleModal}
              className="text-gray-600 hover:text-gray-900 text-xl"
            >
              &times;
            </button>

            <form
              action=""
              className="space-y-4"
              onSubmit={handleSubmit}
            >
                <div>
                <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  required
                />
              </div>

                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base font-semibold">Send Reset Link</button>


            </form>
          </div>
        </div>
      </div>
    }
    </>
  );
};

export default ResetPassword;

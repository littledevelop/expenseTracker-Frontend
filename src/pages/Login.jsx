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
  }

  const handleModal = ()=>{
    setIsModal(false)
    Navigate("/")
  }

  return (
    <>
      {isModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Login</h2>
              <button onClick={handleModal} className="modal-close">
                &times;
              </button>
            </div>

            <form action="" className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="form-button">Login</button>

              <p className="modal-text">
                Don&apos;t Have an Account ?{" "}
                <button type="button" onClick={()=>Navigate("/register")} className="modal-link"> Register </button>
              </p>

              <p className="modal-text"> 
                <button type="button" onClick={()=>Navigate("/forgotPassword")} className="modal-link">Forgot Password</button>
              </p>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

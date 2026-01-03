import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContex";

const Register = () => {
  const Navigate = useNavigate();

  const [isModal, setIsModal] = useState(true);

  const { handleRegister } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleModal = () => {
    setIsModal(false);
    Navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleRegister(formData.name, formData.email, formData.password);
    setIsModal(false);
    Navigate("/");
  };

  return (
    <>
      {isModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Register</h2>
              <button
                onClick={handleModal}
                className="modal-close"
              >
                &times;
              </button>
            </div>

            <form action="" onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-input"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="form-button green"
              >
                Register
              </button>

              <p className="modal-text">
                Already Have An Account ?{" "}
                <button
                  type="button"
                  className="modal-link"
                  onClick={() => Navigate("/login")}
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;

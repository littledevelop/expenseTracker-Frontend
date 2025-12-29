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
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold">Register</h2>
              <button
                onClick={handleModal}
                className="text-gray-600 hover:text-gray-900 text-xl"
              >
                &times;
              </button>
            </div>

            <form action="" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm md:text-base font-semibold"
              >
                Register
              </button>

              <p className="text-sm md:text-base text-center mt-4">
                Already Have An Account ?{" "}
                <button
                  type="button"
                  className="text-blue-500 hover:underline"
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

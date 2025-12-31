import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContex";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [isModal, setIsModal] = useState(true);

  const { ResetPassword } = useContext(AppContext);
  const { token } = useParams();
  const navigate = useNavigate();
  const handleModal = () => {
    setIsModal(false);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ResetPassword(token, password);
  };

  return (
    <>
      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Reset Password</h2>
              <button
                onClick={handleModal}
                className="text-gray-600 hover:text-gray-900 text-xl"
              >
                &times;
              </button>
            </div>

            {/* Debug token */}
            <p className="text-xs text-gray-500 mb-3 break-all">
              Token: {token}
            </p>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Reset Password
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;

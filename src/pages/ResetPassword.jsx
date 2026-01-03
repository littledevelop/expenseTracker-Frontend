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
        <div className="modal-overlay">
          <div className="modal">

            {/* Header */}
            <div className="modal-header">
              <h2 className="modal-title">Reset Password</h2>
              <button
                onClick={handleModal}
                className="modal-close"
              >
                &times;
              </button>
            </div>

            {/* Debug token */}
            <p className="text-xs" style={{ color: 'var(--gray-500)', marginBottom: '0.75rem', wordBreak: 'break-all' }}>
              Token: {token}
            </p>

            {/* Form */}
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <button
                type="submit"
                className="form-button"
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

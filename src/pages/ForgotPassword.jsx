import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContex";
import "../styles/forgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(true);

  const { ForgotPassword } = useContext(AppContext);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModal(false);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ForgotPassword(email);
      alert("Reset link sent to your email");
      closeModal();
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isModal) return null;

  return (
    <div className="fp-overlay">
      <div className="fp-modal">
        <button className="fp-close" onClick={closeModal}>×</button>

        <h2 className="fp-title">Forgot Password</h2>

        <form className="fp-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

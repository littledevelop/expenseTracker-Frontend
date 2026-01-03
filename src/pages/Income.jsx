import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContex";

const Income = () => {
  const { addIncome } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = Number(formData.amount);
    if (amount <= 0) return;

    addIncome(
      formData.title,
      amount,
      formData.category,
      formData.date,
      formData.description
    );

    // Reset form after submit
    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
      date: "",
    });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">
        Add Income
      </h1>

      <form className="form" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Salary / Freelance / Bonus"
            className="form-input"
            required
          />
        </div>

        {/* Amount */}
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="amount"
            min="1"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="form-input"
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="salary">Salary</option>
            <option value="business">Business</option>
            <option value="investment">Investment</option>
            <option value="freelance">Freelance</option>
            <option value="rental">Rental</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional notes"
            className="form-textarea"
          />
        </div>

        {/* Date */}
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="form-button"
        >
          Add Income
        </button>
      </form>
    </div>
  );
};

export default Income;

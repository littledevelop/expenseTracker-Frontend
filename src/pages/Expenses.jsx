import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContex";

const Expenses = () => {
  const { addExpense } = useContext(AppContext);

  const initialState = {
    title: "",
    amount: "",
    type: "",
    description: "",
    date: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = Number(formData.amount);
    if (amount <= 0) return;

    addExpense(
      formData.title,
      amount,
      formData.type,
      formData.date,
      formData.description
    );

    setFormData(initialState); // reset form
  };

  return (
    <div className="form-container">
      
      <h1 className="form-title">
        Add Expense
      </h1>

      <form onSubmit={handleSubmit} className="form">
        
        {/* Grid Layout */}
        <div className="form-grid">

          {/* Title */}
          <div className="form-group">
            <label className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Expense title"
              className="form-input"
              required
            />
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              min="1"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="form-input"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">
              Category
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="groceries">Groceries</option>
              <option value="rent">Rent</option>
              <option value="utilities">Utilities</option>
              <option value="transportation">Transportation</option>
              <option value="healthcare">Healthcare</option>
              <option value="entertainment">Entertainment</option>
              <option value="education">Education</option>
              <option value="travel">Travel</option>
              <option value="shopping">Shopping</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label">
              Date
            </label>
            <input
              type="date"
              name="date"
              max={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add details"
            className="form-textarea"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="form-button"
        >
          Add Expense
        </button>

      </form>
    </div>
  );
};

export default Expenses;

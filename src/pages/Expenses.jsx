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
    <div className="max-w-3xl mx-auto mt-6 bg-white p-4 sm:p-6 rounded-lg shadow">
      
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6 text-center">
        Add Expense
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Expense title"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              min="1"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              max={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add details"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
        >
          Add Expense
        </button>

      </form>
    </div>
  );
};

export default Expenses;

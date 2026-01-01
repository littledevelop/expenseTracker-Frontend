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
    <div className="mx-auto max-w-md md:max-w-2xl mt-6 bg-white p-4 md:p-6 rounded-lg shadow">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6 text-center">
        Add Income
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Salary / Freelance / Bonus"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-600 mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            min="1"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-600 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
        <div>
          <label className="block text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional notes"
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-600 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition font-semibold"
        >
          Add Income
        </button>
      </form>
    </div>
  );
};

export default Income;

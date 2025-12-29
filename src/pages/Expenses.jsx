import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContex";

const Expenses = () => {
  const { addExpense } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
    description: "",
    date: "",
  });

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData({...formData,[name]:value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const amount = Number(formData.amount);
    addExpense(
      formData.title,
      amount,
      formData.type,
      formData.date,
      formData.description,
    )
  }
  return (
    <div className="mx-auto max-w-md md:max-w-2xl mt-6 bg-white p-4 md:p-6 rounded-md shadow-md">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 text-center">
        Add Expenses
      </h1>
      <form action="" className="space-y-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600 mb-2 text-sm md:text-base">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            placeholder="Enter Expense Title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-600 mb-2 text-sm md:text-base">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            placeholder="Enter Expense Amount"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-600 mb-2 text-sm md:text-base">
            Category
          </label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
            <option value="utilities">Utilities</option>
            <option value="transportation">Transportation</option>
            <option value="healthcare">HealthCare</option>
            <option value="entartainment">Entertainment</option>
            <option value="education">Education</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>



        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-600 mb-2 text-sm md:text-base">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            placeholder="Please Enter a Description"
            rows="3"
            required
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-600 mb-2 text-sm md:text-base">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-sm md:text-base font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Expenses;

import React, { useContext, useState } from 'react';
import {AppContext} from '../context/AppContex';
const ViewTransaction = () => {
  const {incomeData,expenseData, deleteIncome, deleteExpense, updateIncome, updateExpense} = useContext(AppContext);
  const allTransaction =[...incomeData, ...expenseData];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      title: transaction.title || '',
      amount: transaction.amount || '',
      category: transaction.category || '',
      date: transaction.date ? transaction.date.split('T')[0] : '',
      description: transaction.description || ''
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTransaction.type === 'income') {
      updateIncome(editingTransaction._id, formData.title, Number(formData.amount), formData.category, new Date(formData.date), formData.description);
    } else {
      updateExpense(editingTransaction._id, formData.title, Number(formData.amount), formData.category, new Date(formData.date), formData.description);
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: '',
      description: ''
    });
  };
  
  return (
    <div className='max-w-full p-4 mt-14'>
      <h1 className='text-2xl md:text-3xl font-semibold mb-6 text-center'>Transaction History</h1>
      <div className='overflow-x-auto pr-4'>
        <table className='w-full table-auto border-collapse bg-white shadow-lg rounded-lg min-w-max'>
          <thead>
            <tr className='bg-gray-100 text-gray-700 uppercase text-xs md:text-sm'>
              <th className='p-2 md:p-4 text-left'>Name</th>
              <th className='p-2 md:p-4 text-left'>Category</th>
              <th className='p-2 md:p-4 text-left'>Date</th>
              <th className='p-2 md:p-4 text-left'>Type</th>
              <th className='p-2 md:p-4 text-left'>Amount</th>
              <th className='p-2 md:p-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              allTransaction.map((transaction,index)=>(
                <tr key={index} className='border-b last:border-none hover:bg-gray-50 transition-colors'>
                  <td className='p-2 md:p-4 text-sm md:text-base'>{transaction.title}</td>
                  <td className='p-2 md:p-4 text-sm md:text-base'>{transaction.category}</td>
                  <td className='p-2 md:p-4 text-sm md:text-base'>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className='p-2 md:p-4 text-sm md:text-base'>{transaction.type === "income" ? "Income" : "Expense"}</td>
                  <td className={`p-2 md:p-4 text-sm md:text-base font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"} `}>$ {transaction.amount}</td>
                  <td className='p-2 md:p-4'>
                    <div className='flex flex-col sm:flex-row gap-1'>
                      <button 
                        onClick={() => handleEdit(transaction)}
                        className='bg-blue-500 text-white px-2 py-1 md:px-3 md:py-1 rounded text-xs md:text-sm hover:bg-blue-600'
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => transaction.type === "income" ? deleteIncome(transaction._id) : deleteExpense(transaction._id)}
                        className='bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded text-xs md:text-sm hover:bg-red-600'
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Edit {editingTransaction?.type === 'income' ? 'Income' : 'Expense'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 md:mb-4">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-sm md:text-base"
                  required
                />
              </div>
              <div className="mb-3 md:mb-4">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-sm md:text-base"
                  required
                />
              </div>
              <div className="mb-3 md:mb-4">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-sm md:text-base"
                  required
                >
                  <option value="">Select Category</option>
                  {editingTransaction?.type === 'income' ? (
                    <>
                      <option value="salary">Salary</option>
                      <option value="business">Business</option>
                      <option value="investment">Investment</option>
                      <option value="freelance">Freelance</option>
                      <option value="rental">Rental</option>
                      <option value="other">Other</option>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </select>
              </div>
              <div className="mb-3 md:mb-4">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-sm md:text-base"
                  required
                />
              </div>
              <div className="mb-3 md:mb-4">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-sm md:text-base"
                  rows="3"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewTransaction;

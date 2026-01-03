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
    <div className='content-wrapper mt-14'>
      <h1 className='history-title'>Transaction History</h1>
      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              allTransaction.map((transaction,index)=>(
                <tr key={index}>
                  <td>{transaction.title}</td>
                  <td>{transaction.category}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.type === "income" ? "Income" : "Expense"}</td>
                  <td className={`table-amount ${transaction.type === "income" ? "income" : "expense"}`}>$ {transaction.amount}</td>
                  <td>
                    <div className='table-actions'>
                      <button 
                        onClick={() => handleEdit(transaction)}
                        className='btn btn-primary btn-small'
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => transaction.type === "income" ? deleteIncome(transaction._id) : deleteExpense(transaction._id)}
                        className='btn btn-danger btn-small'
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
        <div className="modal-overlay">
          <div className="modal" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="modal-header">
              <h2 className="modal-title">Edit {editingTransaction?.type === 'income' ? 'Income' : 'Expense'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
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
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="3"
                  required
                />
              </div>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
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

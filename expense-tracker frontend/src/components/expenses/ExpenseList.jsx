// src/components/expenses/ExpenseList.js
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "../../styles/expenses.css";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ refresh, onEdit }) => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(`/expenses/${user.id}`);
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      await axios.delete(`/expenses/${id}`);
      setExpenses(expenses.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [user, refresh]);

  if (!expenses.length) return <p>No expenses found.</p>;

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;

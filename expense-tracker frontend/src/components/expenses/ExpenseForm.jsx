// src/components/expenses/ExpenseForm.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../../styles/expenses.css";
import { AuthContext } from "../../context/AuthContext";

const ExpenseForm = ({ onSubmitSuccess, expenseToEdit }) => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
    } else {
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    }
  }, [expenseToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      console.error("User ID or token not found!");
      return;
    }

    const payload = {
      title,
      amount: parseFloat(amount),
      category,
      date,
      user: { id: user.id }, // 🔹 attach user ID
    };

    try {
      if (expenseToEdit) {
        // UPDATE existing expense
        await axios.put(`/expenses/update/${expenseToEdit.id}`, payload);
      } else {
        // ADD new expense
        await axios.post("/expenses", payload); // 🔹 no userId in URL
      }

      // Reset form
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");

      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error(
        "Error adding/updating expense:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>{expenseToEdit ? "Edit Expense" : "Add Expense"}</h3>

      <label>Title</label>
      <input
        type="text"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Amount</label>
      <input
        type="number"
        value={amount}
        required
        onChange={(e) => setAmount(e.target.value)}
      />

      <label>Category</label>
      <input
        type="text"
        value={category}
        required
        onChange={(e) => setCategory(e.target.value)}
      />

      <label>Date</label>
      <input
        type="date"
        value={date}
        required
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">{expenseToEdit ? "Update" : "Add"}</button>
    </form>
  );
};

export default ExpenseForm;

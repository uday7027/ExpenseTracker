import React from "react";
import "../../styles/expenses.css";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{expense.title}</td>
      <td>{expense.amount}</td>
      <td>{expense.category}</td>
      <td>{expense.date}</td>
      <td>
        <button className="edit-btn" onClick={() => onEdit(expense)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(expense.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ExpenseItem;

import React, { useState, useContext } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { AuthContext } from "../context/AuthContext";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const handleFormSubmit = () => {
    setRefresh(!refresh); // refresh list
    setExpenseToEdit(null); // reset edit form
  };

  const handleEdit = (expense) => {
    setExpenseToEdit(expense); // pass expense to form
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <Header userName={user?.email} />
      {/* Main content area */}
      <main className="dashboard-content">
        <div className="content-grid">
          <ExpenseForm
            onSubmitSuccess={handleFormSubmit}
            expenseToEdit={expenseToEdit}
          />
          <ExpenseList refresh={refresh} onEdit={handleEdit} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
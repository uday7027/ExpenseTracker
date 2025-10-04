import React from "react";
import "../../styles/layout.css";

const Header = ({ userName }) => {
  return (
    <header className="dashboard-header">
      <div className="logo">Expense Tracker</div>
      <div className="search-profile">
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="profile">{userName || "User"}</div>
      </div>
    </header>
  );
};

export default Header;

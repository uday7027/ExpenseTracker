import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/layout.css";
import { AuthContext } from "../../context/AuthContext"; // assuming you have AuthContext

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Expenses", path: "/dashboard/expenses" },
    { name: "Reports", path: "/dashboard/reports" },
    { name: "Categories", path: "/dashboard/categories" },
  ];

  const handleLogout = () => {
    logout(); // call logout from context
    navigate("/"); // redirect to login page
  };

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <button
        className="collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "➤" : "⬅"}
      </button>

      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      {/* Logout Button at the bottom */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

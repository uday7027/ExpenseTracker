// src/components/common/Button.js
import React from "react";
import "../../styles/button.css";

const Button = ({ text, primary }) => {
  return (
    <button className={primary ? "btn btn-primary" : "btn"}>{text}</button>
  );
};

export default Button;

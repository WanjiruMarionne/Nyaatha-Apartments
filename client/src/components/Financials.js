import React from "react";
import "../styles.css";

const Financials = () => {
  const financialData = {
    revenue: "$50,000",
    expenses: "$20,000",
    profit: "$30,000",
  };

  return (
    <div className="page">
      <h1>Financials</h1>
      <div className="card">Total Revenue: {financialData.revenue}</div>
      <div className="card">Total Expenses: {financialData.expenses}</div>
      <div className="card">Net Profit: {financialData.profit}</div>
    </div>
  );
};

export default Financials;
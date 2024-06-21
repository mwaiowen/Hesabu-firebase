import React from "react";
import "./transactions.css";

const Transactions = () => {
  return (
    <div className="container">
      <h1>Transactions</h1>
      <form>
        <div className="prod_name">
          <h3>Product-Name</h3>
          <input className="input" type="text" required />
        </div>
        <div className="value">
          <h3>Value</h3>
          <input className="input" type="number" required />
        </div>
        <div className="qty-chnge">
          <h3>Qty change</h3>
          <input className="input" type="number" required />
        </div>
        <div className="date">
          <h3>Date Created</h3>
          <input className="input" type="date" required />
        </div>
        <button className="button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default Transactions;

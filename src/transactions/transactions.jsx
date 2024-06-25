import React, { useState } from "react";
import "./transactions.css";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useGetTransactions } from "../hooks/transactions/useGetTransactions";
import { useAddTransaction } from "../hooks/transactions/useAddTransactions";

const Transactions = () => {
  //cusstom hooks
  const { transactions } = useGetTransactions();
  const { addTransaction } = useAddTransaction();

  //const for the input fields
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState();
  const navigate = useNavigate();

  //onsubmit form
  const onSubmit = async (e) => {
    e.preventDefault();
    await addTransaction({ name, value, quantity, date });
    setName("");
    setValue(0);
    setQuantity(0);
    setDate();
  };

  // signout button should have its own file probaly to avoid clutter
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <h1>Transactions</h1>
      <form onSubmit={onSubmit}>
        <div className="prod_name">
          <h3>Product-Name</h3>
          <input
            className="input"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="value">
          <h3>Value</h3>
          <input
            className="input"
            type="number"
            required
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="qty-chnge">
          <h3>Qty change</h3>
          <input
            className="input"
            type="number"
            required
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="date">
          <h3>Date Created</h3>
          <input
            className="input"
            type="date"
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button className="button" type="submit">
          Add
        </button>
      </form>
      <div className="details">
        <h1>Transactions</h1>
        <ul>
          {transactions.map((transaction, index) => {
            const { name, value, quantity, date } = transaction;
            console.log(`Product ${index + 1}:`, transaction);

            return (
              <li key={index} className="list">
                <h4>Product Name: {name} </h4>
                <p>Value: {value}</p>
                <p> Quantity: {quantity}</p>
                <p>Date: {date}</p>
              </li>
            );
          })}
        </ul>
        <button className="button" onClick={signUserOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Transactions;

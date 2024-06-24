import React, { useState } from "react";
import "./categories.css";
import { useAddCategory } from "../hooks/category/useAddCategory";
import { useGetCategories } from "../hooks/category/useGetCategories";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { addCategory } = useAddCategory();
  const { categories } = useGetCategories();

  const [catID, setCatID] = useState(0);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await addCategory({ catID, name });
    setCatID(0);
    setName("");
  };
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
      <h1>My Categories</h1>
      <form onSubmit={onSubmit}>
        <div className="catId">
          <h3>Category ID</h3>
          <input
            className="input"
            type="number"
            required
            onChange={(e) => setCatID(e.target.value)}
          />
        </div>
        <div className="name">
          <h3>Name</h3>
          <input
            className="input"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <div className="details">
        <h1>Categories </h1>
        <ul>
          {categories.map((category, index) => {
            const { catID, name } = category;

            return (
              <li key={index} className="list">
                <h4>•{catID}</h4>
                <br />
                {"-"}
                <p>🍦{name}</p>
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

export default Categories;

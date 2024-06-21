// import React, { useState } from "react";
// import "./products.css";
// import { useAddProducts } from "../hooks/products/useAddProducts";
// import { useGetProducts } from "../hooks/products/useGetProducts";

// const Products = () => {
//   //custom hooks
//   const { addProducts } = useAddProducts();
//   const { products } = useGetProducts();

//   const [name, setName] = useState("");
//   const [catID, setCatID] = useState(0);
//   const [defaultPrice, setDefaultPrice] = useState(0);
//   const [quantity, setQuantity] = useState(0);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     addProducts({ name, catID, defaultPrice, quantity });
//   };

//   const signUserOut = async () => {
//     try {
//       await signOut(auth);
//       localStorage.clear();
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Products</h1>
//       <form onSubmit={onSubmit}>
//         <div className="prod_id">
//           <h3>Name</h3>
//           <input
//             className="input"
//             type="text"
//             required
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="cat-id">
//           <h3>Category ID</h3>
//           <input
//             className="input"
//             type="number"
//             required
//             onChange={(e) => setCatID(e.target.value)}
//           />
//         </div>
//         <div className="def-price">
//           <h3>Default price</h3>
//           <input
//             className="input"
//             type="number"
//             required
//             onChange={(e) => setDefaultPrice(e.target.value)}
//           />
//         </div>
//         <div className="date">
//           <h3>Quantity</h3>
//           <input
//             className="input"
//             type="number"
//             required
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//         </div>
//         <button className="button" type="submit">
//           Add
//         </button>
//       </form>
//       <div className="details">
//         <h1>Products </h1>
//         <ul>
//           {products.map((product) => {
//             const { catID, name, defaultPrice, quantity } = product;

//             return (
//               <li className="list">
//                 <h4>•{catID}</h4>
//                 <br />
//                 {"-"}
//                 <p>🍦{name}</p>
//                 <br />
//                 {"-"}
//                 <p>{defaultPrice}</p>
//                 <br />
//                 {"-"}
//                 <p>{quantity}</p>
//               </li>
//             );
//           })}
//         </ul>
//         <button className="button" onClick={signUserOut}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Products;

// import React, { useState } from "react";
// import "./products.css";
// import { useAddProducts } from "../hooks/products/useAddProducts";
// import { useGetProducts } from "../hooks/products/useGetProducts";
// import { signOut } from "firebase/auth";
// import { auth } from "../config/firebase";
// import { useNavigate } from "react-router-dom";

// const Products = () => {
//   // Custom hooks
//   const { addProducts } = useAddProducts();
//   const { products } = useGetProducts();

//   // State for form inputs
//   const [name, setName] = useState("");
//   const [catID, setCatID] = useState(0);
//   const [defaultPrice, setDefaultPrice] = useState(0);
//   const [quantity, setQuantity] = useState(0);

//   // State for total price calculation
//   const setTotalPrice = useState(0);
//   const navigate = useNavigate();
//   const totalPrice = defaultPrice * quantity;

//   // Function to calculate total price
//   const calculateTotalPrice = () => {
//     const totalPrice = defaultPrice * quantity;
//     setTotalPrice(totalPrice);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     addProducts({ name, catID, defaultPrice, quantity, totalPrice });
//     // Reset form inputs after submission
//     setName("");
//     setCatID(0);
//     setDefaultPrice(0);
//     setQuantity(0);
//     setTotalPrice(0);
//   };

//   const signUserOut = async () => {
//     try {
//       await signOut(auth);
//       localStorage.clear();
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Products</h1>
//       <form onSubmit={onSubmit}>
//         <div className="prod_id">
//           <h3>Name</h3>
//           <input
//             className="input"
//             type="text"
//             required
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="cat-id">
//           <h3>Category ID</h3>
//           <input
//             className="input"
//             type="number"
//             required
//             value={catID}
//             onChange={(e) => setCatID(e.target.value)}
//           />
//         </div>
//         <div className="def-price">
//           <h3>Default price</h3>
//           <input
//             className="input"
//             type="number"
//             required
//             value={defaultPrice}
//             onChange={(e) => setDefaultPrice(e.target.value)}
//           />
//         </div>
//         <div className="date">
//           <h3>Quantity</h3>
//           <input
//             className="input"
//             type="number"
//             required
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//         </div>
//         <div className="date">
//           <h3>Total</h3>
//           <input className="input" type="number" disabled value={totalPrice} />
//         </div>

//         <button className="button" type="submit" onClick={calculateTotalPrice}>
//           Add
//         </button>
//       </form>
//       <div className="details">
//         <h1>Products List</h1>
//         <ul>
//           {products.map((product, index) => {
//             const { catID, name, defaultPrice, quantity } = product;
//             const totalPrice = defaultPrice * quantity;

//             return (
//               <li key={index} className="list">
//                 <h4>Category ID: {catID}</h4>
//                 <p>Name: {name}</p>
//                 <p>Default Price: {defaultPrice}</p>
//                 <p>Quantity: {quantity}</p>
//                 <p>Total Price: {totalPrice}</p>
//               </li>
//             );
//           })}
//         </ul>
//         <button className="button" onClick={signUserOut}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Products;

import React, { useState } from "react";
import "./products.css";
import { useAddProducts } from "../hooks/products/useAddProducts";
import { useGetProducts } from "../hooks/products/useGetProducts";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { addProducts } = useAddProducts();
  const { products } = useGetProducts();

  const [name, setName] = useState("");
  const [catID, setCatID] = useState(0);
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const totals = defaultPrice * quantity;

  const calculateTotalPrice = () => {
    const totalPrice = defaultPrice * quantity;
    setTotalPrice(totalPrice);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    calculateTotalPrice();
    addProducts({ name, catID, defaultPrice, quantity, totalPrice });
    setName("");
    setCatID(0);
    setDefaultPrice(0);
    setQuantity(0);
    setTotalPrice(0); // Reset total price after submission
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
      <h1>Products</h1>
      <form onSubmit={onSubmit}>
        <div className="prod_id">
          <h3>Name</h3>
          <input
            className="input"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="cat-id">
          <h3>Category ID</h3>
          <input
            className="input"
            type="number"
            required
            value={catID}
            onChange={(e) => setCatID(e.target.value)}
          />
        </div>
        <div className="def-price">
          <h3>Default price</h3>
          <input
            className="input"
            type="number"
            required
            value={defaultPrice}
            onChange={(e) => setDefaultPrice(e.target.value)}
          />
        </div>
        <div className="date">
          <h3>Quantity</h3>
          <input
            className="input"
            type="number"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="date">
          <h3>Total</h3>
          <input className="input" type="number" disabled value={totals} />
        </div>

        <button className="button" type="submit">
          Add
        </button>
      </form>
      <div className="details">
        <h1>Products List</h1>
        <ul>
          {products.map((product, index) => {
            const { catID, name, defaultPrice, quantity } = product;
            const totalPrice = defaultPrice * quantity;

            return (
              <li key={index} className="list">
                <h4>Category ID: {catID}</h4>
                <p>Name: {name}</p>
                <p>Default Price: {defaultPrice}</p>
                <p>Quantity: {quantity}</p>
                <p>Total Price: {totalPrice}</p>
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

export default Products;

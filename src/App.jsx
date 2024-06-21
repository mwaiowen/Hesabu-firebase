import "./App.css";
import Login from "./pages/Organization/Login";
import SignUp from "./pages/Organization/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth";
import Categories from "./categories/categories";
import Products from "./products/products";
import Transactions from "./transactions/transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

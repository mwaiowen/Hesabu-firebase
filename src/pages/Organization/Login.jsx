import { useEffect, useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/user/useGetUserInfo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //custom hooks
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const results = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successfully ", results);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/products");
  };
  if (isAuth) {
    return <Navigate to="/products" />;
  }

  return (
    <div className="signup">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">
          Email:
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
        <br />
        <p>
          Don't Have Account?{" "}
          <Link to={"/signup"} className="links">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

import { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="signup">
      <form className="form" onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        {/* <label htmlFor="name">
          Name:
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </label> */}
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
        <button type="submit">Sign Up</button>
        <br />
        <p>
          Already registerd?{" "}
          <Link to={"/login"} className="links">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

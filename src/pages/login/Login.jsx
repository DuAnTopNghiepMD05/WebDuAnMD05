import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        const q = query(
          collection(db, "Admin"),
          where("username", "==", user.email),
          where("pass", "==", password),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("User is not an admin");
          setError(true);
        } else {
          console.log("Logged in as admin");
          setError(false);
          navigate("/");
        }
      })
      .catch((error) => {
        setError(true);
        // ..
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" placeholder="login" />
        {error && <span>Wrong email or password</span>}
      </form>
    </div>
  );
};

export default Login;

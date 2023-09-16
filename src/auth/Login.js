import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import pete from "../img/pete.jpeg"
import stats from "../img/stats.png"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <div className="pete">
          <img src={pete} />
          <p class="dash">PeteCode</p>
        </div>
        <div className="signInContainer">
          <p id="signIn" class="dash">
            Sign In
          </p>
          <p id="signInMessage" class="dash">
            Please sign in to your account
          </p>
        </div>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <div className="bottomLinks">
          <div id="forgot">
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
      <div className="welcomeSignIn">
        <p id="getStarted" class="dash">Get started with <br></br>PeteCode</p>
        <img src={stats}></img>
        <p id="components" class="dash">Components</p>
        <ul>
          <li>
            Leaderboard
          </li>
          <li>
            Competitions
          </li>
          <li>
            Personalization
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Login;
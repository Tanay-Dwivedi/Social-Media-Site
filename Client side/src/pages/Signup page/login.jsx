import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import facebook from "../../assets/facebook.png";
import logo from "../../assets/logo.png";
import google from "../../assets/search.png";
import twitter from "../../assets/twitter.png";
import { AuthContext } from "../../Context/Authcontext";
import "./login.scss";

function Login() {
  const [state, setstate] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const fetchAuthUser = async () => {
    const response = await axios
      .get("/auth/user", { withCredentials: true })
      .catch((err) => console.log("Authentication Not done"));

    if (response && response.data) {
      console.log("User:", response.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    }
  };

  useEffect(() => {
    fetchAuthUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickLogin = async (e) => {
    e.preventDefault();
    const userCredential = {
      username: name,
      password: password,
    };
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };
  const handleClickSignup = async (e) => {
    e.preventDefault();
    const userCredential = {
      username: name,
      email: email,
      password: password,
    };
    try {
      const res = await axios.post("/auth/register", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
  const defaultLogin = async (e) => {
    e.preventDefault();

    //   const LoginUrl = `https://hi-con.herokuapp.com/api/auth/${e.target.alt}`;
    const LoginUrl = `http://127.0.0.1:8080/api/auth/${e.target.alt}`;
    window.location.href = LoginUrl;
  };

  return (
    <div className="background">
      <div
        className={`container ${state ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <img src={logo} className="logo" alt="logo" />
          <h3>Hi Let's Connect !!</h3>
          <form onSubmit={handleClickSignup}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Username"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button>Sign Up</button>
            <span>Or SignUp using:</span>
            <div className="social-container">
              <img
                src={google}
                alt="google"
                className="icons"
                onClick={defaultLogin}
              />
              <img
                src={facebook}
                alt="facebook"
                className="icons"
                onClick={defaultLogin}
              />
              <img
                src={twitter}
                alt="twitter"
                className="icons"
                onClick={defaultLogin}
              />
            </div>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <img src={logo} className="logo" alt="logo" />
          <h3>Hi Let's Connect !!</h3>
          <form onSubmit={handleClickLogin}>
            <h1>Sign in</h1>

            <input
              type="text"
              placeholder="Username"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <a href="/">Forgot your password?</a>
            <button>Sign In</button>
            <span>Or SignIn using:</span>
            <div className="social-container">
              <img
                src={google}
                alt="google"
                className="icons"
                onClick={defaultLogin}
              />
              <img
                src={facebook}
                alt="facebook"
                className="icons"
                onClick={defaultLogin}
              />
              <img
                src={twitter}
                alt="twitter"
                className="icons"
                onClick={defaultLogin}
              />
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => {
                  setstate((prev) => {
                    return !prev;
                  });
                }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => {
                  setstate((prev) => {
                    return !prev;
                  });
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

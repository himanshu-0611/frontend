// Login.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Element } from "react-scroll";

import Footer from "./Footer";

import "./login.css";

function Login() {
  const [user_mailid, setUserMailid] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user_name, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn");
    const storedUserName = Cookies.get("userName");

    if (isLoggedIn === "true" && storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_mailid, user_password }),
    });

    if (response.status === 200) {
      const userData = await response.json();
      const { user_name, user_id, batch_no } = userData;

      setMessage("Login successful.");
      
      Cookies.set("isLoggedIn", "true");
      Cookies.set("userName", user_name);
      Cookies.set("userId", user_id);
      Cookies.set("batch_no", batch_no);
      // console.log("batch_no " + batch_no);
      
      setUserName(user_name);
      
      navigate("/");
      window.alert("You have logged in successfully.");
    } else if (response.status === 401) {
      setMessage("Login Failed. Please check your credentials.");
    } else if (response.status === 404) {
      setMessage("Login failed. No such user exists.");
    } else {
      setMessage("Login failed. Please check your credentials.");
      console.error("Login failed!");
    }
  };

  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("userName");
    Cookies.remove("userId");
    Cookies.remove("batch_no");

    setUserName("");

    navigate("/login");
  };

  return (
    <>
      <div className="login-container" style={{backgroundColor: "black"}}>
        <div className="login-image">
          <img src="/images/home/main.jpg" alt="" style={{ height: "100vh" }} />
        </div>
        <div className="login-content">
          <div className="login-form">
            <h2>Log In</h2>
            <p style={{color: "purple"}}>Only those registered in a program will be able to login.</p>
            {message && <div className="message">{message}</div>}
            {user_name ? (
              <div>
                <p>Welcome, {user_name}!</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="content">
                  <input
                    type="email"
                    placeholder="Email"
                    value={user_mailid}
                    onChange={(e) => setUserMailid(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={user_password}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                  <button type="submit">Log In</button>
                </div>
              </form>
            )}
            {/* <Link to="/signup">Don't have an account? Sign Up</Link> */}
          </div>
        </div>
      </div>
      <Element name="contact-section">
        <div>
          <Footer />
        </div>
      </Element>
    </>
  );
}

export default Login;

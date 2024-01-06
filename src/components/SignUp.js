import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../LoginValidation.js"; // Import the validation function
import "./signup.css"

import Footer from "./Footer.js";

function SignUp() {
  const [user_name, setName] = useState("");
  const [user_mailid, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [user_lang, setPreferredLanguage] = useState("C++");
  const [batch_no, setBatchNo] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState("DSA"); // New state for program selection
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // To display success or error message
  const navigate = useNavigate(); // To navigate to other routes

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Clear any previous messages
    setMessage("");

    // Validate user input
    const validationErrors = validate({
      user_name,
      user_mailid,
      user_password,
    });

    if (Object.keys(validationErrors).length === 0) {
      // If there are no validation errors, proceed with signup logic

      // Determine whether to send user_lang based on the selected program
      let langToSend = user_lang;
      if (selectedProgram === "MERN") {
        langToSend = ""; // Don't send user_lang for MERN
      }

      // Example: Send a POST request to your backend to create a new user
      const response = await fetch(
        "/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_name,
            user_mailid,
            user_password,
            batch_no,
            user_lang: langToSend, // Send user_lang conditionally
            program: selectedProgram, // Send the selected program
          }),
        }
      );

      if (response.status === 200) {
        // Signup was successful, handle success
        setMessage("Signup successful. Please log in to continue.");

        // Automatically navigate to login page after a delay (e.g., 2 seconds)
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else if (response.status === 400) {
        // Email already exists, display error message
        setMessage("Email already exists. Please use a different email.");
      } else {
        // Handle signup failure, e.g., display an error message
        setMessage("Signup failed. Please try again.");
        console.error("Signup failed!");
      }
    } else {
      // If there are validation errors, set them in the state to display to the user
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <div className="sign-up" style={{ height: "51vh" }}>
        <h2>Sign Up</h2>
        {message && (
          <div className="message">
            {message} (Click to close)
            <span className="close-button" onClick={() => setMessage("")}>
              &times;
            </span>
          </div>
        )}
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            value={user_name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.user_name && <div className="error">{errors.user_name}</div>}
          <input
            type="email"
            placeholder="Email"
            value={user_mailid}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.user_mailid && (
            <div className="error">{errors.user_mailid}</div>
          )}
          <input
            type="password"
            placeholder="Password"
            value={user_password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.user_password && (
            <div className="error">{errors.user_password}</div>
          )}
          <input
            type="number"
            placeholder="Batch No"
            value={batch_no}
            onChange={(e) => setBatchNo(parseInt(e.target.value, 10))}
          />
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <option value="DSA">Data Structures and Algorithms</option>
            <option value="MERN">Full Stack Development using MERN</option>
            <option value="PlacementRun">Placement Run</option>
          </select>

          {selectedProgram === "DSA" && (
            <div>
              <label htmlFor="languageSelect">Select Language for DSA:</label>
              <select
                value={user_lang}
                onChange={(e) => setPreferredLanguage(e.target.value)}
              >
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </select>
            </div>
          )}
          {selectedProgram === "PlacementRun" && (
            <div>
              <label htmlFor="languageSelect">
                Select Language for Placement Run:
              </label>
              <select
                value={user_lang}
                onChange={(e) => setPreferredLanguage(e.target.value)}
              >
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </select>
            </div>
          )}

          <button type="submit">Sign Up</button>
        </form>
        <Link to="/LogIn">Already have an account? Sign In</Link>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;

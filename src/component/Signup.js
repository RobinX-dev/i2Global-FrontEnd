import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./Styles.css"; // Import the CSS file for styling
import styles from "./Styles.js";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare user data payload
    const userData = {
      username,
      email,
      password,
    };

    try {
      // Validate user data before making the request
      if (!userData.username || !userData.email || !userData.password) {
        alert("Please fill in all required fields.");
        return;
      }
    
      // Make the POST request
      const response = await axios.post("http://127.0.0.1:5000/add_user", userData);
    
      // Handle success
      if (response.status === 201) {
        alert(response.data.message); // Success message from the server
        navigate("/login"); // Navigate to login page
      } else {
        alert(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status code other than 2xx
        alert(error.response.data.message || "Server error occurred.");
      } else if (error.request) {
        // No response received from the server
        alert("No response from server. Please ensure the server is running.");
      } else {
        // Other errors
        alert("An unexpected error occurred: " + error.message);
      }
      console.error("Error during signup:", error);
    }
    
  };

  const handleLoginClick = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Submit
            </button>
            <button
              type="button" // Use type="button" to prevent form submission
              style={styles.button}
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

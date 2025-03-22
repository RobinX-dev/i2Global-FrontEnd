import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "./Styles.css"; // Import the CSS file for styling
import styles from "./Styles.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Prepare login data
    const loginData = {
      email,
      password,
    };

    try {
      // Send data to the API using axios
      const response = await axios.post("http://127.0.0.1:5000/login_user", loginData);

      // Handle API response
      if (response.status === 200) {
        alert(response.data.message); // Success message from API
        localStorage.setItem('username',response.data.username);
        navigate("/home"); // Redirect to the home/dashboard page after successful login
      }
    } catch (error) {
      // Handle error during the API call
      if (error.response) {
        // Server responded with an error status
        alert(error.response.data.message || "Login failed.");
      } else {
        // No response from the server
        alert("Failed to connect to the server. Please try again later.");
      }
      console.error("Error during login:", error);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate("/signup"); // Navigate to the signup page
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
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
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Login
            </button>
            <button
              type="button" // Use type="button" to prevent form submission
              style={styles.button}
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

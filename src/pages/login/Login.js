import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false); // State to toggle between Login and Register
  const navigate = useNavigate();

  const handleLogin = () => {
    const userList = JSON.parse(localStorage.getItem("userList")) || [];

    // Find the user in the list
    const user = userList.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("auth", "true");
      setAuth(true);
      navigate("/");
    } else {
      alert("Email not registered");
    }
  };

  const handleRegister = () => {
    const userList = JSON.parse(localStorage.getItem("userList")) || [];

    // Check if the username already exists
    const userExists = userList.some((user) => user.username === username);
    if (userExists) {
      alert("Username already exists. Please choose a different username.");
      return;
    }

    // Add the new user to the list
    userList.push({ username, password });

    // Save the updated user list back to localStorage
    localStorage.setItem("userList", JSON.stringify(userList));

    alert("Registration successful! You can now login.");
    setIsRegister(false); // Switch back to the login form
    setPassword("");
    setUsername("");
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isRegister ? (
        <>
          <button onClick={handleRegister}>Register</button>
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setIsRegister(false)}
              style={{ cursor: "pointer", color: "#ffd700" }}
            >
              Login here
            </span>
          </p>
        </>
      ) : (
        <>
          <button onClick={handleLogin}>Login</button>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => setIsRegister(true)}
              style={{ cursor: "pointer", color: "#ffd700" }}
            >
              Register here
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;

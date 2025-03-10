import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home setAuth={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

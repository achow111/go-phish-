import { useState } from "react";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Chest from "./pages/chest";
import FishTank from "./pages/fishtank";
import Leaderboard from "./pages/leaderboard";

import Navbar from "./components/navbar";

import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if the user is authenticated
  const [activePage, setActivePage] = useState("Home"); // Track which page is currently active

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set authenticated to true after login
  };

  const handleNavClick = (page: string) => {
    setActivePage(page); // Set the active page based on the clicked nav button
  };

  return (
    <div className="card">
      {isAuthenticated ? (
        <div style={{ display: "flex" }}>
          <Navbar onNavClick={handleNavClick} /> {/* Pass handleNavClick to Navbar */}
          <div style={{ marginLeft: "100px" }}>
            {activePage === "Home" && <Home />}
            {activePage === "Chest" && <Chest />}
            {activePage === "FishTank" && <FishTank />}
            {activePage === "Leaderboard" && <Leaderboard />}
          </div>
        </div>
      ) : isLogin ? (
        <Login setIsLogin={setIsLogin} onLoginSuccess={handleLoginSuccess} /> // Pass onLoginSuccess to Login
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;

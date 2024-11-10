import { useState } from "react";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Chest from "./pages/chest";
import FishTank from "./pages/fishtank";
import Leaderboard from "./pages/leaderboard";

import Navbar from "./components/navbar";

import background from "./assets/images/background.svg";

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

  // Create a style object with marginLeft based on the active page
  const pageStyles: { [key: string]: React.CSSProperties } = {
    Home: { marginLeft: "80px" },
    Chest: { marginLeft: "170px" },
    FishTank: { marginLeft: "55px" },
    Leaderboard: { marginLeft: "40px" },
  };

  return (
    <div className="card">
      {/* Background image (absolute positioned behind content) */}
      <div className="background-container">
        <img src={background} alt="background" className="background-image" />
      </div>

      {isAuthenticated ? (
        <div style={{ display: "flex" }}>
          <Navbar onNavClick={handleNavClick} />
          <div style={pageStyles[activePage]}>
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

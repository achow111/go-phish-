import { useState } from "react";
import Home from "../assets/images/Home.svg";
import Chest from "../assets/images/Chest.svg";
import Fishtank from "../assets/images/Fishtank.svg";
import Leaderboard from "../assets/images/Leaderboard.svg";

interface NavbarProps {
  onNavClick: (page: string) => void;
}

const Navbar = ({ onNavClick }: NavbarProps) => {
  const [activeButton, setActiveButton] = useState("Home"); // Set Home as default active

  const handleNavClick = (page: string) => {
    setActiveButton(page); // Set active button based on the clicked one
    onNavClick(page);
  };

  return (
    <div className="navbar">
      <button
        className={`navbar-button ${activeButton === "Home" ? "active" : ""}`}
        onClick={() => handleNavClick("Home")}
      >
        <img src={Home} alt="Home" className="navbar-icon" />
      </button>
      <button
        className={`navbar-button ${activeButton === "Chest" ? "active" : ""}`}
        onClick={() => handleNavClick("Chest")}
      >
        <img src={Chest} alt="Chest" className="navbar-icon" />
      </button>
      <button
        className={`navbar-button ${activeButton === "FishTank" ? "active" : ""}`}
        onClick={() => handleNavClick("FishTank")}
      >
        <img src={Fishtank} alt="FishTank" className="navbar-icon" />
      </button>
      <button
        className={`navbar-button ${activeButton === "Leaderboard" ? "active" : ""}`}
        onClick={() => handleNavClick("Leaderboard")}
      >
        <img src={Leaderboard} alt="Leaderboard" className="navbar-icon" />
      </button>
    </div>
  );
};

export default Navbar;

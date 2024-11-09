import Home from "../assets/images/Home.svg";
import Chest from "../assets/images/Chest.svg";
import Fishtank from "../assets/images/Fishtank.svg";
import Leaderboard from "../assets/images/Leaderboard.svg";

interface NavbarProps {
  onNavClick: (page: string) => void;
}

const Navbar = ({ onNavClick }: NavbarProps) => {
  return (
    <div className="navbar">
      <button className="navbar-button" onClick={() => onNavClick("Home")}>
        <img src={Home} alt="Home" className="navbar-icon" />
      </button>
      <button className="navbar-button" onClick={() => onNavClick("Chest")}>
        <img src={Chest} alt="Chest" className="navbar-icon" />
      </button>
      <button className="navbar-button" onClick={() => onNavClick("FishTank")}>
        <img src={Fishtank} alt="FishTank" className="navbar-icon" />
      </button>
      <button className="navbar-button" onClick={() => onNavClick("Leaderboard")}>
        <img src={Leaderboard} alt="Leaderboard" className="navbar-icon" />
      </button>
    </div>
  );
};

export default Navbar;

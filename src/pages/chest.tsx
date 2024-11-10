import { useState } from "react";

import PurpleWhaleSVG from '../assets/images/fishes/purplewhale.svg';
import BarracudaSVG from '../assets/images/fishes/barracuda.svg';
import SquidSVG from '../assets/images/fishes/squid.svg';
import CrabSVG from '../assets/images/fishes/crab.svg';
import PufferfishSVG from '../assets/images/fishes/pufferfish.svg';
import SalmonSVG from '..//assets/images/fishes/salmon.svg';
import BassSVG from '../assets/images/fishes/bass.svg';
import TroutSVG from '../assets/images/fishes/trout.svg';
import CodSVG from '../assets/images/fishes/cod.svg';
import BarrelSVG from '../assets/images/barrel.svg';

export const Chest = () => {
  const [plays, setPlays] = useState(500);
  const [fish, setFish] = useState("");
  const [message, setMessage] = useState("");

  const getFish = () => {
    // Legendary: 1%
    // Mythic: 9%
    // Rare: 30%
    // Common: 60%
    const fishIndex = Math.floor(Math.random() * 100) + 1;

    if (fishIndex === 2) {
      return "Purple Whale";
    } else if (fishIndex <= 6) {
      return "Barracuda";
    } else if (fishIndex <= 10) {
      return "Squid";
    } else if (fishIndex <= 20) {
      return "Crab";
    } else if (fishIndex <= 30) {
      return "Pufferfish";
    } else if (fishIndex <= 40) {
      return "Salmon";
    } else if (fishIndex <= 60) {
      return "Bass";
    } else if (fishIndex <= 80) {
      return "Trout";
    } else {
      return "Cod";
    }
  };

  const getFishImage = (fish: string) => {
    switch (fish) {
      case "Purple Whale":
        return <img src={PurpleWhaleSVG} alt="Purple Whale" />;
      case "Barracuda":
        return <img src={BarracudaSVG} alt="Barracuda" />;
      case "Squid":
        return <img src={SquidSVG} alt="Squid" />;
      case "Crab":
        return <img src={CrabSVG} alt="Crab" />;
      case "Pufferfish":
        return <img src={PufferfishSVG} alt="Pufferfish" />;
      case "Salmon":
        return <img src={SalmonSVG} alt="Salmon" />;
      case "Bass":
        return <img src={BassSVG} alt="Bass" />;
      case "Trout":
        return <img src={TroutSVG} alt="Trout" />;
      case "Cod":
        return <img src={CodSVG} alt="Cod" />;
      default:
        // Return the barrel image if no fish is selected
        return <img src={BarrelSVG} alt="Barrel" className="barrel" />;
    }
  };

  const handleNewFish = () => {
    if (plays > 0) {
      setFish(getFish());
      setPlays(plays - 1);
      setMessage(""); // Clear any previous message
    } else {
      setFish("");
      setMessage("You don't have enough plays left.");
    }
  };

  return (
    <div>
      {fish ? (
        <>
          <p>Congratulations! You caught a {fish}!</p>
          {getFishImage(fish)} {/* Render the appropriate image */}
        </>
      ) : (
        <div>
          {message && <p>{message}</p>}
          {/* Show the barrel image when no fish is selected */}
          {getFishImage(fish)}
        </div>
      )}
      <p>Plays remaining: {plays}</p>
      <button onClick={handleNewFish}>Open Chest</button>
    </div>
  );
};

export default Chest;

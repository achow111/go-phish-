import { useState } from "react";
import axios from "axios";

import PurpleWhaleSVG from '../assets/images/fishes/purplewhale.svg';
import BarracudaSVG from '../assets/images/fishes/barracuda.svg';
import SquidSVG from '../assets/images/fishes/squid.svg';
import CrabSVG from '../assets/images/fishes/crab.svg';
import PufferfishSVG from '../assets/images/fishes/pufferfish.svg';
import SalmonSVG from '../assets/images/fishes/salmon.svg';
import BassSVG from '../assets/images/fishes/bass.svg';
import TroutSVG from '../assets/images/fishes/trout.svg';
import CodSVG from '../assets/images/fishes/cod.svg';
import BarrelSVG from '../assets/images/barrel.svg';

import Empty from "../assets/images/nobarrellsfishtank.png"; // Image for empty state

export const Chest = () => {
  const [plays, setPlays] = useState(5);
  const [fish, setFish] = useState("");
  const [rarity, setRarity] = useState("");
  const [message, setMessage] = useState("");
  const [isFishVisible, setIsFishVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

const userData = localStorage.getItem('user');
const parsedUserData = JSON.parse(userData as any)

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

  // Increment barrel function
  const incrementFish = async () => {
    try {
      const response = await axiosInstance.post('update-fish/', {
        fishname: fish, 
        id: parsedUserData.id,
      });
      console.log("Fish added:", response.data);
    } catch (err) {
      console.error("Error incrementing fish:", err);
    }
  };

const fishDict = parsedUserData.fish;

  const getFish = () => {
    const fishIndex = Math.floor(Math.random() * 100) + 1;
    if (fishIndex === 2) {
      setRarity("Legendary");
      return "Purple Shark";
    } else if (fishIndex <= 6) {
      setRarity("Mythic");
      return "Barracuda";
    } else if (fishIndex <= 10) {
      setRarity("Mythic");
      return "Squid";
    } else if (fishIndex <= 20) {
      setRarity("Rare");
      return "Crab";
    } else if (fishIndex <= 30) {
      setRarity("Rare");
      return "Pufferfish";
    } else if (fishIndex <= 40) {
      setRarity("Rare");
      return "Salmon";
    } else if (fishIndex <= 60) {
      setRarity("Common");
      return "Bass";
    } else if (fishIndex <= 80) {
      setRarity("Common");
      return "Trout";
    } else {
      setRarity("Common");
      return "Cod";
    }
  };

  const getFishImage = (fish: string) => {
    switch (fish) {
      case "Purple Whale": return <img src={PurpleWhaleSVG} alt="Purple Whale" />;
      case "Barracuda": return <img src={BarracudaSVG} alt="Barracuda" />;
      case "Squid": return <img src={SquidSVG} alt="Squid" />;
      case "Crab": return <img src={CrabSVG} alt="Crab" />;
      case "Pufferfish": return <img src={PufferfishSVG} alt="Pufferfish" />;
      case "Salmon": return <img src={SalmonSVG} alt="Salmon" />;
      case "Bass": return <img src={BassSVG} alt="Bass" />;
      case "Trout": return <img src={TroutSVG} alt="Trout" />;
      case "Cod": return <img src={CodSVG} alt="Cod" />;
      default: return <img src={BarrelSVG} alt="Barrel" className="barrel" />;
    }
  };

  const handleNewFish = () => {
    if (plays > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setMessage("");
      setFish(getFish());
      setIsFishVisible(true);
      setTimeout(() => {
        setIsFishVisible(false);
        setPlays(plays - 1);
        setIsTransitioning(false);
        setFish("");
      }, 3000);
    } else {
      setFish("");
      setMessage("You don't have any more barrels left. Find more phishing emails to catch fish.");
    }
  };

  return (
    <div className="chest-main-container">
      <div className="image-container">
        {plays > 0 ? (
          !isFishVisible ? (
            <img
              src={BarrelSVG}
              alt="Barrel"
              className={`barrel ${isTransitioning ? "dissolve" : ""}`}
              onClick={handleNewFish}
            />
          ) : (
            <div className="fish-container fade-in">
              {getFishImage(fish)}
            </div>
          )
        ) : (
          // Show the "Empty" image when no plays are left
          <img src={Empty} alt="No barrels left" className="empty-state" />
        )}
      </div>
      {fish && (
        <div className="message-container">
          <p className="fish-congrats-message">
            Congratulations! You caught a
          </p>
          <span className={`rarity-pill ${rarity.toLowerCase()}`}>{rarity}</span>
          <p className="black-fish">{fish}</p>
        </div>
      )}
      {message && <p>{message}</p>}
      <div className="barrels-info">
        <p className="barrels-count">Barrels remaining: <span className="barrels-number">{plays}</span></p>
      </div>
    </div>
  );
};

export default Chest;

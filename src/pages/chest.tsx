import { useState } from "react";

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

    if (fishIndex === 1) {
      return "Purple Whale";
    } else if (fishIndex <= 5) { // Changed 5.5 to 5
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
      <h1>Welcome to the Chest Page!</h1>
      {fish ? <p>Your catch: {fish}</p> : <p>{message}</p>}
      <p>Plays remaining: {plays}</p>
      <button onClick={handleNewFish}>Open Chest Again</button>
    </div>
  );
};

export default Chest;

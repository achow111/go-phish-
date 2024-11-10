import { useState } from "react";

export const Chest = () => {
  const getFish = () => {
    // Legendary: 1%
    // Mythic: 9%
    // Rare: 30%
    // Common: 60%
    const fishIndex = Math.floor(Math.random() * 100) + 1;
    if(fishIndex == 1){

    } else if(fishIndex <= 5.5) {
      return "Purple Whale";
    } else if(fishIndex <= 5.5) {
      return "Barracuda";
    } else if(fishIndex <= 10) {
      return "Squid";
    } else if(fishIndex <= 20) {
      return "Crab";
    } else if(fishIndex <= 30) {
      return "Pufferfish";
    } else if(fishIndex <= 40) {
      return "Salmon";
    } else if(fishIndex <= 60) {
      return "Bass";
    } else if(fishIndex <= 80) {
      return "Trout";
    } else {
      return "Cod";
    }
  }

  // Use state to keep track of the current fish
  const [fish, setFish] = useState(getFish());

  const handleNewFish = () => {
    setFish(getFish());
  };


    return (
      <div>
      <h1>Welcome to the Chest Page!</h1>
      <p>Your catch: {fish}</p>
      <button onClick={handleNewFish}>Open Chest Again</button>
    </div>
    );
  };
  
  export default Chest;
  
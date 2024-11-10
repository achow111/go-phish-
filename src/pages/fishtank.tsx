// import React from 'react';
import BarracudaSVG from '../assets/images/fishes/barracuda.svg';
import CrabSVG from '../assets/images/fishes/crab.svg';
import CodSVG from '../assets/images/fishes/cod.svg';
import PufferfishSVG from '../assets/images/fishes/pufferfish.svg';
import BassSVG from '../assets/images/fishes/bass.svg';
import SalmonSVG from '../assets/images/fishes/salmon.svg';
import TroutSVG from '../assets/images/fishes/trout.svg';
import PurpleWhaleSVG from '../assets/images/fishes/purplewhale.svg';
import SquidSVG from '../assets/images/fishes/squid.svg';
import FishCard from '../components/fishcard';
// Define the type for user data
interface User {
  fish: Record<string, number>; // The fish dictionary with string keys and number values
}

export const FishTank = () => {
  // Retrieve the user data from localStorage
  const userData = localStorage.getItem('user');

  if (userData) {
    // Parse the user data and assert the type to be 'User'
    const parsedUserData = JSON.parse(userData) as User;
    
    // Retrieve the 'fish' dictionary from the parsed data
    const fishDict = parsedUserData.fish;

    // Map over the fish dictionary and filter out fish with quantity <= 0
    const fishCards = Object.entries(fishDict)
      .filter(([, value]) => value > 0) // Only keep fish where quantity > 0
      .map(([name, quantity]) => {
        // Determine the image path to use based on the fish name
        let fishImage;
        switch (name) {
          case "Purple Shark":
            fishImage = PurpleWhaleSVG;
            break;
          case "Barracuda":
            fishImage = BarracudaSVG;
            break;
          case "Squid":
            fishImage = SquidSVG;
            break;
          case "Crab":
            fishImage = CrabSVG;
            break;
          case "Cod":
            fishImage = CodSVG;
            break;
          case "Pufferfish":
            fishImage = PufferfishSVG;
            break;
          case "Bass":
            fishImage = BassSVG;
            break;
          case "Salmon":
            fishImage = SalmonSVG;
            break;
          case "Trout":
            fishImage = TroutSVG;
            break;
          // Add more fish names and corresponding images here
          default:
            fishImage = ""; // Fallback case if no matching fish
        }

        return (
          <FishCard 
            key={name} 
            image={fishImage} // Set the image as the SVG file path
            rarity="Unknown"  // You can set the rarity based on the fish name if needed
            name={name} 
            quantity={quantity} 
          />
        );
      });

    return (
      <div className="fish-tank">
        <h1>The Fish Tank</h1>
        <div className="fish-grid">
          {fishCards} {/* Render the fish cards here */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="fish-tank">
        <h1>The Fish Tank</h1>
        <p>No user data found in localStorage</p>
      </div>
    );
  }
};

export default FishTank;
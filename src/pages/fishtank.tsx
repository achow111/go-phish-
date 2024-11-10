// Import fish images and components
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
  fish: Record<string, number>;
}

// Rarity mapping function
const getRarityByFishName = (name: string): string => {
  switch (name) {
    case "Purple Whale":
      return "Legendary";
    case "Barracuda":
    case "Squid":
      return "Mythic";
    case "Crab":
    case "Pufferfish":
    case "Salmon":
      return "Rare";
    case "Bass":
    case "Trout":
    case "Cod":
      return "Common";
    default:
      return "Unknown";
  }
};

export const FishTank = () => {
  // Retrieve the user data from localStorage
  const userData = localStorage.getItem('user');

  if (userData) {
    const parsedUserData = JSON.parse(userData) as User;
    const fishDict = parsedUserData.fish;

    const fishCards = Object.entries(fishDict)
      .filter(([, quantity]) => quantity > 0)
      .map(([name, quantity]) => {
        // Determine the image based on the fish name
        let fishImage;
        switch (name) {
          case "Purple Whale":
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
          default:
            fishImage = "";
        }

        // Get rarity based on the fish name
        const rarity = getRarityByFishName(name);

        return (
          <FishCard 
            key={name} 
            image={fishImage} 
            rarity={rarity} // Pass rarity to FishCard
            name={name} 
            quantity={quantity} 
          />
        );
      });

    return (
      <div className="fish-tank">
        <h1>The Fish Tank</h1>
        <div className="fish-grid">
          {fishCards}
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

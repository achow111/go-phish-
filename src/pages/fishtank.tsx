// FishTank.js
import FishCard from '../components/fishcard';
import PurpleWhaleSVG from '../assets/images/fishes/purplewhale.svg';
import BarracudaSVG from '../assets/images/fishes/barracuda.svg';
import SquidSVG from '../assets/images/fishes/squid.svg';
import CrabSVG from '../assets/images/fishes/crab.svg';

export const FishTank = () => {
  return (
    <div className="fish-tank">
      <h1 className='main-header'>The Fish Tank</h1>
      <div className="fish-grid">
        <FishCard image={PurpleWhaleSVG} rarity="Rare" name="Purple Whale" quantity={4}/>
        <FishCard image={BarracudaSVG} rarity="Uncommon" name="Barracuda" quantity={4} />
        <FishCard image={SquidSVG} rarity="Common" name="Squid" quantity={4} />
        <FishCard image={CrabSVG} rarity="Legendary" name="Crab" quantity={4} />
      </div>
    </div>
  );
};

export default FishTank;

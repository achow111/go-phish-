interface FishCardProps {
    image: string;
    rarity: string;
    name: string;
    quantity: number;
  }
  
  const FishCard = ({ image, rarity, name, quantity }: FishCardProps) => {
    return (
      <div className="fish-card">
        <img src={image} alt={name} className="fish-image" />
        <hr className="divider" />
        <div className="fish-info">
          <div className="fish-detail">
            <p className="label">Fish</p>
            <p className="label-variable">{name}</p>
          </div>
          <div className="rarity-detail">
            <p className="label">Rarity</p>
            <p className="label-variable">{rarity}</p>
          </div>
        </div>
        <div className="quantity-container">
          <span className="quantity">x {quantity}</span>
        </div>
      </div>
    );
  };
  
  export default FishCard;
  
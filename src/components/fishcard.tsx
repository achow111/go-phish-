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
        <p className="fish-detail">
          <span className="label">Fish:</span> {name}
        </p>
        <p className="fish-detail">
          <span className="label">Rarity:</span> {rarity}
        </p>
      </div>
      <span className="quantity">x {quantity}</span>
    </div>
  );
};

export default FishCard;

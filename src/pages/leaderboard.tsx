import BoardRow from '../components/boardrows';

export const Leaderboard = () => {
  return (
    <div>
      <h1>Welcome to the Leaderboard Page!</h1>
      <div className="leaderboard-row">
        <span className="position">Place</span>
        <span className="username">Username</span>
        <span className="score">Score</span>
      </div>
      <BoardRow position={1} username="Sahej Sodhi" score={67} />
      <BoardRow position={2} username="Abeer Das" score={62} />
      <BoardRow position={3} username="Aaron Chow" score={60} />
      <BoardRow position={4} username="Megh Patel" score={59} />
    </div>
  );
};

export default Leaderboard;

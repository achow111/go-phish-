import BoardRow from '../components/boardrows';

export const Leaderboard = () => {
    return (
      <div>
        <h1>Organization Leaderboard</h1>
        <div className="leaderboard-row">
          <span className="position">Place</span>
          <span className="username">Username</span>
          <span className="score">Score</span>
        </div>
        <BoardRow position={1} username="Abeer Das" score={420} />
        <BoardRow position={2} username="Aaron Chow" score={69} />
        <BoardRow position={3} username="Sahej Singh Sodhi" score={12} />
      </div>
    );
  };
  
  export default Leaderboard;
  
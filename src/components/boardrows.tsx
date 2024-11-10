interface BoardRowProps {
    position: number;
    username: string;
    score: number;
}

const LeaderboardRow = ({ position, username, score }: BoardRowProps) => {
  return (
    <div className="leaderboard-row">
      <span className="position">{position}</span>
      <span className="username">{username}</span>
      <span className="score">{score}</span>
    </div>
  );
};

export default LeaderboardRow;

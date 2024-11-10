import { useState } from 'react';
import BoardRow from '../components/boardrows';

export const Leaderboard = () => {
  // State to check if user is part of an organization
  const [isInOrganization, setIsInOrganization] = useState(false);
  const [orgCode, setOrgCode] = useState('');

  // Function to handle organization code submission
  const handleJoinOrganization = () => {
    // Here, you would typically verify the org code, then set isInOrganization to true if successful
    setIsInOrganization(true); // For this example, we'll assume success
  };

  return (
    <div>
      <h1>Leaderboard Page</h1>

      {isInOrganization ? (
        <>
          <div className="leaderboard-row">
            <span className="position">Place</span>
            <span className="username">Username</span>
            <span className="score">Score</span>
          </div>
          <BoardRow position={1} username="Sahej Sodhi" score={67} />
          <BoardRow position={2} username="Abeer Das" score={62} />
          <BoardRow position={3} username="Aaron Chow" score={60} />
          <h2>Your Place</h2>
          <BoardRow position={4} username="Megh Patel" score={59} />
        </>
      ) : (
        <div>
          <h2>Join an Organization</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleJoinOrganization(); }}>
            <label>
              <input
                type="text"
                value={orgCode}
                onChange={(e) => setOrgCode(e.target.value)}
                placeholder="org. code"
              />
            </label>
            <div style={{ marginTop: '10px' }}> {/* Add some space between input and button */}
              <button className="btn" type="submit">Join</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

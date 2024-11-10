import { useState } from 'react';
import BoardRow from '../components/boardrows';

export const Leaderboard = () => {
  // State to check if user is part of an organization
  const [isInOrganization, setIsInOrganization] = useState(false);
  const [orgCode, setOrgCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Dummy organization code for validation
  const validOrgCode = "ABCD"; // Example valid org code for demonstration

  // Function to handle organization code submission
  const handleJoinOrganization = () => {
    if (!orgCode) {
      setErrorMessage("Organization code cannot be empty.");
    } else if (orgCode !== validOrgCode) {
      setErrorMessage("Invalid organization code.");
    } else {
      setIsInOrganization(true); // Proceed if code is valid
      setErrorMessage(''); // Clear any previous errors
    }
  };

  return (
    <div className={isInOrganization ? '' : 'leaderboard-container'}>
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
                className="input-field"
                value={orgCode}
                onChange={(e) => setOrgCode(e.target.value)}
                placeholder="Organization code"
              />
            </label>
            <div style={{ marginTop: '10px' }}>
              <button className="btn" type="submit">Join</button>
            </div>
          </form>
          {/* Error message */}
          {errorMessage && (
            <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

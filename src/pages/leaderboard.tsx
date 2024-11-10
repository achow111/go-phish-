import { useState, useEffect  } from 'react';
import axios from 'axios';
import BoardRow from '../components/boardrows';


interface Employee {
  id: number;
  username: string;
  organization: string;
  fish: {
    common: number;
    rare: number;
    mythic: number;
    legendary: number;
  };
  score: number;
}

export const Leaderboard = () => {
  // State to check if user is part of an organization
  const [employees, setEmployees] = useState<Employee[]>([]); // Define employees with Employee[]
  const [isInOrganization, setIsInOrganization] = useState(false);
  const [orgCode, setOrgCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/employees/')
      .then(response => {
        console.log("API Data:", response.data);

        // Sort employees by score in descending order before setting state
        const sortedEmployees = response.data.sort((a: Employee, b: Employee) => b.score - a.score);
        setEmployees(sortedEmployees);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
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
          {employees.length > 0 ? (
        employees.map((employee, index) => (
          <BoardRow
            position={index + 1}
            username={employee.username}
            score={employee.score}
          />
        ))
      ) : (
        <p>Loading data..</p>
      )}
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

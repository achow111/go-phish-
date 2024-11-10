import { useState, useEffect } from 'react';
import axios from 'axios';
import LeaderboardRow from '../components/boardrows';

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
  const [employees, setEmployees] = useState<Employee[]>([]); // Define employees with Employee[]

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

  return (
    <div>
      <h1>Welcome to the Leaderboard Page!</h1>
      <div className="leaderboard-row">
        <span className="position">Place</span>
        <span className="username">Username</span>
        <span className="score">Score</span>
      </div>

      {employees.length > 0 ? (
        employees.map((employee, index) => (
          <LeaderboardRow
            key={employee.id}
            position={index + 1}
            username={employee.username}
            score={employee.score}
          />
        ))
      ) : (
        <p>Loading data..</p>
      )}
    </div>
  );
};

export default Leaderboard;

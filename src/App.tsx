import { useState } from "react";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home"; // Import Home component

function App() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if the user is authenticated

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set authenticated to true after login
  };

  return (
    <div>
      {/* Conditional Rendering */}
      {isAuthenticated ? (
        <Home /> // Show Home component when authenticated
      ) : isLogin ? (
        <Login setIsLogin={setIsLogin} onLoginSuccess={handleLoginSuccess} /> // Pass onLoginSuccess to Login
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;

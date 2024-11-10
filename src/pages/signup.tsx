import { useState } from "react";
import Fishbackground from "../assets/images/fishbackground.svg";
import axios from "axios";

export const Signup = ({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");


  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    setOrganization("")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    setIsEmailValid(validateEmail(email));
  };
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // on sign up => ap icall to add this user in our db
// Handle form submission
const signUpUser = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response = await axiosInstance.post("register/", {
      userName,
      password,
      email,
      organization,
    });
    console.log("Registration successful", response.data);
    localStorage.setItem("username", userName);
    localStorage.setItem("password", password);
    localStorage.setItem("email", email);
    
  }
  catch (err) {
    console.error("Registration error", err);
  }

  

  setIsLogin(true); // Redirect to login after successful registration
};

  return (
    <>
      <img className="fish-background" src={Fishbackground} />
      <div className="signup-container">
        <div className="signup-header-container">
          <h2 className="signup-first-header">Let's Go</h2>
          <h1 className="signup-second-header">Phishing!</h1>
        </div>
        <form className="signup-form" onSubmit={signUpUser}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={`input-field ${!isEmailValid ? "invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
            />
            {!isEmailValid && (
              <p className="error-text">Please enter a valid email address.</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="input-field"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input 
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
        <div className="redirect-text">
          <p>
            Already have an account?{" "}
            <span onClick={() => setIsLogin(true)} className="redirect-link">
               Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;

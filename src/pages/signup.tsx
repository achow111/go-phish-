import { useState } from "react";
import Fishbackground from "../assets/images/fishbackground.svg";

export const Signup = ({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    setIsEmailValid(validateEmail(email));
  };

  return (
    <>
      <img className="fish-background" src={Fishbackground} />
      <div className="signup-container">
        <div className="signup-header-container">
          <h2 className="signup-first-header">Let's Go</h2>
          <h1 className="signup-second-header">Phishing!</h1>
        </div>
        <form className="signup-form">
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
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="input-field"
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

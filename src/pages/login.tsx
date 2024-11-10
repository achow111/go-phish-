// Login.tsx
import { useState } from "react";
import Fishbackground from "../assets/images/fishbackground.svg";

export const Login = ({ setIsLogin, onLoginSuccess }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>>, onLoginSuccess: () => void }) => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailBlur = () => {
        setIsEmailValid(validateEmail(email));
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Logging in with:", email);

        // Simulate successful login and trigger the onLoginSuccess function
        onLoginSuccess();
    };

    return (
        <>
            <img className="fish-background" src={Fishbackground} />
            <div className="signup-container">
                <div className="signup-header-container">
                    <h2 className="signup-first-header">Let's Go</h2>
                    <h1 className="signup-second-header">Phishing!</h1>
                </div>
                <form className="signup-form" onSubmit={handleLoginSubmit}>
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
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="signup-button">
                        Login
                    </button>
                </form>
                <div className="redirect-text">
                    <p>
                        Don't have an account?{" "}
                        <span onClick={() => setIsLogin(false)} className="redirect-link">
                            Signup
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;

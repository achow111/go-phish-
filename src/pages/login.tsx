// Login.tsx
import { useState } from "react";
import Fishbackground from "../assets/images/fishbackground.svg";
import axios from "axios";

export const Login = ({ setIsLogin, onLoginSuccess }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>>, onLoginSuccess: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEmailValid, setIsEmailValid] = useState(true);

    const validateEmail = (email: string) => {
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
    
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Logging in with:", email);
    
        try {
            // Make the API call to check credentials using the axios instance
            const response = await axiosInstance.post("check_credentials/", {
                email,
                password,
            });
    
            // Check if the response is successful
            if (response.status === 200) {
                console.log("Login successful", response.data);
    
                // Save user data to localStorage
                localStorage.setItem("user", JSON.stringify(response.data)); // Store the user data in localStorage
                console.log(localStorage.getItem('user'));
    
                // Trigger the onLoginSuccess callback to perform any further actions
                onLoginSuccess();
            } else {
                console.error("Login failed:", response.data);
                // Optionally handle invalid credentials here, e.g., show an error message
            }
        } catch (err) {
            console.error("Login error", err);
            // Handle any error that occurs during the login request
        }
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
                            onChange={(e) => setPassword(e.target.value)}
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

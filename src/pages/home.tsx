// src/components/Home.tsx

import React, { useState } from "react";
import axios from "axios";
import PhishButton from "../assets/images/PhishButton.svg";
import {PhishingStatus} from "./PhishStatus"; // Import the new component

export const Home = () => {
  const [emailContent, setEmailContent] = useState<string>("");
  const [predictedDepartment, setPredictedDepartment] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPhishingPage, setShowPhishingPage] = useState<boolean>(false); // State to toggle PhishingPage

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (emailContent.trim() === "") {
      setErrorMessage("Please enter the email content.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post(
        'http://localhost:8000/api/predict/',
        new URLSearchParams({ emailContent: emailContent }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      setPredictedDepartment(response.data.predictedDepartment);
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  // Conditionally render the PhishingPage component if showPhishingPage is true
  if (showPhishingPage) {
    return <PhishingStatus status="likely" percentage={85} />;
  }

  return (
    <div className="home-container">
      <p>Copy-paste email content here:</p>
      <textarea
        className="email-textarea"
        placeholder="Include the subject, body, anything else you can..."
        value={emailContent}
        onChange={handleTextChange}
      />
      <img
        className="phish-button"
        src={PhishButton}
        alt="Phish button"
        onClick={handleSubmit}
      />
      <p>Click to check email for <span className="phishing-link" onClick={() => setShowPhishingPage(true)}>phishing</span></p>
      {predictedDepartment && <p>Predicted Department: {predictedDepartment}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Home;

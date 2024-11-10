// src/components/Home.tsx

import React, { useState } from "react";
import axios from "axios";
import PhishButton from "../assets/images/PhishButton.svg";
import {PhishingStatus} from "./PhishStatus"; // Import the new component

const apiUrl = 'http://127.0.0.1:8000/api/predictor/';  // Replace with your Django server URL

export const Home = () => {
  const [emailContent, setEmailContent] = useState<string>("");
  const [predictedDepartment, setPredictedDepartment] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
<<<<<<< HEAD
  const [loading, setLoading] = useState<boolean>(false);
=======
  const [showPhishingPage, setShowPhishingPage] = useState<boolean>(false); // State to toggle PhishingPage
>>>>>>> 28a15001bbf1d6e50487451ef5fe2fb64b4ee088

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
  };

  const handleSubmit = async () => {
    // Check if the input is empty
    if (emailContent.trim() === "") {
      setErrorMessage("Please enter the email content.");
      return;
    }

    // Clear previous error message
    setErrorMessage("");

    // Show loading state
    setLoading(true);

    try {
      // Send POST request to Django API
      const response = await axios.post(
        `${apiUrl}`,  // Ensure the correct endpoint is used
        new URLSearchParams({ emailContent: emailContent }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      // Handle successful response
      setPredictedDepartment(response.data.predictedDepartment);
    } catch (error) {
      // Handle error response
      console.error("Error during prediction:", error);
      setErrorMessage("There was an error during the prediction. Please try again.");
    } finally {
      // Hide loading state
      setLoading(false);
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
      <p>Click to check email for phishing</p>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Show predicted department if available */}
      {predictedDepartment && <p>Predicted Department: {predictedDepartment}</p>}

      {/* Show error message if applicable */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Home;

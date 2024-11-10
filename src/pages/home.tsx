import React, { useState } from "react";
import axios from "axios";
import PhishButton from "../assets/images/PhishButton.svg";
import { PhishingStatus } from "./PhishStatus"; // Import the new component

const apiUrl = 'http://127.0.0.1:8000/api/predictor/';  // Replace with your Django server URL

export const Home = () => {
  const [emailContent, setEmailContent] = useState<string>("");
  const [predictedDepartment, setPredictedDepartment] = useState<number | null>(null); // Change to number type
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    setShowPhishingPage(true); // Show the phishing prediction results when the button is clicked

    try {
      const response = await axios.post(
        `${apiUrl}`,  // Ensure the correct endpoint is used
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
      setErrorMessage("There was an error during the prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Conditionally render the PhishingStatus component based on predictedDepartment
  if (showPhishingPage && predictedDepartment !== null) {
    const percentage = predictedDepartment * 100;

    // Define the status and type it as one of the three allowed values
    let status: "unlikely" | "likely" | "most likely" = "unlikely"; // Default to "unlikely"

    if (percentage >= 76 && percentage <= 90) {
      status = "likely";
    } else if (percentage >= 91 && percentage <= 100) {
      status = "most likely";
    }

    return <PhishingStatus status={status} percentage={percentage} />;
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

      {loading && <p>Loading...</p>}
      {predictedDepartment !== null && (
        <p>Predicted Department: {predictedDepartment * 100}%</p>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import axios from "axios";
import PhishButton from "../assets/images/PhishButton.svg";

export const Home = () => {
  const [emailContent, setEmailContent] = useState<string>("");
  const [predictedDepartment, setPredictedDepartment] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/predict/',
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

  return (
    <div className="home-container">
      <p>Copy-paste email content here:</p>
      <textarea
        className="email-textarea"
        placeholder="Include the subject, body, anything else you can..."
        value={emailContent} // Bind state to textarea
        onChange={handleTextChange} // Update state on change
      />
      <img
        className="phish-button"
        src={PhishButton}
        alt="Phish button"
        onClick={handleSubmit} // Trigger handleSubmit on click
      />
      <p>Click to check email for phishing</p>
      {predictedDepartment && <p>Predicted Department: {predictedDepartment}</p>}
    </div>
  );
};

export default Home;

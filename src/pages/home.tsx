import React, { useState } from "react";
import PhishButton from "../assets/images/PhishButton.svg";

export const Home = () => {
  // State to store textarea content
  const [emailContent, setEmailContent] = useState<string>("");

  // Handle textarea change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
  };

  // Handle button click to submit the content
  const handleSubmit = () => {
    // For now, just log the content, you can implement your phishing check here
    console.log("Email content submitted:", emailContent);

    // Example: Trigger a phishing check (you can replace this with your own logic)
    // checkForPhishing(emailContent);
  };

  return (
    <div className="home-container">
      <p>Copy paste email content in here:</p>
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
    </div>
  );
};

export default Home;

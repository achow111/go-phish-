import React, { useState } from "react";
import axios from "axios";
import PhishButton from "../assets/images/PhishButton.svg";
import { PhishingStatus } from "./PhishStatus"; // Import the new component
import { Groq } from 'groq-sdk'; // Import Groq SDK

const apiUrl = 'http://127.0.0.1:8000/api/predictor/';  // Replace with your Django server URL

export const Home = () => {
  const [emailContent, setEmailContent] = useState<string>("");
  const [predictedDepartment, setPredictedDepartment] = useState<number | null>(null); // Change to number type
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [justification, setJustification] = useState<string | null>(null);  // State to store Groq justification
  const [showPhishingPage, setShowPhishingPage] = useState<boolean>(false); // State to toggle PhishingPage
  const [showModal, setShowModal] = useState<boolean>(false);

  // Function to show the modal
  const showModalHandler = () => {
    setShowModal(true);
  };

  // Function to hide the modal
  const hideModalHandler = () => {
    setShowModal(false);
  };

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

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

      // If prediction is likely or most likely, fetch justification from Groq
      if (response.data.predictedDepartment >= 0.76) {
        const groqResponse = await groq.chat.completions.create({
          model: "llama3-8b-8192",  // Groq model
          messages: [
            { role: 'system', content: 'You are an expert in identifying phishing emails.' },
            {
              role: 'user', content: `Please provide a brief explanation of why this email might be a phishing attempt.
        Identify 2-3 key reasons and list them as concise points in a JSON format. The format should be as follows:
        {
          "Keyword": "Reason"
        }
        where the "Keyword" highlights a key red flag in the email, and the "Reason" is a short explanation of that red flag. 
        The reason should be brief, no longer than a few words or a short sentence. Do not include any additional words or explanations outside of the 'Keyword: Reason' format.
        
        Here is an example of the expected JSON format:
        {
          "Urgency": "Phrases like 'Act now' create a sense of urgency",
          "Suspicious Sender": "The email comes from an unverified or unusual domain",
          "Generic Greeting": "The email uses a vague greeting like 'Dear Customer'"
        }
        
        Keep the points brief and focused only on the key issues without any extra language. Avoid adding any other context or elaboration. 
        Here is the email content:
        ${emailContent}`
            }
          ],
          temperature: 0.4,
          max_tokens: 300,
          response_format: {
            "type": "json_object"
          },
        });

        // Handle the Groq response as JSON
        const justificationText = groqResponse.choices[0].message?.content;

        // Parse and format justification as a JSON object
        const justificationJson = JSON.parse(justificationText as string);

        // Format the justification into a string for modal display
        const formattedJustification = Object.keys(justificationJson)
          .map((key) => {
            return `${key}: ${justificationJson[key]}`;
          })
          .join("\n\n");

        // Save formatted justification text
        setJustification(formattedJustification); 

        // Save JSON output to a file (optional or log to console)
        const jsonOutput = {
          prediction: {
            predictedDepartment: response.data.predictedDepartment,
            justification: justificationJson,
          },
          emailContent: emailContent,
        };

        // Log the JSON output (for demo purposes)
        console.log("JSON Output:", JSON.stringify(jsonOutput, null, 2));
      }

    } catch (error) {
      console.error("Error during prediction:", error);
      setErrorMessage("There was an error during the prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the back button
  const handleBackButton = () => {
    setShowPhishingPage(false); // Hide the phishing page and go back to the initial state
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

    return (
      <div>
        <PhishingStatus status={status} percentage={percentage} />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button onClick={showModalHandler}>Why</button>

          {/* Custom Modal */}
          {showModal && (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "1000",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  width: "400px",
                }}
              >
                <h2>Phishing Explanation</h2> {/* Custom heading */}
                <pre>{justification}</pre> {/* Justification content in preformatted text */}
                <button onClick={hideModalHandler}>Close</button>
              </div>
            </div>
          )}
          <button onClick={handleBackButton}>Back</button> {/* Always displayed */}
        </div>
      </div>
    );
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Home;

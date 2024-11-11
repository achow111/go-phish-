import React from "react";
import UnlikelySVG from "../assets/images/prediction-results/unlikely.svg";
import LikelySVG from "../assets/images/prediction-results/likely.svg";
import MostLikelySVG from "../assets/images/prediction-results/mostlikely.svg";

interface PhishingStatusProps {
    status: "unlikely" | "likely" | "most likely";
    percentage: number;
}

export const PhishingStatus: React.FC<PhishingStatusProps> = ({ status, percentage }) => {
    let statusText = "";
    let statusIcon;
    let messageText = ""; // This will hold the dynamic message

    switch (status) {
        case "unlikely":
            statusText = "Unlikely to be phishing email";
            statusIcon = UnlikelySVG;
            messageText = `This email is not likely to be a phishing email. However, always stay careful!`
            break;
        case "likely":
            statusText = "Likely to be phishing email";
            statusIcon = LikelySVG;
            messageText = `Congratulations you just won a fish barrel! There is a ${percentage}% chance of this being a phishing email. Open now in the chest menu.`;
            break;
        case "most likely":
            statusText = "Most likely to be phishing email";
            statusIcon = MostLikelySVG;
            messageText = `Congratulations you just won a fish barrel! There is a ${percentage}% chance of this being a phishing email. Open now in the chest menu.`;
            break;
        default:
            statusText = "Unknown status";
            break;
    }

    return (
        <div className="phishing-status-container">
            <img src={statusIcon} alt={`${status} icon`} className="status-icon" />
            <p className="status-text">{statusText}</p>
            <p className="percentage-text">
                {messageText || `Not likely to be a phishing email.`}
            </p>
        </div>
    );
};

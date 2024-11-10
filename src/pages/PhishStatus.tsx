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

    switch (status) {
        case "unlikely":
            statusText = "Unlikely to be phishing email";
            statusIcon = UnlikelySVG;
            break;
        case "likely":
            statusText = "Likely to be phishing email";
            statusIcon = LikelySVG;
            break;
        case "most likely":
            statusText = "Most likely to be phishing email";
            statusIcon = MostLikelySVG;
            break;
        default:
            statusText = "Unknown status";
            break;
    }

    return (
        <div className="phishing-status-container">
            <img src={statusIcon} alt={`${status} icon`} className="status-icon" />
            <p className="status-text">{statusText}</p>
            <p className="percentage-text">{percentage}% chance to be a phishing email</p>
        </div>
    );
};


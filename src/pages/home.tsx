import PhishButton from "../assets/images/PhishButton.svg";

export const Home = () => {
  return (
    <div className="home-container">
      <p>Copy paste email content in here:</p>
      <textarea className="email-textarea" placeholder="Paste email content here..." />
      <img className="phish-button" src={PhishButton} alt="Phish button" />
      <p>Click to check email for phishing</p>
    </div>
  );
};

export default Home;

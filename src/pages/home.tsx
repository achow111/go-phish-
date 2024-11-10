export const Home = () => {
    return (
      <div className="home-container">        
        <p>Copy paste email content in here:</p>
        <textarea className="email-textarea" placeholder="Paste email content here..." />
        <button className="check-button">Click to check email for phishing</button>
      </div>
    );
  };
  
  export default Home;
  
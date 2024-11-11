# Go Phish! 🎣

[Video Demo](https://www.youtube.com/watch?v=6sejNYlVdSA&ab_channel=SahejSodhi) • [Devpost](https://devpost.com/software/go-phish-e7qzo3?ref_content=my-projects-tab&ref_feature=my_projects)  • [Figma](https://www.figma.com/design/GmtreKSGdvembjJ9n6k9yv/Go-Phish-Wireframe%2FDesigns?node-id=0-1&node-type=canvas&t=SgsH6IFf5MEau0O1-0)


## 📃Overview

In a world where phishing emails are more prevalent than ever, with over **3.4 billion** phishing emails sent daily and an annual loss of around **$10.4 million**, Go Phish! provides an innovative, engaging solution. Our browser extension combines the importance of identifying and reporting phishing emails with the exciting experience of catching fish! 

Our solution leverages a Random Forest Classifier ML model trained with over 18,600 classified phishing emails, achieving a remarkable **96% accuracy** in detecting potential threats. The user receives not only a phishing warning but also an in-depth explanation as to why an email is suspicious. For added enjoyment, users are rewarded with a gacha-style fishing game where they can collect a variety of stunning fish to build their own "fish tank." A leaderboard fosters friendly competition, allowing users to compare their collections with colleagues and peers.

<p align="center">
  <img src="https://github.com/user-attachments/assets/818cfbae-1152-48b8-acda-1feeeb76e458" width="400" />
</p>


## 🧑‍💻 Tech Stack

- React  
- TypeScript   
- Django  
- Scikit-Learn
- PostgreSQL  
- GroqAPI (Llama 3)

## 🔗 Features

- **Phishing Detection**: An ML model that classifies emails with **96% accuracy** and provides explanations for suspicious emails.
- **Reward Mechanism**: A gacha-style fishing game where users collect rare fish for their "fish tank" each time they successfully detect a phishing email.
- **Leaderboard**: Compete with colleagues to see who has collected the rarest fish, like the elusive Purple Whale.
  
## 👷 How It Works

1. **User Flow Design**: We prioritized user experience, beginning with user flow ideation in Figma. We created a modern, simple interface with four tabs covering everything from detection to the fishing game.
2. **ML Model**: Built with a **Random Forest Classifier**, our model analyzes emails based on parameters such as keywords, urgency, punctuation, spelling, and context to determine the likelihood of phishing. Additionally, we use GroqAPI’s "Llama 3" model to provide an explanation of why an email might be a scam.
3. **Front End**: Using **React** and **TypeScript**, we created dynamic components to ensure a smooth user experience.
4. **Back End**: Our **Django** server handles API calls and data storage using **PostgreSQL**. This setup enables user authentication, organization creation, competition with friends, and fish tank customization.

## 😔 Challenges We Faced

1. **Integration of ML Model**: Connecting our ML model to the front end presented challenges, particularly with handling CORS blocks and status errors.
2. **New Frameworks and Dependencies**: Developing a Chrome extension required creating a `Manifest.json` file, which introduced additional complexity.
3. **Game Mechanics and Database Integration**: Implementing the gacha mechanics, integrating a live database, and managing multiple API calls added further complexity.

## 👊 Next Steps

- Implement a hyperlink verification system to check for harmful links
- Add an Admin view for organizational leaders to view reported phishing emails
- Provide educational content on email phishing
- Expand the fish collection! 🐠

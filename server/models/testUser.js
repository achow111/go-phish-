import mongoose from 'mongoose';
import User from './User.js';

const mongoURI = "mongodb+srv://hirparamegh:96DPE4tOJTjUYHjd@cluster0.0rdfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    testUser(); // Run the test after connection
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });


async function testUser() {
    try {
      // Create a new user
      const newUser = new User({
        username: "john_doe",
        email: "john@example.com",
        password: "securePassword123",
      });
  
      // Save the user to the database
      await newUser.save();
      console.log("New user saved:", newUser);
  
      // Fetch the user from the database
      const user = await User.findOne({ username: "john_doe" });
      console.log("Fetched user:", user);
      
      // Close the MongoDB connection
      mongoose.connection.close();
    } catch (err) {
      console.error("Error during test:", err);
      mongoose.connection.close();
    }
}
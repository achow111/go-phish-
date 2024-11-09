
// not using


import mongoose from 'mongoose';
import Fish from './Fish.js';

const mongoURI = "mongodb+srv://hirparamegh:96DPE4tOJTjUYHjd@cluster0.0rdfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    testFish(); // Run the test after connection
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });


async function testFish() {
    try {
      // Create a new user
      const newFish = new Fish({
        username: "john_doe",
        fish_json: { species: "salmon", length: 120, location: "lake" },
        points: 50
      });
  
      // Save the user to the database
      await newFish.save();
      console.log("New fish saved:", newFish);
  
      // Fetch the user from the database
      const user = await Fish.findOne({ username: "john_doe" });
      console.log("Fetched fish:", user);
      
      // Close the MongoDB connection
      mongoose.connection.close();
    } catch (err) {
      console.error("Error during test:", err);
      mongoose.connection.close();
    }
}
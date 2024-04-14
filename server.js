require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error);
	});

// Create a schema for your data
const userSchema = new mongoose.Schema({
	name: String,
	email: String,
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

// Create an Express app
const app = express();

// Define routes
app.get("/users", async (req, res) => {
	try {
		// Fetch all users from the database
		const users = await User.find();
		res.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

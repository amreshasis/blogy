const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS middleware
const blogRoutes = require("./routes/blogs");

dotenv.config();

const app = express();

// Enable CORS to allow requests from the frontend
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from the frontend

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/blogs", blogRoutes);

// Example route to test connection
app.get("/", (req, res) => {
  res.send("Backend is running and connected to the frontend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

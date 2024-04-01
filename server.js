const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://jmirehkim:13531Coco@dowtrades.ozage5f.mongodb.net/Bruhwhat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(error => {
console.error("Error connecting to MongoDB:", error);
process.exit(1); // Exit the process if unable to connect to MongoDB
});

// API Routes
app.get("/api/fetch-data/:strategy/:model", async (req, res) => {
    try {
      const { strategy, model } = req.params;
      const networthsData = await mongoose.connection.db.collection(`Networths${model}${strategy}`).find().toArray();
      const tradesData = await mongoose.connection.db.collection(`Trades${model}${strategy}`).find().toArray();
      console.log(tradesData)
      res.json({ networthsData, tradesData });
      
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
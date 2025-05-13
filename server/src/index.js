const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoute = require("./routes/UserRoute");

// Register routes
app.use("/users", userRoute);

// Server start
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

const express = require("express");
const cors = require("cors");
const sequelize = require('./config/database'); // your DB connection
const app = express();

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

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

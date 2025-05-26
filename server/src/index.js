const express = require("express");
const cors = require("cors");
const { sequelize } = require('./models');
const app = express();

sequelize.sync({ alter: true, logging: console.log })
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
const serviceTypeRoute = require("./routes/ServiceTypeRoute");
const serviceTypeImageRoute = require("./routes/ServiceTypeImageRoute");
const classRoute = require("./routes/ClassRoute");

// Register routes
app.use("/users", userRoute);
app.use("/serviceTypes", serviceTypeRoute);
app.use("/serviceTypeImages", serviceTypeImageRoute);
app.use("/classes", classRoute);

// Server start
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

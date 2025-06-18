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
const UserRoute = require("./routes/UserRoute");
const ClassRoute = require("./routes/ClassRoute");
const ServiceTypeRoute = require("./routes/ServiceTypeRoute");
const ServiceTypeImageRoute = require("./routes/ServiceTypeImageRoute");
const ServiceTypePriceRoute = require("./routes/ServiceTypePriceRoute");
const ServiceTypeCommentRoute = require("./routes/ServiceTypeCommentRoute");
const CounselorRoute = require("./routes/CounselorRoute");
const CounselorImageRoute = require("./routes/CounselorImageRoute");
const ArticleRoute = require("./routes/ArticleRoute");
const ArticleImageRoute = require("./routes/ArticleImageRoute");
const SharedDescriptionRoute = require("./routes/SharedDescriptionRoute");
const QnaRoute = require("./routes/QnaRoute");

// Register routes
app.use("/users", UserRoute);
app.use("/classes", ClassRoute);
app.use("/serviceTypes", ServiceTypeRoute);
app.use("/serviceTypeImages", ServiceTypeImageRoute);
app.use("/serviceTypePrices", ServiceTypePriceRoute);
app.use("/serviceTypeComments", ServiceTypeCommentRoute);
app.use("/counselors", CounselorRoute);
app.use("/counselorImages", CounselorImageRoute);
app.use("/articles", ArticleRoute);
app.use("/articleImages", ArticleImageRoute);
app.use("/sharedDescriptions", SharedDescriptionRoute);
app.use("/qnas", QnaRoute);

// Server start
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

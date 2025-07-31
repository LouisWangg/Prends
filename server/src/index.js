import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";

// Import routes
import UserRoute from "./routes/UserRoute.js";
import ClassRoute from "./routes/ClassRoute.js";
import ServiceTypeRoute from "./routes/ServiceTypeRoute.js";
import ServiceTypeImageRoute from "./routes/ServiceTypeImageRoute.js";
import ServiceTypePriceRoute from "./routes/ServiceTypePriceRoute.js";
import ServiceTypeCommentRoute from "./routes/ServiceTypeCommentRoute.js";
import CounselorRoute from "./routes/CounselorRoute.js";
import CounselorImageRoute from "./routes/CounselorImageRoute.js";
import CounselorPriceRoute from "./routes/CounselorPriceRoute.js";
import CounselorCommentRoute from "./routes/CounselorCommentRoute.js";
import ArticleRoute from "./routes/ArticleRoute.js";
import ArticleImageRoute from "./routes/ArticleImageRoute.js";
import SharedDescriptionRoute from "./routes/SharedDescriptionRoute.js";
import QnaRoute from "./routes/QnaRoute.js";
import RecommendationRoute from "./routes/RecommendationRoute.js";

const app = express();

// Database sync
sequelize
  .sync({ alter: true, logging: console.log })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use("/users", UserRoute);
app.use("/classes", ClassRoute);
app.use("/serviceTypes", ServiceTypeRoute);
app.use("/serviceTypeImages", ServiceTypeImageRoute);
app.use("/serviceTypePrices", ServiceTypePriceRoute);
app.use("/serviceTypeComments", ServiceTypeCommentRoute);
app.use("/counselors", CounselorRoute);
app.use("/counselorImages", CounselorImageRoute);
app.use("/counselorPrices", CounselorPriceRoute);
app.use("/counselorComments", CounselorCommentRoute);
app.use("/articles", ArticleRoute);
app.use("/articleImages", ArticleImageRoute);
app.use("/sharedDescriptions", SharedDescriptionRoute);
app.use("/qnas", QnaRoute);
app.use("/recommendations", RecommendationRoute);

// Must go after all routes
app.use(errorHandler);

// Server start
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

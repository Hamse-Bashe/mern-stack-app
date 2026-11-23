import express from "express";

import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import uploadRouter from "./routes/upload.js";
import taskRouter from "./routes/tasks.js";


import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import helmet from "helmet";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// swagger
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger.js";
import { limiter } from "./middlewares/rateLimiter.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://dugsiiye.com"]
  })
);

// middleware
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/tasks", taskRouter);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(limiter);



// Custom middleware
// app.use(logger);

console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;

// GET
app.get("/api/health", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Server fronted in Production

if (process.env.NODE_ENV === "production") {

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // Serve the frontend app

    app.get(/.*/, (req, res) => {
        res.send(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
    })
}


// last route-level middleware
app.use(notFound);

// error handler middleware
app.use(errorHandler);


// connect to database
mongoose
  .connect(
    process.env.NODE_ENV == "developmentt"
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PRO,
  )
  .then(() => console.log("✅ MongoDb connected locally."))
  .catch((err) => console.log(`❌ Connection error: ${err}`));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost/${PORT}`);
});

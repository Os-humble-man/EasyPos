import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { logger } from "./_core/Logger";
import http from "http";
import { makeApiRouter } from "./routes";
import session from "express-session";
import cookieParser from "cookie-parser";

(async () => {
  try {
    dotenv.config();

    const app = express();

    app.use(
      cors({
        origin: (origin, callback) => {
          const allowedOrigins = [
            "https://easypos-production.up.railway.app",
            "https://easy-posdrc.vercel.app/",
            "http://localhost:3000",
          ];

          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      })
    );

    app.use(helmet());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(cookieParser());

    app.use(
      session({
        secret: process.env.SESSION_SECRET || "",
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          path: "/",
          domain:
            process.env.NODE_ENV === "production"
              ? "easypos-production.up.railway.app"
              : undefined,
        },
      })
    );

    makeApiRouter(app);

    app.get("/health", (req, res) => {
      res.status(200).send("Application is running");
    });

    const server = http.createServer(app);

    const port = process.env.PORT || 4040;
    const host = process.env.HOST || "localhost";

    server.listen(port, () => {
      logger.info(`Server Started At: ${new Date()}`);
      logger.info(`Server listening at: http://localhost:${port}`);
    });
  } catch (error) {
    logger.error(`Error during server initialization: ${error}`);
    process.exit(1);
  }
})();
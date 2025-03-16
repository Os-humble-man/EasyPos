import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { json } from "body-parser";
import dotenv from "dotenv";
import { config } from "./_core/config";
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
        origin:
          process.env.NODE_ENV === "production"
            ? "https://autolbm.com" 
            : "http://localhost:5173", 
        credentials: true, 
      })
    );
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(cookieParser());

    app.use(session({
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
        domain: process.env.NODE_ENV === "production" ? "autolbm.com" : undefined
      },
    }))
    // app.use(sessionMiddleware);

    makeApiRouter(app);
    app.get("/health", (req, res) => {
      res.status(200).send("Application is running");
    });

    const server = http.createServer(app);

    server.listen(config.server.port, config.server.host, () => {
      logger.info(`Server Started At: ${new Date()}`);
      logger.info(
        `Server listening at: http://${config.server.host}:${config.server.port}`
      );
    });
  } catch (error) {
    logger.error(`Error during server initialization: ${error}`);
    process.exit(1);
  }
})();

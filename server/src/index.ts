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

(async () => {
  try {
    dotenv.config();
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(json());
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

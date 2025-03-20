import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { logger } from "./_core/Logger";
import http from "http";
import { makeApiRouter } from "./routes";
import session from "express-session";
import cookieParser from "cookie-parser";
import pgSession from "connect-pg-simple";
import { Pool } from "pg";

(async () => {
  try {
    dotenv.config();

    const app = express();

    const allowedOrigins = [
      "https://easypos-production.up.railway.app",
      "https://easy-posdrc.vercel.app",
      "http://localhost:3000",
    ];

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const PgSessionStore = pgSession(session);



    app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      })
    );

    app.use((req: Request, res: Response, next: NextFunction): void => {
      if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.status(204).end();
      } else {
        next();
      }
    });



    app.use(helmet());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(cookieParser());

    app.use(
      session({
        store: new PgSessionStore({
          pool: pool,
          tableName: "session",
        }),
        secret: process.env.SESSION_SECRET || "",
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 1000 * 60 * 60 * 24,
          path: "/",
          domain: undefined,
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
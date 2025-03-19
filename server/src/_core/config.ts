import { envNumber, envString } from "./Environment";

type Configuration = {
  server: {
    host: string;
    port: number;
  };
  mysql: {
    host: string;
    port: number;
    password: string;
    database: string;
    user: string;
  };
  redis: {
    host: string;
    port: number;
    password: string;
  };
  sms: {
    username: string;
    password: string;
  };
  jwtSecretKey: string;
  sessionSecretKey: string;
};

const config: Configuration = {
  server: {
    host: envString("HTTP_HOST", "0.0.0.0"),
    port: envNumber("HTTP_PORT", 4040),
  },
  mysql: {
    host: envString("DB_HOST", ""),
    port: envNumber("DB_PORT", 3306),
    user: envString("DB_USER", ""),
    password: envString("DB_PASSWORD", ""),
    database: envString("DB_DATABASE", ""),
  },
  redis: {
    host: envString("REDIS_HOST", "localhost"),
    port: envNumber("REDIS_PORT", 6379),
    password: "",
  },
  sms: {
    username: envString("SMS_API_Username", ""),
    password: envString("SMS_API_Password", ""),
  },
  jwtSecretKey: envString("JWT_SECRET_KEY", ""),
  sessionSecretKey: envString("SESSION_SECRET", ""),
};

export { config };

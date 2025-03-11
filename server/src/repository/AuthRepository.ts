import DatabaseManager from "../_core/DatabaseManager";
import { logger } from "../_core/Logger";
import bcrypt from "bcrypt";

export interface Credentials {
  username: string;
  password: string;
}

const db = DatabaseManager.getInstance().getPool();

export const AuthRepository = {
  async login(credentials: Credentials) {
    const connection = await db.getConnection();
    try {
      const { username, password } = credentials;
      const query =
        "SELECT * FROM `users` WHERE user_name = ? AND user_active = 1";
      const [rows]: any = await connection.query(query, [username]);

      if (rows.length === 0) {
        throw new Error("User not found");
      }

      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      return user;
    } catch (error) {
      logger.error("Error during login:", error);
      throw error;
    }
  },

  async logout(token: string) {
    // try {
    //   // Invalidate token logic here (e.g., add to blacklist)
    //   return { message: "Logged out successfully" };
    // } catch (error) {
    //   logger.error("Error during logout:", error);
    //   throw error;
    // }
  },

  async refreshToken(oldToken: string) {
    // try {
    //     // Verify old token and generate new token logic here
    //     const newToken = 'new-generated-jwt-token';
    //     return { token: newToken };
    // } catch (error) {
    //     logger.error('Error during token refresh:', error);
    //     throw error;
    // }
  },
};

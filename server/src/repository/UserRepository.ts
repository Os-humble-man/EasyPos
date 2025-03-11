import DatabaseManager from "../_core/DatabaseManager";
import { logger } from "../_core/Logger";
import bcrypt from "bcrypt";



export interface User {
    id?: string;
    username: string;
    departmentId: string;
    password: string;
}

const db = DatabaseManager.getInstance().getPool()

 export const UserRepository = {
    async createUser(data:User){
        const connection = await db.getConnection();
        try {
            const query = `INSERT INTO users (user_name, user_department, user_password) VALUES (?,?,?)`;
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const [result] = await connection.query(query, [data.username, data.departmentId, hashedPassword]);
            return result;
        } catch (error) {
            logger.error(`Error in UserRepository.createUser: ${(error as any).message}`);
            connection.rollback();
            throw new Error(`Failed to create user`);
        }finally{
            connection.release();
        }
    },
    async getAllUsers(){
        const connection = await db.getConnection();
        try {
            const query = `SELECT A.*, B.*, true As seen FROM users A LEFT JOIN tbl_department B ON A.user_department = B.dpt_id`;
            const [result] = await connection.query(query);
            return result;
        } catch (error) {
            logger.error(`Error in UserRepository.getAllUsers: ${(error as any).message}`);
            throw new Error(`Failed to get all users`);
        }finally{
            connection.release();
        }
    },
    async getActiveUsers(){
        const connection = await db.getConnection();
        try {
            const query = `SELECT * FROM users WHERE user_active = 1`;
            const [result] = await connection.query(query);
            return result;
        } catch (error) {
            logger.error(`Error in UserRepository.getActiveUsers: ${(error as any).message}`);
            throw new Error(`Failed to get active users`);
        }finally{
            connection.release();
        }
    }
}
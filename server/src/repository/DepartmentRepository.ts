import DatabaseManager from "../_core/DatabaseManager";
import { logger } from "../_core/Logger";

interface Department {
  id?: string;
  name: string;
}

interface Category {
  id?: string;
  name: string;
  time: string;
  departmentId: string;
}

const db = DatabaseManager.getInstance().getPool();

export const DepartmentRepository = {
  async getAllDepartments() {
    const connection = await db.getConnection();
    try {
      const query = `SELECT * FROM tbl_department`;
      const [result] = await connection.query(query);
      return result;
    } catch (error) {
      logger.error(
        `Error in DepartmentRepository.getAllDepartments: ${
          (error as any).message
        }`
      );
      throw new Error(`Failed to get all departments`);
    } finally {
      connection.release();
    }
  },

  async createDepartment({ name }: Department) {
    const connection = await db.getConnection();
    try {
      const query = `INSERT INTO tbl_department (dpt_name) VALUES (?)`;
      const [result] = await connection.query(query, [name]);
      return result;
    } catch (error) {
      logger.error(
        `Error in DepartmentRepository.createDepartment: ${
          (error as any).message
        }`
      );
      connection.rollback();
      throw new Error(`Failed to create department`);
    } finally {
      connection.release();
    }
  },

  async updateDepartment(data: Department) {
    const connection = await db.getConnection();
    try {
      const query = `UPDATE tbl_department SET dpt_name = ? WHERE dpt_id = ?`;
      const [result] = await connection.query(query, [data.name, data.id]);
      return result;
    } catch (error) {
      logger.error(
        `Error in DepartmentRepository.updateDepartment: ${
          (error as any).message
        }`
      );
      connection.rollback();
      throw new Error(`Failed to update department`);
    } finally {
      connection.release();
    }
  },

  async getAllCategories() {
    const connection = await db.getConnection();
    try {
      const query = `SELECT * FROM tbl_category`;
      const [result] = await connection.query(query);
      return result;
    } catch (error) {
      logger.error(
        `Error in DepartmentRepository.getAllCategories: ${
          (error as any).message
        }`
      );
      throw new Error(`Failed to get all categories`);
    } finally {
      connection.release();
    }
  },

  async createCategory(data: Category) {
    const connection = await db.getConnection();
    try {
      const query = `INSERT INTO tbl_category (cat_name, cat_time, cat_department) VALUES (?,?,?)`;
      const [result] = await connection.query(query, [
        data.name,
        data.time,
        data.departmentId,
      ]);
      return result;
    } catch (error) {
      logger.error(
        `Error in DepartmentRepository.createCategory: ${
          (error as any).message
        }`
      );
      connection.rollback();
      throw new Error(`Failed to create category`);
    } finally {
      connection.release();
    }
  },

  async updateCategory(data: Category) {
    const connection = await db.getConnection();
    try {
      const query = `UPDATE tbl_category SET cat_name = ?, cat_time = ?, cat_department = ? WHERE cat_id = ?`;
      const [result] = await connection.query(query, [
        data.name,
        data.time,
        data.departmentId,
        data.id,
      ]);
      return result;
    } catch (error) {
      logger.error(
        `Error in DepartmentRepository.updateCategory: ${
          (error as any).message
        }`
      );
      connection.rollback();
      throw new Error(`Failed to update category`);
    } finally {
      connection.release();
    }
  },
  async deleteCategory(id: string) {
    const connection = await db.getConnection();
    try {
      const query = `DELETE FROM tbl_category WHERE cat_id = ?`;
      const [result] = await connection.query(query, [id]);
      return result;
    } catch (error) {
      logger.error(
        `Error in DepartmentRepository.deleteCategory: ${
          (error as any).message
        }`
      );
      connection.rollback();
      throw new Error(`Failed to delete category`);
    } finally {
      connection.release();
    }
  },
};

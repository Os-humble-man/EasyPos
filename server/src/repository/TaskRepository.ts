import DatabaseManager from "../_core/DatabaseManager";
import { logger } from "../_core/Logger";

export interface Task {
  id?: string;
  title: string;
  status?: string;
  project: string;
  estimatedTime: string;
  assignTo: string;
}

const db = DatabaseManager.getInstance().getPool();

export const TaskRepository = {
  async createTask(data: Task) {
    const connection = await db.getConnection();
    try {
      const query = `INSERT INTO tbl_task (task, status, estimated_time, project,assigned_to) VALUES (?,?,?,?,?)`;
      const [result] = await connection.query(query, [
        data.title,
        "Open",
        data.estimatedTime,
        data.project,
        data.assignTo,
      ]);
      return result;
    } catch (error) {
      logger.error(
        `Error in TaskRepository.createTask: ${(error as any).message}`
      );
      connection.rollback();
      throw new Error(`Failed to create task`);
    } finally {
      connection.release();
    }
  },

  async updateTask(data: Task) {
    const connection = await db.getConnection();
    try {
      const query = `UPDATE tbl_task SET task = ?, estimated_time = ? WHERE task_id = ?`;
      const [result] = await connection.query(query, [
        data.title,
        data.estimatedTime,
        data.id,
      ]);
      return result;
    } catch (error) {
      logger.error(
        `Error in TaskRepository.updateTask: ${(error as any).message}`
      );
      connection.rollback();
      throw new Error(`Failed to update task`);
    } finally {
      connection.release();
    }
  },

  async deleteTask({ id }: Task) {
    const connection = await db.getConnection();
    try {
      const removeInTaskTable = `DELETE FROM tbl_task WHERE task_id = ?`;
      const removeInFollowUpTable = `DELETE FROM tbl_follow_up WHERE task_id = ?`;
      await connection.query(removeInFollowUpTable, [id]);
      const [result] = await connection.query(removeInTaskTable, [id]);
      return result;
    } catch (error) {
      connection.rollback();
      logger.error(
        `Error in TaskRepository.deleteTask: ${(error as any).message}`
      );
      throw new Error(`Failed to delete task`);
    } finally {
      connection.release();
    }
  },
  async getTaskById(id: string) {},

  async getAllTasks(departmentId: string) {
    const connection = await db.getConnection();
    try {
      const query = `SELECT A.*, B.user_name, B.user_department, C.*, 0 As checked FROM tbl_task A LEFT JOIN users B ON A.assigned_to = B.id_user LEFT JOIN tbl_category C ON C.ctg_time = A.estimated_time AND C.ctg_department = ? WHERE B.user_department = ? ORDER BY id_task DESC`;
      const [result] = await connection.query(query, [
        departmentId,
        departmentId,
      ]);
      return result;
    } catch (error) {
      logger.error(
        `Error in TaskRepository.getAllTasks: ${(error as any).message}`
      );
      throw new Error(`Failed to get all tasks`);
    } finally {
      connection.release();
    }
  },

  async doneTask(data: any) {},

  async doneAllTask(tasksList: any[]) {
    const connection = await db.getConnection();
    const list = tasksList.map((task) => task.id);
    try {
      const query = `UPDATE tbl_task SET status = 'Completed' WHERE id_task IN (?)`;
      const [result] = await connection.query(query, [list]);
      return result;
    } catch (error) {
      logger.error(
        `Error in TaskRepository.doneAllTask: ${(error as any).message}`
      );
      connection.rollback();
      throw new Error(`Failed to done all task`);
    } finally {
      connection.release();
    }
  },

  async undoneTask(data: any) {},

  async restartTask({ id }: Task) {
    const connection = await db.getConnection();
    try {
      const query = `UPDATE tbl_task SET status='Open',  total = 0 WHERE id_task = ?`;
      const [result] = await connection.query(query, [id]);
      const resultHeader = result as unknown as { affectedRows: number };
      if (resultHeader.affectedRows === 0) {
        throw new Error(`Task not found`);
      }
      await connection.query(`DELETE FROM tbl_follow_task WHERE id_task = ?`, [
        id,
      ]);

      return result;
    } catch (error) {
      logger.error(
        `Error in TaskRepository.restartTask: ${(error as any).message}`
      );
      connection.rollback();
      throw new Error(`Failed to restart task`);
    } finally {
      connection.release();
    }
  },

  async startTask(data: any) {},

  async closeTask({ id }: Task) {
    const connection = await db.getConnection();
    try {
      const query = `UPDATE tbl_task SET status = ? WHERE task_id = ?`;
      const [result] = await connection.query(query, ["Completed", id]);
      return result;
    } catch (error) {
      logger.error(
        `Error in TaskRepository.closeTask: ${(error as any).message}`
      );
      connection.rollback();
      throw new Error(`Failed to close task`);
    } finally {
      connection.release();
    }
  },

  async editTaskCategory(data: any) {
    const connection = await db.getConnection();
    try {
      const query = `UPDATE tbl_task SET estimated_time = ? WHERE id_task= ?`;
      const [result] = await connection.query(query, [data.category, data.id]);
      return result;
    } catch (error) {
      logger.error(
        `Error in TaskRepository.editTaskCategory: ${(error as any).message}`
      );
      connection.rollback();
      throw new Error(`Failed to edit task category`);
    } finally {
      connection.release();
    }
  },

  async relanceTask(data: any) {
    const connection = await db.getConnection();
    try {
      const query = `UPDATE tbl_task SET status = 'Closed' WHERE id_task = ?`;
      const [result] = await connection.query(query, [data.id]);
      return result;
    } catch (error) {
      logger.error(
        `Error in TaskRepository.relanceTask: ${(error as any).message}`
      );
      connection.rollback();
      throw new Error(`Failed to relance task`);
    } finally {
      connection.release();
    }
  },

  async getHoursDoneTask(data: any) {
    const connection = await db.getConnection();
    try {
      const query = `SELECT 
                TIMESTAMPDIFF(MINUTE , A.start_follow , A.end_follow) / 60 AS hour_diff,
                A.*, 
                B.*
            FROM tbl_follow_task A
            LEFT JOIN tbl_task B ON A.id_task = B.id_task
            WHERE DATE(A.start_follow) = ? AND B.assigned_to = ?`;
      const [result] = await connection.query(query, [data.date, data.userId]);
      return result;
    } catch (error) {
      logger.error(
        `Error in TaskRepository.getHoursDoneTask: ${(error as any).message}`
      );
      throw new Error(`Failed to get hours done task`);
    }
  },

  async getTaskByUserId(userId: string, departmentId: string) {
    const connection = await db.getConnection();
    try {
      const query = `SELECT A.*, B.*, C.user_name, 1 As seen FROM tbl_task A LEFT JOIN tbl_category B ON B.ctg_time = A.estimated_time AND B.ctg_department = ? LEFT JOIN users C ON C.id_user = A.assigned_to WHERE A.assigned_to = ? ORDER BY A.id_task DESC`;
      const [result] = await connection.query(query, [departmentId, userId]);
      return result;
    } catch (error) {
      logger.error(
        `Error in TaskRepository.getTaskByUserId: ${(error as any).message}`
      );
      throw new Error(`Failed to get task by user id`);
    } finally {
      connection.release();
    }
  },

  async makeRapport(data: any) {},
};

import { pool } from "../libs/db.js";

export class Order {
    async createOrder(idSchool, contentCart, total, completed, idUser) {
        const connection = await pool.connect();
        try {
            const qy = "INSERT INTO orders (user_id, school_id, orders_content, total_amount, is_completed) VALUES($1, $2, $3, $4, $5) RETURNING orders_content";
            const { rows: contentRows } = await connection.query(qy, [idUser, idSchool, contentCart, total, completed]);

            return contentRows[0].orders_content;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }

    async listAllOrders (idSchool) {
        const connection = await pool.connect();
        try {
            const qy = "SELECT * FROM orders WHERE school_id = $1";
            const consult = await connection.query(qy,[idSchool]);
            return consult.rows;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
}

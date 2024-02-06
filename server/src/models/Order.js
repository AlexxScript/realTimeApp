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
            const qy = "SELECT * FROM orders WHERE school_id = $1 ORDER BY orders_time ASC";
            const consult = await connection.query(qy,[idSchool]);
            return consult.rows;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }

    async updateOrderStatus (idOrder) {
        const connection = await pool.connect();
        try {
            const qy = "UPDATE orders SET is_completed=true WHERE id_orders = $1";
            await connection.query(qy,[idOrder]);
            return "succes";
        } catch (error) {
            console.log(`database error: ${error}`);
        } finally {
            connection.release();
        }
    }

    async deleteOrder(idOrder,idSchool) {
        const connection = await pool.connect();
        try {
            const qy = "DELETE FROM orders WHERE id_orders = $1 AND school_id = $2";
            await connection.query(qy,[idOrder,idSchool]);
            return "deleted succes";
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
}

import { pool } from "../libs/db.js";

export class Order {
    async createOrder(email, idSchool, contentCart, total, completed) {
        const connection = await pool.connect();
        try {
            const qy0 = "SELECT id_users FROM users WHERE email_users = $1";
            const { rows: userRows } = await connection.query(qy0, [email]);

            const qy = "INSERT INTO orders (user_id, school_id, orders_content, total_amount, is_completed) VALUES($1, $2, $3, $4, $5) RETURNING orders_content";
            const { rows: contentRows } = await connection.query(qy, [userRows[0].id_users, idSchool, contentCart, total, completed]);

            return contentRows[0].orders_content;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
}

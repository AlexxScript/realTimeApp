import { pool } from "../libs/db.js";

export class Order {
    async createOrder (email,idSchool,content,total,completed) {
        const connection = await pool.connect();
        try {
            const qy0 = "SELECT id_users FROM users WHERE email_users = $1";
            const consult = await connection.query(qy0,[email]);
            const qy = "INSERT INTO orders (user_id,school_id,orders_content,total_amount,is_completed) VALUES($1,$2,$3,$4,$5) RETURNING orders_content";
            await connection.query(qy,[consult.rows[0].user_id,idSchool,content,total,completed]);
            return "created";
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
}
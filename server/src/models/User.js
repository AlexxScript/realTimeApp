import { pool } from "../libs/db.js";

export class User {

    async create(userEmail, userName, role, password) {
        const connection = await pool.connect();
        try {
            const qy = 'INSERT INTO users (email_users,users_name,role,password) VALUES($1,$2,$3,$4)';
            const insertion = await connection.query(qy, [userEmail, userName, role, password]);
            console.log(insertion);
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }

    async usersSelectAll() {
        const connection = await pool.connect();
        try {
            const qy = 'SELECT * FROM users';
            const consulta = await connection.query(qy);
            return consulta;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }

    async usersExist(userEmail, userName) {
        const connection = await pool.connect();
        try {
            const qy = 'SELECT * FROM users WHERE email_users = $1 OR users_name = $2';
            const consulta = await connection.query(qy, [userEmail, userName]);
            return consulta;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
}
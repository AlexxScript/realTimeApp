import { pool } from "../libs/db.js";

export class User {

    async create(userEmail, userName, role, password,schoolId) {
        const connection = await pool.connect();
        try {
            const qy = 'INSERT INTO users (email_users,users_name,role,password,school_id) VALUES($1,$2,$3,$4,$5)';
            const insertion = await connection.query(qy, [userEmail, userName, role, password,schoolId]);
            console.log(insertion);
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }

    async usersSelectAll(idSchool) {
        const connection = await pool.connect();
        try {
            const qy = 'SELECT * FROM users WHERE school_id = $1';
            const consulta = await connection.query(qy,[idSchool]);
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

    async selectUser (userEmail){
        const connection = await pool.connect();
        try {
            const qy = 'SELECT * FROM users WHERE email_users = $1';
            const consulta = await connection.query(qy,[userEmail]);
            return consulta;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
}
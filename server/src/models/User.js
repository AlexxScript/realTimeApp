import { pool } from "../libs/db.js";

export class User {

    async create (userEmail,userName,role,password) {
        try {
            const connection = await pool.connect();
            const qy = 'INSERT INTO users (email_users,users_name,role,password) VALUES($1,$2,$3,$4)';
            const insertion = await connection.query(qy,[userEmail,userName,role,password]);
            console.log(insertion);
        } catch (error) {
            console.log(error);
        }
    }

    async usersExist (userEmail,userName) {
        try {
            const connection = await pool.connect();
            const qy = 'SELECT * FROM users WHERE email_users = $1 OR users_name = $2';
            const consulta = await connection.query(qy,[userEmail,userName]);
            return consulta;
        } catch (error) {
            console.log(error);
        }
    }
}
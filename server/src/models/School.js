import { pool } from "../libs/db.js";

export class School {
    async createSchool(schoolName, passwordSchool) {
        const connection = await pool.connect();
        try {
            const qy = 'INSERT INTO school (school_name,password_school) VALUES($1,$2)';
            const created = await connection.query(qy, [schoolName, passwordSchool]);
            console.log(created);
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
    async consultSchool(nameSchool) {
        const connection = await pool.connect();
        try {
            const qy = 'SELECT * FROM school WHERE school_name = $1';
            const result = await connection.query(qy,[nameSchool]);
            return result;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
}
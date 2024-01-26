import { pool } from "../libs/db.js";

export class MenuItems {
    async createItem(name, description, price, available, schoolId,qyItems) {
        const connection = await pool.connect();
        try {
            const qy = "INSERT INTO menu_items (item_name,description,price,available,school_id,quantity) VALUES($1,$2,$3,$4,$5,$6) RETURNING item_name,description,price,available";
            const created = await connection.query(qy, [name, description, price, available, schoolId, qyItems]);
            return created;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }

    async consultItem(name, schoolId) {
        const connection = await pool.connect();
        try {
            const qy = "SELECT item_name FROM menu_items WHERE school_id = $1 AND item_name = $2";
            const result = await connection.query(qy, [schoolId, name]);
            return result;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }

    async consultAllItems(schoolId) {
        const connection = await pool.connect();
        try {
            const qy = "SELECT * FROM menu_items WHERE school_id = $1";
            const result = await connection.query(qy,[schoolId]);
            return result;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
}
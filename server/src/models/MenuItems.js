import { pool } from "../libs/db.js";

export class MenuItems {
    async createItem(name,description,price,available,schoolId){
        const connection = await pool.connect();
        try {
            const qy = "INSERT INTO menu_items (item_name,description,price,available,school_id) VALUES($1,$2,$3,$4,$5)";
            const created = await connection.query(qy,[name,description,price,available,schoolId]);
            return created;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }

    async consultItem (name,schoolId) {
        const connection = await pool.connect();
        try {
            const qy = "SELECT item_name FROM menu_items WHERE school_id = $1 AND item_name = $2";
            const result = await connection.query(qy,[schoolId,name]);
            return result;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
}
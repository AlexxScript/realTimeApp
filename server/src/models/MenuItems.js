import { pool } from "../libs/db.js";

export class MenuItems {
    async createItem(name, description, price, available, schoolId, qyItems) {
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

    async consultItem(id, schoolId) {
        const connection = await pool.connect();
        try {
            const qy = "SELECT * FROM menu_items WHERE school_id = $1 AND id_item = $2";
            const result = await connection.query(qy, [schoolId, id]);
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
    async consultItemByName(nameItem, schoolId) {
        const connection = await pool.connect();
        try {
            const qy = "SELECT * FROM menu_items WHERE school_id = $1 AND item_name = $2";
            const result = await connection.query(qy, [schoolId, nameItem]);
            console.log(result);
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
            const result = await connection.query(qy, [schoolId]);
            return result;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }

    async updateItem(schoolId, name, description, price, available, qyItems, idItem) {
        const connection = await pool.connect();
        try {
            console.log("objeto de bd", schoolId, name, description, price, available, qyItems);
            const qy = "UPDATE menu_items SET item_name=$1,description=$2,price=$3,available=$4,quantity=$5 WHERE id_item=$6 AND school_id=$7";
            const result = await connection.query(qy, [name, description, price, available, qyItems, idItem, schoolId]);
            return result;
        } catch (error) {
            console.log(error)
        } finally {
            connection.release();
        }
    }

    async deleteItem(idItem,itemName,idSchool){
        const connection = await pool.connect();
        try {
            const qy = "DELETE FROM menu_items WHERE id_item=$1 AND item_name=$2 AND school_id=$3";
            const result = await connection.query(qy,[idItem,itemName,idSchool]);
            return result;
        } catch (error) {
            console.log(error);
        } finally {
            connection.release();
        }
    }
}
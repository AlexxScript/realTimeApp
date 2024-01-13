import pkg from 'pg';
import dotenv from 'dotenv/config';

const { Pool } = pkg;

export const pool = new Pool({
    user: process.env.USERDB,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORTPOSTGRES
});
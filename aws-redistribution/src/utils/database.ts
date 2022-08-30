import mysql from 'mysql2';
import { DATA_SOURCES } from '../config/config';
const dataSource = DATA_SOURCES.mysql;

const initDB = mysql.createPool({
    host: dataSource.DB_HOST,
    user: dataSource.DB_USER,
    database: dataSource.DB_DATABASE,
    password: dataSource.DB_PASS,
});

export default initDB.promise();

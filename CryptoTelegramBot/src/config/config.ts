import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../', '/.env') });

export const DATA_SOURCES = {
    mysql: {
        DB_HOST: process.env.HOST_DB,
        DB_USER: process.env.USER_DB,
        DB_PASS: process.env.PASS_DB,
        DB_DATABASE: process.env.DATABASE_DB,
    },
};

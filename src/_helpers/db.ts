import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../users/user.model"; // Import User entity
import mysql from "mysql2/promise"; // Used to check/create database

dotenv.config(); // Load environment variables from .env

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const db = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [User], // Register User entity
    synchronize: true, 
    logging: true,
});

async function initializeDatabase() {
    try {
        // Create connection to MySQL (without selecting DB)
        const connection = await mysql.createConnection({ 
            host: DB_HOST, 
            port: Number(DB_PORT), 
            user: DB_USER, 
            password: DB_PASSWORD 
        });

        // Ensure the database exists
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
        console.log(`✅ Database '${DB_NAME}' is ready.`);

        // Initialize TypeORM DataSource
        await db.initialize();
        console.log(" TypeORM Data Source has been initialized!");
    } catch (error) {
        console.error(" Database initialization failed:", error);
        process.exit(1); // Exit on failure
    }
}

// Start database initialization
initializeDatabase();
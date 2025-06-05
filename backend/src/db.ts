import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

console.log("DB_SERVER →", process.env.DB_SERVER);
console.log("DB_USER   →", process.env.DB_USER);
console.log("DB_PASSWORD →", process.env.DB_PASSWORD);
console.log("DB_DATABASE →", process.env.DB_DATABASE);

const config: sql.config = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    server: process.env.DB_SERVER!,
    database: process.env.DB_DATABASE!,
    options: {
    encrypt: true,
    trustServerCertificate: process.env.DB_TRUST_CERT === "true", 
    },
    pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },

};

export async function getConnection(): Promise<sql.ConnectionPool>{
    try{
        const pool = await sql.connect(config);
        return pool;
    } catch (error){
        console.error("Error conectando a SQL Server:", error);
        throw error;
    }
}
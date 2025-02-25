// DataBase
import dotenv from "dotenv";
import { Client } from "pg";

const env = dotenv.config().parsed;

const pool = new Client({
  database: env?.DATABASE ? env.DATABASE : "",
  host: env?.DATABASE_HOST ? env.DATABASE_HOST : "",
  user: env?.DATABASE_USER ? env.DATABASE_USER : "",
  password: env?.DATABASE_PASSWORD ? env.DATABASE_PASSWORD : "",
  port: 5432
});

export default pool;

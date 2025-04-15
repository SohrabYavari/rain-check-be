import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

const ENV = process.env.NODE_ENV || "dev";

if (ENV !== "prod") {
  dotenv.config({ path: path.resolve(__dirname, `../../.env.${ENV}`) });
}

//* Config object for the .env files:
let config: any;


//* Hosting db with JAWSDB_URL (Heroku)
//* With the url, use the URL class to split the required fields to be used.
if (process.env.JAWSDB_URL) {
  const dbUrl = new URL(process.env.JAWSDB_URL);
  config = {
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    port: Number(dbUrl.port),
  };
} else if (process.env.DB_DATABASE) {
  //! Local db files
  config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
  };
} else {
  throw new Error(
    "No database configuration found. Set JAWSDB_URL or individual DB_* variables."
  );
}

const db = mysql.createPool(config);

export default db;

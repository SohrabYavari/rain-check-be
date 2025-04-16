import {Pool} from 'pg'
import dotenv from "dotenv";
import path from "path";

const ENV = process.env.NODE_ENV || "dev";

if (ENV !== "prod") {
  dotenv.config({ path: path.resolve(__dirname, `../../.env.${ENV}`) });
}

//* Config object for the .env files:
let config: any;


if (process.env.DATABASE_URL) {
  const dbUrl = new URL(process.env.DATABASE_URL);
  config = {
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    port: Number(dbUrl.port),
    ssl: { rejectUnauthorized: false },
  };
} else if (process.env.DB_DATABASE) {
  //! Local PostgresQL config
  config = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
  };
} 

const db = new Pool(config);

export default db;

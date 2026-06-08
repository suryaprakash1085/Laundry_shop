import knex from "knex";
import "dotenv/config";

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "3306"),
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "laundry_shop2.1",
    database: process.env.DATABASE_NAME || "laundry_shop2.1",
  },
});

export default db;

require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DATABASE_HOST || "localhost",
      port: parseInt(process.env.DATABASE_PORT || "3306"),
      user: process.env.DATABASE_USER || "root",
      password: process.env.DATABASE_PASSWORD || "",
      database: process.env.DATABASE_NAME || "laundry_shop",
    },
    migrations: {
      directory: "./migrations",
      extension: "ts", // si tus migraciones son TypeScript
    },
  },
};

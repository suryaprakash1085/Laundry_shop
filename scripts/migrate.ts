import knex from "knex";
import "dotenv/config";

const db = knex({
  client: "pg",
  connection: process.env.DATABASE_URL || {
    host: process.env.PGHOST || "localhost",
    port: parseInt(process.env.PGPORT || "5432"),
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "",
    database: process.env.PGDATABASE || "laundry_shop",
  },
  migrations: {
    extension: "ts",
    directory: "./server/migrations",
  },
  seeds: {
    extension: "ts",
    directory: "./server/seeds",
  },
});

async function main() {
  const action = process.argv[2] || "migrate";
  try {
    if (action === "migrate") {
      console.log("Running migrations...");
      const [batchNo, log] = await db.migrate.latest();
      if (log.length === 0) {
        console.log("Already up to date.");
      } else {
        console.log(`Batch ${batchNo} run: ${log.length} migrations`);
        log.forEach((m: string) => console.log(" -", m));
      }
    } else if (action === "seed") {
      console.log("Running seeds...");
      const [log] = await db.seed.run();
      console.log(`Seeded: ${log.join(", ")}`);
    } else if (action === "rollback") {
      console.log("Rolling back...");
      const [batchNo, log] = await db.migrate.rollback();
      console.log(`Batch ${batchNo} rolled back: ${log.length} migrations`);
    }
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

main();

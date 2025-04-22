import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Jitendra@7488",
  database: "next_auth",
});

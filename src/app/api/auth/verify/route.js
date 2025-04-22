import { pool } from "../../../../lip/db";

export async function GET(req) {
  const token = new URL(req.url).searchParams.get("token");

  const [rows] = await pool.query("SELECT * FROM users WHERE verifyToken = ?", [
    token,
  ]);
  if (rows.length === 0) {
    return Response.json({ error: "Invalid token" }, { status: 400 });
  }

  await pool.query(
    "UPDATE users SET isVerified = ?, verifyToken = NULL WHERE id = ?",
    [true, rows[0].id]
  );

  return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
}

import { pool } from "../../../../lip/db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
// import { sendVerificationEmail } from "@/lib/mailer";
import { sendVerificationEmail } from "../../../../lip/mailer";

export async function POST(req) {
  const { name, email, password } = await req.json();

  const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (existing.length > 0) {
    return Response.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verifyToken = uuidv4();

  await pool.query(
    "INSERT INTO users (name, email, password, verifyToken) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, verifyToken]
  );

  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${verifyToken}`;
  await sendVerificationEmail(email, link);

  return Response.json({ message: "Verification email sent" });
}

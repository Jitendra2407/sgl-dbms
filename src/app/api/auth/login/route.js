import { pool } from "../../../../lip/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import JWT package

export async function POST(req) {
  const { email, password } = await req.json();

  const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  const user = users[0];
  if (!user)
    return Response.json({ error: "Invalid credentials" }, { status: 401 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return Response.json({ error: "Invalid credentials" }, { status: 401 });

  if (!user.isVerified)
    return Response.json({ error: "Email not verified" }, { status: 403 });

  // Generate a token using JWT
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET, // Use a secret key (store it in an env variable)
    { expiresIn: "1h" } // Optional: set expiration time for the token
  );

  return Response.json({
    message: "Login successful",
    token, // Return the generated token in the response
    user: { id: user.id, name: user.name, email: user.email },
  });
}

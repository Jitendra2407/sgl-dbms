// import { pool } from "../../../../lip/db";

// export async function DELETE(req) {
//   try {
//     const body = await req.json();
//     const { id } = body;

//     if (!id) {
//       return Response.json({ error: "User ID is required" }, { status: 400 });
//     }

//     // Execute the DELETE query using pool
//     await pool.execute("DELETE FROM users WHERE id = ?", [id]);

//     return Response.json(
//       { message: "User deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Delete error:", error);
//     return Response.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }

import { pool } from "../../../../lip/db";

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    // Execute the DELETE query using pool
    await pool.execute("DELETE FROM users WHERE id = ?", [id]);

    return Response.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

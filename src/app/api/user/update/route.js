// import { pool } from "../../../../lip/db";

// export async function PUT(req) {
//   try {
//     const body = await req.json();
//     const { id, name, email } = body;

//     if (!id || !name || !email) {
//       return Response.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // Execute the UPDATE query using pool
//     await pool.execute("UPDATE users SET name = ?, email = ? WHERE id = ?", [
//       name,
//       email,
//       id,
//     ]);

//     return Response.json(
//       { message: "User updated successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Update error:", error);
//     return Response.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }

import { pool } from "../../../../lip/db";

// export async function PUT(req) {
//   try {
//     const body = await req.json();
//     const { id, name, email } = body;

//     if (!id || !name || !email) {
//       return Response.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // Execute the UPDATE query using pool
//     const [result] = await pool.execute(
//       "UPDATE users SET name = ?, email = ? WHERE id = ?",
//       [name, email, id]
//     );

//     // Ensure the response is correct
//     if (result.affectedRows === 0) {
//       return Response.json(
//         { error: "User not found or not updated" },
//         { status: 404 }
//       );
//     }

//     return Response.json(
//       { message: "User updated successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Update error:", error);
//     return Response.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name } = body; // Only expecting `id` and `name`

    if (!id || !name) {
      return Response.json(
        { error: "User ID and Name are required" },
        { status: 400 }
      );
    }

    // Execute the UPDATE query using pool to update only the name
    const [result] = await pool.execute(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, id]
    );

    // Check if any rows were affected (meaning the user was updated)
    if (result.affectedRows === 0) {
      return Response.json(
        { error: "User not found or not updated" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "User name updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

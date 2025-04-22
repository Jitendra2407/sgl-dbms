// "use client";
// import { useState } from "react";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       body: JSON.stringify(form),
//     });
//     const data = await res.json();
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//       window.location.href = "/profile";
//     } else {
//       alert(data.error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 p-6 bg-white shadow rounded w-80"
//       >
//         <h2 className="text-xl font-semibold">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           className="border p-2 w-full"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           className="border p-2 w-full"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json", // Ensure JSON content type
      },
    });
    const data = await res.json();

    // Check if token exists in the response
    if (data.token) {
      localStorage.setItem("token", data.token); // Store the token in localStorage
      window.location.href = "/profile"; // Redirect to profile page
    } else {
      alert(data.error || "An error occurred"); // Show error if no token
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-white shadow rounded w-80"
      >
        <h2 className="text-xl font-semibold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

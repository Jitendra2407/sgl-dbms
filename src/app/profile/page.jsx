"use client";
import { useState, useEffect } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // const updateProfile = async () => {
  //   const res = await fetch("/api/user/update", {
  //     method: "PUT",
  //     headers: { Authorization: `Bearer ${token}` },
  //     body: JSON.stringify({ name }),
  //   });
  //   const data = await res.json();
  //   alert(data.message);
  // };

  // const updateProfile = async () => {
  //   const res = await fetch("/api/user/update", {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email: "user@example.com" }), // Make sure you're passing the email too
  //   });
  //   const data = await res.json();

  //   // Check if there's a message or error to show
  //   if (data.message) {
  //     alert(data.message);
  //   } else {
  //     alert(data.error || "An unexpected error occurred");
  //   }
  // };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");

    // Decode the token to get the user ID
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding token
    const userId = decodedToken?.id; // Assuming the token has an 'id' field

    if (!userId) {
      alert("User ID not found.");
      return;
    }

    // Only send the name and user ID for updating
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, name }), // Send only the name and user ID
    });

    const data = await res.json();

    // Handle the response
    if (data.message) {
      alert(data.message); // Show success message
    } else {
      alert(data.error || "An unexpected error occurred");
    }
  };

  const deleteProfile = async () => {
    if (!confirm("Are you sure?")) return;

    // Extract userId from the token
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found.");
      return;
    }

    // Decode the token (you may need a library like jwt-decode to extract data)
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Basic decoding without a library
    const userId = decodedToken?.id; // Assuming the token has an 'id' field

    if (!userId) {
      alert("User ID not found.");
      return;
    }

    const res = await fetch("/api/user/delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }), // Send the correct userId
    });

    const data = await res.json();

    if (data.message) {
      alert(data.message);
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      alert(data.error || "An unexpected error occurred");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-semibold">Profile Page</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-64"
        placeholder="Update name"
      />
      <button
        onClick={updateProfile}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
      <button
        onClick={deleteProfile}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete Account
      </button>
    </div>
  );
}

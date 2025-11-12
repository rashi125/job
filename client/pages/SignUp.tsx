// client/pages/Signup.tsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/components/firebaseConfig";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Set display name
      await updateProfile(user, { displayName: name });

      console.log("User signed up:", user);

      // ✅ Navigate to home after signup
      navigate("/");
    } catch (error: any) {
      console.error("Signup failed:", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-slate-600">
        <form
          onSubmit={handleSignup}
          className="bg-slate-400 p-8 rounded-2xl shadow-lg w-80"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Sign Up
          </h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <p className="mt-3 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right section with image */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://th.bing.com/th/id/OIP.d6cKfIeM0W58K-2QQJHo5QHaEK?w=197&h=150&c=6&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1')" }}
      >
        <div className="flex items-center justify-center h-full bg-black/50">
          <h1 className="text-3xl md:text-4xl text-white font-bold text-center px-6">
            Welcome! Start your journey 🚀
          </h1>
        </div>
      </div>
    </div>
  );
}

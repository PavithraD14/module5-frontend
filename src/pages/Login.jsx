import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/apiInstance";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
    const loginData = {
  email,
  password,
};

const response = await api.post("/auth/login", loginData);

     if (response.data) {
        
        localStorage.setItem("token", response.data.token);
        
        alert("Login successful!");
        console.log("Response Data:", response.data);
        navigate("/admin"); 
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          Ecommerce Login
        </h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-md p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-md p-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
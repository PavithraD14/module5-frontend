import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/apiInstance";

function Register() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  
      await api.post("/auth/register", registerData);
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          Ecommerce Register
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  username: e.target.value,
                })
              }
              className="w-full border rounded-md p-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
              className="w-full border rounded-md p-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                })
              }
              className="w-full border rounded-md p-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Role Dropdown Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Register As</label>
            <select
              value={registerData.role}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  role: e.target.value,
                })
              }
              className="w-full border rounded-md p-3 bg-white outline-none focus:border-blue-500"
            >
              <option value="user">Customer / User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-medium"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
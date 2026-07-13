import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import AdminProducts from "./pages/AdminProducts";
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

      
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminProducts />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
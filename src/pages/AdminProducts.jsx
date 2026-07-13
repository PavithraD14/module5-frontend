import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState(""); 

  const [editId, setEditId] = useState(null); 

  const BASE_URL = "http://localhost:8081/products";
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
//1.READ
  const fetchProducts = async () => {
    try {
      const response = await axios.get(BASE_URL, config);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. CREATE & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = { 
      title, 
      category, 
      price: Number(price), 
      stock: Number(stock),
      description 
    };

    try {
      if (editId) {
        // UPDATE (PUT)
        await axios.put(`${BASE_URL}/${editId}`, productData, config);
        alert("Product updated successfully!");
        setEditId(null);
      } else {
        // CREATE 
        await axios.post(`${BASE_URL}/create`, productData, config);
        alert("Product added successfully!");
      }
      
      
      setTitle("");
      setCategory("");
      setPrice("");
      setStock("");
      setDescription("");
      fetchProducts(); 
    } catch (error) {
      console.error("Error saving product:", error);
      alert(`Error: ${error.response?.data?.message || "Failed to submit items"}`);
    }
  };


  const handleEdit = (product) => {
    setEditId(product._id || product.id);
    setTitle(product.title || product.name); 
    setCategory(product.category);
    setPrice(product.price);
    setStock(product.stock);
    setDescription(product.description || "");
  };

const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:8081/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(products.filter((p) => p._id !== id));

    setTitle("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription("");

    alert("Product deleted successfully!");
  } catch (error) {
    console.error("Delete Error:", error.response?.data || error.message);
  }
};
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">E-commerce Product CRUD</h1>

      {/* Form Panel Container */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-2 gap-4">
        <h2 className="text-xl font-semibold col-span-2">{editId ? "✏️ Edit Product Details" : "➕ Add New Catalog Product"}</h2>
        
        <input type="text" placeholder="Product Title (e.g., Laptop)" value={title} onChange={(e) => setTitle(e.target.value)} required className="border p-2 rounded" />
        <input type="text" placeholder="Category (e.g., Electronics)" value={category} onChange={(e) => setCategory(e.target.value)} required className="border p-2 rounded" />
        <input type="number" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} required className="border p-2 rounded" />
        <input type="number" placeholder="Stock Units" value={stock} onChange={(e) => setStock(e.target.value)} required className="border p-2 rounded" />
        <input type="text" placeholder="Description (Optional)" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded col-span-2" />
        
        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
          {editId ? "Apply Update" : "Add to Live Storefront"}
        </button>
      </form>

      {/* Admin Inventory Table Panel Layout */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold">Product Title</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Inventory Stock</th>
              <th className="p-4 font-semibold text-center">Controls</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id || product.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{product.title}</td>
                <td className="p-4 text-gray-600">{product.category}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">{product.stock} units</td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => handleEdit(product)} type="button" className="bg-amber-500 text-white px-3 py-1 rounded text-sm hover:bg-amber-600">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product._id || product.id)} type="button" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center p-6 text-gray-500">No active storefront products found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
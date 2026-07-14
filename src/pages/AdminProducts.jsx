import React, { useState, useEffect } from "react";
import api from "../api/apiInstance";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE PRODUCT
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        title: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE PRODUCT
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/${editId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEditId(null);

      setFormData({
        title: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE PRODUCT
  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT PRODUCT
  const handleEditProduct = (product) => {
    setEditId(product._id);

    setFormData({
  title: product.title,
  category: product.category,
  price: product.price,
  stock: product.stock,
  description: product.description,
});
  };

    return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {editId ? "Update Product" : "Add Product"}
          </h2>

          <form
            onSubmit={editId ? handleUpdateProduct : handleCreateProduct}
            className="space-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              {editId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>

        {/* PRODUCT LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <h3 className="text-xl font-bold mb-2">
                  {product.title}
                </h3>

                <p className="text-gray-600 mb-2">
                  <strong>Category:</strong> {product.category}
                </p>

                <p className="text-gray-600 mb-2">
                  <strong>Price:</strong> ₹{product.price}
                </p>

                <p className="text-gray-600 mb-2">
                  <strong>Stock:</strong> {product.stock}
                </p>

                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 bg-yellow-400 text-black py-2 rounded-lg font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
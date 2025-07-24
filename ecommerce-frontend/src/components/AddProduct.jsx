import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        productAvailable: false,
        stockQuantity: "",
        releaseDate: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const categories = ["Electronics", "Clothing", "Home", "Sports", "Beauty"];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (productData.stockQuantity < 0) {
            setToast({ show: true, message: "Stock quantity cannot be negative.", type: "error" });
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
        if (imageFile) formData.append("imageFile", imageFile);

        try {
            // Send to remote API
            const response = await axios.post(
                `https://ecommerce-service-jscn.onrender.com/api/products`,  //https://ecommerce-service-jscn.onrender.com/api/products
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            // Also send to local API (ignore response)
            // await axios.post(
            //     ``,
            //     formData,
            //     { headers: { "Content-Type": "multipart/form-data" } }
            // );
            if (response.status === 201) {
                setToast({ show: true, message: "Product added successfully!", type: "success" });
                setProductData({
                    name: "",
                    brand: "",
                    description: "",
                    price: "",
                    category: "",
                    productAvailable: false,
                    stockQuantity: "",
                    releaseDate: "",
                });
                setImageFile(null);
            }
        } catch (error) {
            setToast({ show: true, message: "Error adding product.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Add New Product</h2>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="bg-white shadow-lg rounded-xl p-8 space-y-6"
            >
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Product name"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={productData.brand}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Brand"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Describe the product"
                        rows={3}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleInputChange}
                            required
                            min="0"
                            className="input"
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Stock Quantity</label>
                        <input
                            type="number"
                            name="stockQuantity"
                            value={productData.stockQuantity}
                            onChange={handleInputChange}
                            required
                            min="0"
                            className="input"
                            placeholder="0"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Category</label>
                    <select
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        required
                        className="input"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category, idx) => (
                            <option key={idx} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="productAvailable"
                        checked={productData.productAvailable}
                        onChange={handleInputChange}
                        className="accent-blue-600"
                        id="productAvailable"
                    />
                    <label htmlFor="productAvailable" className="text-gray-700 font-semibold">
                        Available
                    </label>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Release Date</label>
                    <input
                        type="date"
                        name="releaseDate"
                        value={productData.releaseDate}
                        onChange={handleInputChange}
                        required
                        className="input"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Product Image</label>
                    <input
                        type="file"
                        name="imageFile"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="input"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Adding...
                        </span>
                    ) : (
                        "Add Product"
                    )}
                </button>
            </form>
            {toast.show && (
                <div className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg z-50 text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {toast.message}
                    <button className="ml-4 font-bold" onClick={() => setToast({ ...toast, show: false })}>×</button>
                </div>
            )}
            {/* Tailwind input style */}
            <style>{`
                .input {
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    outline: none;
                    transition: border 0.2s;
                    font-size: 1rem;
                    background: #f9fafb;
                }
                .input:focus {
                    border-color: #2563eb;
                    background: #fff;
                }
            `}</style>
        </div>
    );
};

export default AddProduct;
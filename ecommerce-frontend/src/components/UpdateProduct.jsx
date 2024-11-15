import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: "",
        brand: "",
        description: "",
        price: 0,
        category: "",
        productAvailable: false,
        stockQuantity: 0,
        releaseDate: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [existingImage, setExistingImage] = useState("");
    const categories = ["Electronics", "Clothing", "Home", "Sports", "Beauty"]; // Add your categories here

    useEffect(() => {
        axios.get(`https://ecommerce-service-jscn.onrender.com/api/products/${id}`)
            .then(response => {
                setProductData(response.data);
                setExistingImage(`https://ecommerce-service-jscn.onrender.com/api/products/${id}/image`);
            })
            .catch(error => console.error('Error fetching product data:', error));
    }, [id]);

    const handleInputChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
        
        if (imageFile) {
            formData.append("imageFile", imageFile);
        }

        try {
            const response = await axios.put(`https://ecommerce-service-jscn.onrender.com/api/products/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                alert("Product updated successfully!");
                navigate(`/products/${id}`);
            }
        } catch (error) {
            console.error("There was an error updating the product!", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Existing Product Image</label>
                    <img src={existingImage} alt="Existing Product" className="w-full h-48 object-cover rounded mb-2" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" name="name" value={productData.name} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                    <input type="text" name="brand" value={productData.brand} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea name="description" value={productData.description} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input type="number" name="price" value={productData.price} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select name="category" value={productData.category} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Product Available</label>
                    <input type="checkbox" name="productAvailable" checked={productData.productAvailable} onChange={(e) => setProductData({ ...productData, productAvailable: e.target.checked })} className="mr-2 leading-tight" />
                    <span className="text-sm">Available</span>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Stock Quantity</label>
                    <input type="number" name="stockQuantity" value={productData.stockQuantity} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Release Date</label>
                    <input type="date" name="releaseDate" value={productData.releaseDate} onChange={handleInputChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Upload New Image (Optional)</label>
                    <input type="file" name="imageFile" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;

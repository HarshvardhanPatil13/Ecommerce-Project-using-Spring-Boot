import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = ({ setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details by ID
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product data:', error));
  }, [id]);

  const handleAddToCart = () => {
    setCart(prevCart => [...prevCart, product]);
    alert('Product added to cart!');
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      alert('Product deleted!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = () => {
    navigate(`/update-product/${product.id}`);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex space-x-8 p-6">
      {/* Left side - Product image */}
      <div className="w-1/2">
        <img
          src={`http://localhost:8080/api/products/${product.id}/image`}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      {/* Right side - Product details */}
      <div className="w-1/2">
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <p className="text-lg"><strong>Brand:</strong> {product.brand}</p>
        <p className="text-lg"><strong>Category:</strong> {product.category}</p>
        <p className="text-lg"><strong>Description:</strong> {product.description}</p>
        <p className="text-lg"><strong>Price:</strong> ${product.price}</p>
        <p className={`text-lg ${product.productAvailable ? 'text-green-600' : 'text-red-500'}`}>
          {product.productAvailable ? 'In Stock' : 'Out of Stock'}
        </p>

        {/* Add to Cart Button */}
        <button onClick={handleAddToCart} className="bg-green-500 text-white py-2 px-4 rounded mt-4">
          Add to Cart
        </button>

        {/* Update Button */}
        <button onClick={handleUpdate} className="bg-blue-500 text-white py-2 px-4 rounded mt-4 ml-2">
          Update Product
        </button>

        {/* Delete Button */}
        <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded mt-4 ml-2">
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import UpdateProduct from './components/UpdateProduct';

const App = () => {
  const [products, setProducts] = useState([]); // To store all products
  //const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [cart, setCart] = useState([]);  // No localStorage reference

  const [input, setInput] = useState(""); // Input for the search bar
  const [searchResults, setSearchResults] = useState([]); // To store search results
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [noResults, setNoResults] = useState(false); // To indicate if no results were found

  // Fetch all products initially
  useEffect(() => {
    fetch('https://ecommerce-service-jscn.onrender.com/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to handle input change and search products
  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true); // Show search results
      try {
        const response = await axios.get(
          `https://ecommerce-service-jscn.onrender.com/api/products/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
        console.log(response.data);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false); // Hide search results
      setSearchResults([]);
      setNoResults(false);
    }
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="flex justify-between items-center py-4 bg-gray-800 text-white">
          <h1 className="text-2xl font-bold">E-Commerce</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              className="rounded py-2 px-3 mr-4 text-black"
            />
            <Link to="/add-product" className="bg-blue-500 text-white py-2 px-4 rounded">Add Product</Link>
            <Link to="/cart" className="ml-4 bg-green-500 text-white py-2 px-4 rounded">Cart ({cart.length})</Link>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={(
              <div>
                <h2 className="text-2xl font-bold mb-4">Product List</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {/* Show search results if search is active, else show all products */}
                  {(showSearchResults ? searchResults : products).map(product => (
                    <div key={product.id} className="border rounded-lg p-4 shadow-md">
                      <img src={`https://ecommerce-service-jscn.onrender.com/api/products/${product.id}/image`} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
                      <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
                      <p className="text-gray-700 mt-1">${product.price}</p>
                      <Link to={`/products/${product.id}`} className="text-blue-500 underline">View Details</Link>
                    </div>
                  ))}
                  {/* Show a message if no search results found */}
                  {noResults && <p>No products found.</p>}
                </div>
              </div>
            )}
          />
          <Route path="/products/:id" element={<ProductDetails setCart={setCart} />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

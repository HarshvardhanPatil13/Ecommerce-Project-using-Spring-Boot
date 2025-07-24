import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import UpdateProduct from './components/UpdateProduct';
import logo from './free.png';

const ProductSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-4 animate-pulse">
    <div className="bg-gray-200 h-48 w-full rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
  </div>
);

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ecommerce-service-jscn.onrender.com/api/products')  //https://ecommerce-service-jscn.onrender.com/
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      setLoading(true);
      try {
        const response = await axios.get(
          `https://ecommerce-service-jscn.onrender.com/api/products/search?keyword=${value}`  //https://ecommerce-service-jscn.onrender.com/
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-pink-50">
        {/* Header */}
        <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur shadow-lg flex justify-between items-center px-8 py-4">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-14 drop-shadow-lg" />
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-fuchsia-600 to-pink-500 tracking-tight animate-pulse">
              ShopNexus
            </span>
            <span className="hidden md:inline text-lg font-medium text-gray-500 ml-2">Your Modern E-Commerce Platform</span>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Search products..."
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              className="rounded-lg py-2 px-3 border border-gray-300 focus:border-pink-400 focus:outline-none text-gray-800 bg-gray-100 transition w-48 shadow-sm"
            />
            <Link to="/add-product" className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 text-white py-2 px-4 rounded-lg font-semibold shadow transition">
              + Add Product
            </Link>
            <Link to="/cart" className="relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white py-2 px-4 rounded-lg font-semibold shadow transition">
              <span className="mr-2">Cart</span>
              <span className="absolute -top-2 -right-2 bg-white text-green-700 rounded-full px-2 py-0.5 text-xs font-bold border border-green-400 shadow">
                {cart.length}
              </span>
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-10 flex-1">
          <Routes>
            <Route
              path="/"
              element={(
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h2 className="text-4xl font-extrabold mb-4 md:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-fuchsia-600 to-pink-500 drop-shadow">
                      Discover Trending Products
                    </h2>
                    <span className="text-gray-400 text-sm">Powered by ShopNexus</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {loading
                      ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                      : (showSearchResults ? searchResults : products).map(product => (
                        <div
                          key={product.id}
                          className="bg-white border border-pink-100 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-200 flex flex-col group relative overflow-hidden"
                        >
                          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-100 via-white to-pink-100">
                            <img
                              src={`https://ecommerce-service-jscn.onrender.com/api/products/${product.id}/image`}
                              alt={product.name}
                              className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
                            />
                            <span className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow">
                              {product.brand}
                            </span>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold mb-1 text-gray-800 group-hover:text-pink-600 transition">{product.name}</h3>
                            <p className="text-gray-500 mb-2">{product.description?.slice(0, 40)}...</p>
                            <p className="text-pink-600 font-extrabold text-lg mb-2">${product.price}</p>
                            <Link
                              to={`/products/${product.id}`}
                              className="mt-auto inline-block bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-pink-500 hover:to-blue-500 transition"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))
                    }
                    {noResults && !loading && (
                      <p className="col-span-full text-center text-gray-500 text-lg">No products found.</p>
                    )}
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

        {/* Footer */}
        <footer className="mt-16 py-6 bg-gradient-to-r from-blue-700 via-fuchsia-600 to-pink-500 text-white text-center rounded-t-2xl shadow-inner">
          <span className="font-semibold">ShopNexus</span> &copy; {new Date().getFullYear()}  <span className="animate-pulse">  </span>
        </footer>
      </div>
    </Router>
  );
};

export default App;
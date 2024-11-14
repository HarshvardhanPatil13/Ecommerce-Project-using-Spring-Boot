import React from 'react';

const Cart = ({ cart }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="border-b py-2">
              <div className="flex justify-between">
                <div>
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </div>
                <img
                  src={`http://localhost:8080/api/products/${item.id}/image`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

import React from "react";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-600">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-md text-gray-500">Looks like you haven't added anything yet.</p>
    </div>
  );
};

export default EmptyCart;

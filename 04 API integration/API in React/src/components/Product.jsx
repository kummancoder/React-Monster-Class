import React, { useEffect, useState } from "react";
import axios from "../utils/axios"

const Product = () => {
  const [products, setProducts] = useState([]);
  const showproduct = () => {
    axios.get("products").then((product) => {
      setProducts(product.data);
    });
  };

  const updaetproduct = () => {
    const api = "products";
    axios
      .post(api, {
        id: 0,
        title: "string",
        price: 0.1,
        description: "string",
        category: "string",
        image: "http://example.com",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error("Error updating product:", err);
      });
  };

  useEffect(() => {
    showproduct();
  },[]);
  return (
    <div>
      {/* <button
        style={{
          padding: "1rem",
          backgroundColor: "blue",
          color: "white",
          margin: "1rem",
        }}
        onClick={showproduct}
      >
        Show
      </button> */}
      {products.length > 0 ? (
        products.map((product) => {
          return (
            <div key={product.id}>
              <h1>{product.title}</h1>
            </div>
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}

      <button
        style={{
          padding: "1rem",
          backgroundColor: "blue",
          color: "white",
          margin: "1rem",
        }}
        onClick={updaetproduct}
      >
        Update
      </button>
    </div>
  );
};

export default Product;

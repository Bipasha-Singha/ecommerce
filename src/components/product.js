import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const addToCart = (product) => {
    const productIndex = products.findIndex(p => p.id === product.id);
    if (productIndex !== -1 && products[productIndex].quantity > 0) {
      const newProducts = [...products];
      newProducts[productIndex].quantity--;
      setProducts(newProducts);
    }
  };
  
  return (
    <div className="product-container">
      <h1>Products</h1>
      <div className="products">
        {products.map((product, index) => {
          const quantityInCart = products.filter(p => p.id === product.id && p.quantity < product.quantity).length;
          return (
            <div className="product" key={index}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              {product.quantity - quantityInCart > 0 ?
                <button onClick={() => addToCart(product)}>Add to cart</button> :
                <p>Out of stock</p>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;

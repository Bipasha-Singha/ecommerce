import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';
import { Radio } from 'antd';
import { Prices } from './Prices';
import { Link, useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState({});
  const [radio, setRadio] = useState([]);
  const [radioValue, setRadioValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //get all categories
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //get all products
  const selectedCategories = Object.keys(checked).filter(
    (categoryId) => checked[categoryId]
  );
  
  useEffect(() => {
    setIsLoading(true);
    let url = 'http://localhost:5000/api/v1/products';
    if (selectedCategories.length > 0) {
      url = `http://localhost:5000/api/v1/categories/${selectedCategories.join()}/products`;
    }
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedCategories]);

  //filter products based on selected price range
  useEffect(() => {
    if (radioValue) {
      const filtered = products.filter(product => {
        const min = radioValue[0];
        const max = radioValue[1];
        return product.price >= min && product.price <= max;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [radioValue, products]);

  const handleFilter = (categoryId, isChecked) => {
    setChecked({
      ...checked,
      [categoryId]: isChecked,
    });
    if (isChecked) {
      setRadioValue('');
    }
  };
  return (
    <div className="product-container">
      <div className="col-md-3 filters">
        <h4 className="text-center">Filter By Category</h4>
        <div className="d-flex flex-column">
          {categories?.map((category) => (
            <div key={category._id}>
              <input
                type="checkbox"
                onChange={(e) =>
                  handleFilter(category._id, e.target.checked)
                }
                checked={checked[category._id]}
              />
              <label>{category.name}</label>
            </div>
          ))}
        </div>
        <h4 className="text-center mt-4">Filter By Price</h4>
        <div className="d-flex flex-column">
        <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
          {Prices?.map((price) => (
            <div key={price._id}>
              <Radio value={price.array}>{price.name}</Radio>
            </div>
          ))}
          <div>
            <Radio value={''}>Clear Selection</Radio>
          </div>
        </Radio.Group>

        </div>

        <div>Selected categories: {JSON.stringify(selectedCategories)}</div>
      </div>

      <div className="main-content">
        <h1>Products</h1>
        <div className="products">
          {filteredProducts.map((product, index) => {
            const quantityInCart = products.filter(
              (p) => p._id === product._id && p.quantity < product.quantity
            ).length;
            return (
              <div className="product" key={index}>
                <img
                  className="img"
                  src={`http://localhost:5000/api/v1/products/${product._id}/image`}
                  alt={product.name}
                />
                <Link to={`/product/${product._id}`}>
                  <h6>{product.name}</h6>
                </Link>
                {/*<p>{product.description}</p>*/}
                <p>Price: &#x20b9;{product.price}</p>
                {product.quantity - quantityInCart > 0 ? (
                  <p>In stock</p>
                ) :
                (
                  <p>Out of stock</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;

import "./Products.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productFilter, setProductFilter] = useState({
    brand: "all",
    category: "all",
  });
  const [visibleProducts, setvisibleProducts] = useState([]);
  const [productCount, setProductCount] = useState(5);

  const getTotalProducts = () => {
    axios.get(`http://localhost:3000/products`).then((res) => {
      setAllProducts(res.data);
      setvisibleProducts(res.data);
    });
  };

  useEffect(() => {
    getTotalProducts();
    BrandDropdown();
  }, []);

  useEffect(() => {
    setvisibleProducts(
      allProducts.filter(
        (product) =>
          (productFilter.brand === "all" ||
            productFilter.brand === product.brand) &&
          (productFilter.category === "all" ||
            productFilter.category === product.category)
      )
    );
  }, [productFilter]);

  const mapProducts = () =>
    visibleProducts.slice(0, productCount).map((item) => (
      <div className="single-item" key={item.id}>
        <div className="left-col">
          <img alt={`img`} key={item.img} src={item.thumbnail} />
        </div>
        <div className="right-col">
          <ul>
            <li>{item.id}</li>
            <li>{item.title}</li>
            <li>{item.description}</li>
            <li>{item.price}</li>
            <li>{item.discountPercentage}</li>
            <li>{item.rating}</li>
            <li>{item.stock}</li>
            <li>{item.brand}</li>
          </ul>
        </div>
      </div>
    ));

  const BrandDropdown = () => {
    return (
      <div className="filter-section">
        <div className="brand-dropdown">
          <div className="control">
            <div className="selected-brand">Select brand...</div>
          </div>
          <div className="brand-options">
            <select
              onChange={(e) =>
                setProductFilter({
                  brand: e.target.value,
                  category: productFilter.category,
                })
              }
            >
              <option value={"all"}>All Brands</option>
              {[...new Set(allProducts.map((item) => item.brand))].map(
                (brand) => (
                  <option value={brand} className="brand-option" key={brand}>
                    {brand}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="category-dropdown">
          <div className="control">
            <div className="selected-category">Select category...</div>
          </div>
          <div className="category-options">
            <select
              onChange={(e) =>
                setProductFilter({
                  category: e.target.value,
                  brand: productFilter.brand,
                })
              }
            >
              <option value={"all"}>All Categories</option>
              {[...new Set(allProducts.map((item) => item.category))].map(
                (category) => (
                  <option
                    value={category}
                    className="category-option"
                    key={category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {BrandDropdown()}
      <div className="products-section">{mapProducts()}</div>
      <button onClick={() => setProductCount(productCount + 5)}>
        load more
      </button>
    </div>
  );
};

export default Products;

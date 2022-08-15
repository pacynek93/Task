import "./Products.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 0,
    brandName: [],
  });
  const [productFilter, setProductFilter] = useState({
    brand: "all",
    category: "all",
  });
  //const [visibleProducts, setvisibleProducts] = useState(ture);

  const getTotalProducts = () => {
    axios.get(`http://localhost:3000/products`).then((res) => {
      setAllProducts(res.data);
      setPagination((prevState) => {
        return {
          ...prevState,
          total: res.data.length,
        };
      });
    });
  };

  const getProducts = () => {
    axios
      .get(
        `http://localhost:3000/products?_start=0&_end=${pagination.current + 5}`
      )
      .then((res) => {
        setProducts(res.data);
        setPagination((prevState) => {
          return {
            ...prevState,
            current: prevState.current + 5,
          };
        });
      });
  };

  useEffect(() => {
    getTotalProducts();
    getProducts();
    BrandDropdown();
  }, []);

  useEffect(() => {
    console.log(productFilter);
    setProducts(
      products.filter(
        (product) =>
          (productFilter.brand === "all" ||
            productFilter.brand === product.brand) &&
          (productFilter.category === "all" ||
            productFilter.category === product.category)
      )
    );
  }, [productFilter]);

  const mapProducts = () =>
    products.map((item) => (
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
      <>
        <div className="brand-dropdown">
          <div className="control">
            <div className="selected-brand">Select brand...</div>
            <div className="arrow" />
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
            <div className="arrow" />
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
      </>
    );
  };

  return (
    <div>
      {BrandDropdown()}
      <div className="products-section">{mapProducts()}</div>
      {pagination.total - 5 >= pagination.current ? (
        <button onClick={getProducts}>load more</button>
      ) : null}
    </div>
  );
};

export default Products;

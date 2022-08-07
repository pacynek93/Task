import "./Products.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [userData, setUserData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState("visible");

  const checkIfLast = () => {
    let lastNumber = userData[Object.keys(userData).pop()];
    if (counter > lastNumber.id) {
      setIsVisible("hidden");
    }
  };

  const getUserData = () => {
    axios
      .get(`http://localhost:3000/products?_start=0&_end=${counter + 5}`)
      .then((res) => {
        setUserData(res.data);
        setCounter(counter + 5);
        checkIfLast();
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const mapUserData = () =>
    userData.map((item) => (
      <div className="singleItem" key={item.id}>
        <div className="leftCol">
          <img alt={`img`} key={item.id} src={item.thumbnail} />
        </div>
        <div className="rightCol">
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

  return (
    <>
      {mapUserData()}
      <button onClick={getUserData} style={{ visibility: isVisible }}>
        load more
      </button>
    </>
  );
};

export default Products;

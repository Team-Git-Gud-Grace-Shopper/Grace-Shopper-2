import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCart } from "../axios-services";

const Cart = () => {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    getCart()
    .then((result) => setCartList(result.data))
  }, [])

console.log(cartList)
  return (
    <Fragment>
      <h3>This is the cart page, theres nothing to see here... yet</h3>
    </Fragment>
  );
};

export default Cart;

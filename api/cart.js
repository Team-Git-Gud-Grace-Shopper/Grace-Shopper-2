const { request } = require('express')
const cartsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "nftSecret" } = process.env;
const { User } = require("../db");


cartsRouter.use((req, res, next) => {
  console.log('You have hit cartsRouter');
  next(); 
});

// cartsRouter.get("/cart", async (req, res, next) => {
//   try {
//     const cart = await Products.getCart();

//     res.send(cart);

//     console.log("these are the products:", products)
//   } catch ({ name, message }) {
//     console.error(error);
//     next({ name, message });
//   }
// });



cartsRouter.get("/items", (req, res) => {
  const { cart } = req.session;
  if (!cart) {
      res.send("No items to display")
  } else {
      res.send(cart)
  }
})

cartsRouter.post("/items", (req, res, next) => {
  const { item, quantity } = req.body; 
  console.log('This is item + quantity: ', item, quantity)
  const cartItem = { item, quantity };
  const { cart } = req.session
  // console.log('cartItem: ', cartItem)
  if (cart) {
      const { items } = cart;
      items.push(cartItem)
  } else {
      req.session.cart = {
          items: [cartItem]
      }
      console.log("this is cart", req.session.cart)
  };

  res.sendStatus(200); 
})

module.exports = cartsRouter;

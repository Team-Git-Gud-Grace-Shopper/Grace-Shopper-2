const { request } = require('express')
const cartsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "nftSecret" } = process.env;
const { User } = require("../db");


cartsRouter.use((req, res, next) => {
  console.log('You have hit cartsRouter');
  next(); 
});


cartsRouter.get("/items", (req, res) => {
  const { cart } = req.session;
  if (!cart) {
      res.send("No items to display")
  } else {
      res.send(cart)
  }
})

cartsRouter.post("/items", (req, res, next) => {
  if (req.user) {

  }
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

cartsRouter.post("items")

module.exports = cartsRouter;


//authroziation middleware, if logged in then do more stuff
//if not then keep going with what is there
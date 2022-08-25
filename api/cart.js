const { request } = require('express')
const cartsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "nftSecret" } = process.env;
const { Cart } = require("../db");
const {getCart} = require("../db/models/cart");


cartsRouter.use((req, res, next) => {
  console.log('You have hit cartsRouter');
  next(); 
});


cartsRouter.post('/', async (req, res) => {
  const {userId} = req.body;
  try {
    const carts = await Cart.getCart(userId);
    res.send(carts);
  } catch (error) {
    throw error;
  }
})

cartsRouter.post("/add", async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const cartItem = await Cart.createCartItem(productId, userId);
    res.send(cartItem);
  } catch (error){
    throw error;
  }
})

cartsRouter.post("/remove", async (req, res) => {
  const {productId, userId} = req.body;
  try {
    const cartItem = await Cart.removeCartItem(productId, userId);
    res.send(cartItem);
  } catch (error) {
    throw error;
  }
})

cartsRouter.post("/empty", async (req, res) => {
  try {
    const emptyCart = await Cart.emptyCart();
    res.send(emptyCart);
  } catch (error){
    throw error;
  }
})

cartsRouter.post("/items", (req, res, next) => {
  const { item, quantity } = req.body; 
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
  };

  res.sendStatus(200); 
})

module.exports = cartsRouter;

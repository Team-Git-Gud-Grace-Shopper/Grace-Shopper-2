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

cartsRouter.post('/', async (req, res) => {
  console.log("hitting the api portion")
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

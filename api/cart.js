const apiRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "nftSecret" } = process.env;
const { User } = require("../db");
const { getAllUsers } = require("../db/models/users");

apiRouter.get("/cart", async (req, res, next) => {
  try {
    const cart = await Products.getCart();

    res.send(cart);

    // console.log("these are the products:", products)
  } catch ({ name, message }) {
    console.error(error);
    next({ name, message });
  }
});

module.exports = apiRouter;

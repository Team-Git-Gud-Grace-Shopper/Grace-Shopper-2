const apiRouter = require('express').Router();
const { User, Products } = require('../db')

apiRouter.get('/', async (req, res, next) =>{
    try {
        const products = await Products.getAllProducts();

        res.send(products);
        console.log("these are the products:", products)
    } catch ({name, message}) {
      console.error(error)
      next ({name, message})  
    }
})

module.exports = apiRouter;
const apiRouter = require('express').Router();
const { Products } = require('../db')

// GET all products

apiRouter.get('/', async (req, res, next) =>{
    try {
        const products = await Products.getAllProducts();

        res.send(products);

        // console.log("these are the products:", products)
        
    } catch ({name, message}) {
      console.error(error)
      next ({name, message})  
    }
})


apiRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Products.getProductById(id);
    
    res.send(product)
    console.log("this is single product", product)
    
  } catch (error) {
    throw (error)
  }
})

module.exports = apiRouter;




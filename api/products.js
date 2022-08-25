const apiRouter = require("express").Router();
const { Products } = require("../db");

apiRouter.get("/", async (req, res, next) => {
  try {
    const products = await Products.getAllProducts();

    res.send(products);
  } catch ({ name, message }) {
    console.error(error);
    next({ name, message });
  }
});

apiRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Products.getProductById(id);

    res.send(product);
  } catch (error) {
    throw error;
  }
});

apiRouter.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const productToDelete = await Products.deleteProduct(id);
    res.send(productToDelete);
  } catch (error) {
    throw error;
  }
});

apiRouter.post("/create", async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const productToCreate = await Products.createProduct({
      title,
      description,
      price,
      image,
    });
    res.send(productToCreate);
  } catch (error) {
    throw error;
  }
});

apiRouter.patch("/update", async (req, res) => {
  console.log("anything?");
  try {
    const { id, title, description, price, image } = req.body;
    console.log("api product id: ", req.body.id);
    const productToUpdate = await Products.updateProduct(id, {
      title: title,
      description: description,
      price: price,
      image: image,
    });
    res.send(productToUpdate);
  } catch (error) {
    throw error;
  }
});

module.exports = apiRouter;

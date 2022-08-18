const apiRouter = require("express").Router();

apiRouter.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

const userRouter = require("./users");
apiRouter.use("/users", userRouter);

const cartRouter = require("./cart");
apiRouter.use("/cart", cartRouter);

module.exports = apiRouter;

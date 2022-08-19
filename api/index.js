const apiRouter = require("express").Router();
const session = require('express-session');

apiRouter.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

apiRouter.use(
  session({
      secret: "shhh its a secret",
      resave: false,
      saveUninitialized: false
  })
);

apiRouter.get("/", (req, res) => {
  console.log(req.session); 
  console.log('The actual session id: ', req.sessionID);
  req.session.viewCount += 1; 
  res.send(`View count at ${req.session.viewCount}`);
});

apiRouter.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
      console.log("Session has been destroyed.")
  })
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

const cartsRouter = require("./cart");
apiRouter.use("/cart", cartsRouter);

module.exports = apiRouter;

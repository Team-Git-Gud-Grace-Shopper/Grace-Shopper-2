const apiRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "nftSecret" } = process.env;
const { User } = require("../db");
const { getAllUsers } = require("../db/models/users");

apiRouter.get('/', async (req, res, next) =>{
  try {
      const users = await User.getAllUsers();

      res.send(users);

      
      
  } catch ({name, message}) {
    console.error(error)
    next ({name, message})  
  }
})

// POST /api/users/register


apiRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const _user = await User.getUserByUsername(username);

    if (_user) {
      res.status(401).send({
        error: "401",
        message: `User ${username} is already taken.`,
        name: "UserExisitsError",
      });
      next();
    } else if (password.length < 6) {
      res.status(401).send({
        error: "401",
        message: "Password Too Short!",
        name: "PasswordLengthError",
      });
      next();
    } else {
      const user = await User.createUser({ username, password, email });
      if (!user) {
        next({
          name: "UserCreationError",
          message: "There was a problem with registration. Please try again.",
        });
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "1w" }
        );
        res.send({ user, message: "Thank you for signing up!", token });

        console.log("this is token:", token);
      }
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = apiRouter;

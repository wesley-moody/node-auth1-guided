const bcrypt = require("bcryptjs");
const router = require("express").Router();

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const restricted = require("../auth/restricted-middleware.js");

router.use("/auth", authRouter);
router.use("/users", restricted, usersRouter);

router.get("/hash", (req, res) => {
  //  read the Authentication header
  const authentication = req.headers.authentication;
  //  hash the value from the header
  const hash = bcrypt.hashSync("authentication", 8);

  res.json({ originalValue: authentication, hashedValue: hash });
  //  $2a$13$KA9o2kFqF2NGLOtjLIVQ5u3lB8s1iA./B1kIeZorCnFqdB5Monlz.
});

router.get("/", (req, res) => {
  res.json({ api: "It's alive" });
});

module.exports = router;

const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/* **USER CREATE** */
router.post("/", function (req, res) {
  User.create({
    username: req.body.user.username,
    // email: req.body.user.email,
    passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 13),
  })
    .then(
      function createSuccess(user) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

        res.json({
          user: user,
          message: "User successfully created!",
          sessionToken: token,
        });
      }
      //res.send("This is our user/create endpoint!")
    )
    .catch((err) => res.status(500).json({ error: err.message }));
});

/* **USER SIGNIN** */
router.post("/login", function (req, res) {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(req.body.user.passwordhash, user.passwordhash, function (
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            }); //1. username, 2. encrypting password 3. expiration

            res.status(200).json({
              user: user,
              message: "User successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(502).json({ error: "Login Failed" });
          }
        });
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) res.status(400).json({ message: "user already exists" });
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err)
            return res.status(500).json({
              error: err
            });
          else {
            const user = new User({
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(200).json({ message: "created successfully" });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ message: "unable to create user" });
              });
          }
        });
      }
    })
    .catch(() => res.status(400).json({ message: "an error occured" }));
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(500).json({ message: "Authentication Failed!" });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err)
          return res.status(500).json({ message: "Authentication Failed!" });
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              id: user._id
            },
            "privateKey",
            { expiresIn: "1h" }
          );
          return res
            .status(200)
            .json({ 
                message: "Authentication Success", 
                token: token 
            });
        } else
          return res.status(500).json({ message: "Authentication Failed!" });
      });
    })
    .catch(error => {
      return res.status(400).json({ error: error });
    });
});

router.delete("/delete/:id", (req, res) => {
  User.remove({ _id: req.params.id })
    .exec()
    .then(res.status(200).json({ message: "deleted successfully" }))
    .catch(res.status(400).json({ message: "failed to delete" }));
});

module.exports = router;

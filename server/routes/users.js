const express = require("express");
const cors = require('cors');
const Users = require("../models/users");
// bcrypt is used for hashing passwords
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check_auth");
const { cloudinary } = require("../config/cloudinary");
const {
  loginValidator,
  registerValidator
} = require("../validators/validator");
require('dotenv').config();


// router instance for users
const router = express.Router();

router.post("/login", (req, res) => {
  const { errors, isValid } = loginValidator(req.body);
  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    Users.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        res.json({ message: "Email does not exist", success: false });
      } else {
        bcrypt.compare(req.body.password, user.password).then((success) => {
          if (!success) {
            res.json({ message: "Invalid password", success: false });
          } else {
            const payLoad = {
              id: user.id,
              name: user.firstName
            };
            jwt.sign(
              payLoad,
              process.env.APP_SECRET,
              { expiresIn: 2155926 },
              (err, token) => {
                res.json({
                  user,
                  token: "Bearer token: " + token,
                  success: true
                });
              }
            );
          }
        });
      }
    });
  }
});

router.post("/register", (req, res) => {
  // destructuring registerValidator return values
  const { errors, isValid } = registerValidator(req.body);
  if (!isValid) {
    // if not valid then return this as response
    res.json({ success: false, errors });
  } else {
    // User is valid, so create a new user using userSchema and save it to the database
    // destructuring req.body
    const { firstName, lastName, email, password } = req.body;
    const registerUser = new Users({
      firstName,
      lastName,
      email,
      password,
      createdAt: new Date()
    });
    // hashing the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(registerUser.password, salt, (hashErr, hash) => {
        if (err || hashErr) {
          res.json({ message: "Error occured hashing", success: false });
          return;
        }
        registerUser.password = hash;
        // saving to database
        registerUser
          .save()
          .then(() => {
            res.json({ message: "user created successfully", success: true });
          })
          .catch((er) => res.json({ message: er.message, success: false }));
      });
    });
  }
});

router.get("/:id", checkAuth, (req, res) => {
  // console.log(req.params.id);
  Users.findOne({ _id: req.params.id })
    .then((user) => {
      // console.log(user);
      res.json({ user, success: true });
    })
    .catch((er) => {
      res.json({ sucess: false, message: er.message });
    });
});

router.post("/upload-image", checkAuth, async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr);
    Users.findOne({ _id: req.body._id }).then((user) => {
      user.avatar = {
        url: uploadedResponse.url,
        publicId: uploadedResponse.public_id
      };
      user.save();
      if (user.images) {
        user.images.push({
          url: uploadedResponse.url,
          publicId: uploadedResponse.public_id
        });
      } else {
        user.images = [];
        user.images.push({
          url: uploadedResponse.url,
          publicId: uploadedResponse.public_id
        });
      }
      res.json({ success: true });
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Something went wrong, try again." });
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/user");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 3, async (err, hashed) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ email, pass: hashed, name, age });
        await user.save();
        res.send({"msg":"User has been registered"});
      }
    });
  } catch (error) {
    give.send(`Something went Wrong!\n${error.message}`)
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID:user._id }, "masai");
          res.send({ msg: "Login sucessful ", token: token });
        } else {
          res.send("Wrong credentials");
        }
      });
    } else {
      res.send("Something went Wrong!");
    }
  } catch (error) {
    give.send(`Something went Wrong!\n${error.message}`)
  }
});

module.exports = { userRouter };

const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);
    const { password, firstName, lastName, emailId } = req.body;
    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    //creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      password: passwordHash,
      emailId,
    });
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.passwordValidation(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      //add the token to cookie and send the response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successfull!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout seuccess");
});

module.exports = authRouter;

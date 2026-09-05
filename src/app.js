const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //sending a connection request
  const user = req.user;
  res.send(user.firstName + "sent connection request sent");
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("server is listening successfully");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });

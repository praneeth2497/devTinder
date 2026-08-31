const express=require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app= express();


app.post("/signup", async (req,res)=>{

//creating a new instance of the User model
const user = new User({
    firstName:"virat",
    lastName: "kohli",
    emailId:"virat@gmail.com",
    password:"virat@123",
});
try{
    await user.save();
res.send("user added successfully");
}catch(err){
    res.status(400).send("error saving the user"+ err.message);
}

});




connectDB().then(()=>{
    console.log("Database connected successfully");
app.listen(3000,()=>{
    console.log("server is listening successfully");
});
})
.catch((err)=>{
    console.log("Database cannot be connected");
});



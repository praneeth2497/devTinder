const express=require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app= express();

app.use(express.json());

app.post("/signup", async (req,res)=>{

//creating a new instance of the User model
const user = new User(req.body);
try{
    await user.save();
res.send("user added successfully");
}catch(err){
    res.status(400).send("error saving the user"+ err.message);
}

});

//to get the data of user by emalId
app.get("/user", async (req, res)=>{
const userEmail = req.body.emailId;
try{
const users = await User.find({emailId: userEmail});

if(users.length === 0){
    res.status(404).send("users not found");
}else{
res.send(users);
}
}catch(err){
    res.status(400).send("something went wrong");
}
})

//to get the data of all the users
app.get("/feed", async (req, res)=>{

try{
const users = await User.find({});
res.send(users);
}catch(err){
     res.status(400).send("something went wrong");
}
})

//delete the user
app.delete("/user", async (req, res)=>{
    const userId = req.body.userId;
    try{
const user = await User.findByIdAndDelete(userId);
res.send("user deleted successfully");
    }
    catch(err){
 res.status(400).send("something went wrong");
    }
});

//Update the user
app.patch("/user", async (req, res)=>{
const userId = req.body.userId;
const data =req.body;
try{
await User.findByIdAndUpdate({_id: userId},data);
res.send("user updated successfully");
}catch(err){
 res.status(400).send("something went wrong")
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



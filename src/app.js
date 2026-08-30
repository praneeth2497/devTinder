const express=require("express");
const app= express();

app.get("/user", (req, res, next) => {
    console.log("Handling the route user");
  //res.send("1st response");
  next();
},(req, res, next)=>{
     res.send("2nd response");
},(req, res)=>{
     res.send("3rd response");
},(req, res)=>{
     res.send("4th response");
},(req, res)=>{
     res.send("5th response");
});


app.listen(3000,()=>{
    console.log("server is listening successfully");
});
const express=require("express");
const app= express();

app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
  res.send({ firstName: "praneeth", lastName: "chandra" });
});


app.listen(3000,()=>{
    console.log("server is listening successfully");
});
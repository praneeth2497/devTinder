const express=require("express");
const app= express();

app.get("/user",(req, res)=>{
    res.send({firstName:"praneeth", lastName:"chandra"});
})

app.post("/user",(req, res)=>{
    console.log("data saved successfully to database")
    res.send({firstName:"praneeth", lastName:"chandra"});
})

app.delete("/user",(req, res)=>{
    res.send("deleted successfully");
})

// This will match all the HTTP method API calls to /test like get, post, put, delete etc
app.use("/test",(req, res)=>{
res.send("hello from server");
})

app.listen(3000,()=>{
    console.log("server is listening successfully");
});
const mongoose = require("mongoose");

const connectDB = async()=>{
await mongoose.connect("mongodb+srv://pranithakasamsetty_db_user:ZDPcd9vAuUEe4a8t@namastenode.yzjtfip.mongodb.net/devTinder");
}

module.exports = connectDB;

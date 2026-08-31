const adminAuth = (req, res, next) => {
    console.log("auth has been checked");
   const token="xyz";
   const isTokenAuthorized = token==="xyz";
   if(isTokenAuthorized){
    next();
   }else{
    res.status(401).send("not authorized");
   }
}
const userAuth = (req, res, next) => {
   const token="xyz";
   const isTokenAuthorized = token==="xyz";
   if(isTokenAuthorized){
    next();
   }else{
    res.status(401).send("not authorized");
   }
}
module.exports={adminAuth,userAuth}
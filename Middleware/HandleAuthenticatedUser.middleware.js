const jwt =require('jsonwebtoken');
require('dotenv').config();

const handleAuthenticatedUser=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userId=decoded.userId;
        next();
    }
    catch(err)
    {   
       return res.status(401).json({
           message:"Faield Auth"
       })
    }
}
module.exports=handleAuthenticatedUser;
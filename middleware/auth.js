const Admin = require("../models/adminSchema.js");
const User = require("../models/userSchema.js");
const jwt=require("jsonwebtoken")

const Authenticate = async(req,res,next)=>{
    
    // if(!token){
    //     res.status(401).json("you must login to access this resource!")
    // }
    try{
        const token = req.cookies.token;
        const verifytoken = jwt.verify(token,process.env.JWT_SECRET)
        const rootAdmin = await Admin.findOne({_id : verifytoken._id, "tokens:token" : token})
       
        if(!rootAdmin){
            throw new Error('user not found')
        }
        req.token = token;
        req.rootAdmin = rootAdmin
        req.AdminID = rootAdmin._id
        next();
    }
    catch(err){
     res.status(401).send('Unauthorized')
     console.log(err);
    }
}

module.exports = Authenticate;
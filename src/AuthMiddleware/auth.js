const jwt= require('jsonwebtoken')
const User= require('../Models/User')

const auth= async (req,res,next) =>{
    try{
        const token= req.header.authorization
        const decoded= jwt.verify(token,"TaskManager")
        const user= await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.user= user
        next()
    }
    catch(e){
        let errors=[];
        errors.push({msg:"Please Login first"})
        res.render('users/login',{errors})
    }
}

module.exports=auth
const express= require('express')
const User= require('../Models/User')
const router= new express.Router()
const auth= require('../AuthMiddleware/auth.js')
const { sendWelcomeEmail } = require('../emails/account')

// register and login
router.get('/users/register', async(req,res)=> res.render("users/register"))
router.get('/users/login', async(req,res)=> res.render("users/login"))

// UserAccount
router.get('/users/myAccount',auth, async(req,res)=>res.render("users/myAccount",{Username:req.user.name,Email:req.user.email }))

// Register Handle
router.post('/users/register', async(req,res) =>{
    const{name,email,password,password2}= req.body;
    let errors= []

    // Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: "Please fill all the fields"})
    }

    // Check password match
    if(password !== password2){
        errors.push({msg: 'Password do not match'})
    }

    // Check password length
    if(password.length<6){
        errors.push({msg: 'Password length too small'})
    }

    if(errors.length>0){
        res.render('users/register',{ errors,name,email,password,password2 })
    }
    else{
        const user= await User.findOne({email:email}) 
        if(user){
            errors.push({msg: "Email is already registered."});
            res.render('users/register',{ errors,name,email,password,password2 });
        }   
        else{
            try{
                const newUser = new User({ name,email,password })
                await newUser.save()
                sendWelcomeEmail(newUser.email,newUser.name)
                res.redirect('/users/login')
            }
            catch(e){
                res.status(400).send(e)
            }
        }
    }
})

// Logging In handle
router.post('/users/login', async(req,res) =>{
    const{email,password}= req.body;
    const user=await User.findOne({email,password});
    if(user) {
        const token= await user.generateAuthToken()
        req.header.authorization= token
        res.redirect('/projects')
    }
    else {
        let errors= []
        errors.push({msg: "Invalid email or password"})
        res.render('users/login',{ errors,email,password });
    }
})

module.exports= router
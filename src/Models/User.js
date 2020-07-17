const mongoose= require('mongoose')
const validator= require('validator')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps: true
})

// Hash The plain text password
// userSchema.pre('save', async function(next){
//     const user= this

//     if(user.isModified('password')){
//         user.password= await bcrypt.hash(user.password,8)
//     }
//     next()
// })

// Generate AuthToken
userSchema.methods.generateAuthToken= async function(){
    const user=this

    const token= jwt.sign({ _id:user._id.toString() },"TaskManager",{expiresIn: '24h'})
    user.tokens= user.tokens.concat({token: token})
    await user.save()

    return token
}

const User= mongoose.model('User',userSchema)
module.exports= User
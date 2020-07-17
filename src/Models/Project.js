const mongoose= require('mongoose')
const validator= require('validator')

const projectSchema= new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Status: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})


const Project= mongoose.model('Project',projectSchema)

module.exports= Project
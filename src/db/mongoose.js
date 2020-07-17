const mongoose= require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/ProjectManagerAPP",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>console.log("Database Connected")).catch((e)=>console.log("B"))

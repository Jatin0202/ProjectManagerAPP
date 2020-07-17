require('./db/mongoose')
const express= require('express');
const expressLayouts= require('express-ejs-layouts')
const userRouter= require('./routers/user');
const projectRouter= require('./routers/project');
const jwt= require('jsonwebtoken')

const app= express();

// EJS
app.use(expressLayouts);
app.set('view engine','ejs');

// BodyParser
app.use(express.urlencoded({extended:false}))

// Routes
app.get('/',(req,res) => res.render("welcome"))
app.use(userRouter);
app.use(projectRouter)


// PORT 
const PORT= process.env.PORT || 5000
app.listen(PORT, () => console.log("Good Going"))
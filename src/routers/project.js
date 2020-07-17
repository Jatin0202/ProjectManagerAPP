const express= require('express')
const Project= require('../Models/Project')
const router= new express.Router()
const auth= require('../AuthMiddleware/auth.js')

router.get('/projects/create', auth,async(req,res)=> res.render("projects/create"))
router.get('/projects', auth,async(req,res)=> {
    const projects= await Project.find({owner:req.user._id})
    res.render("projects/all",{projects})
})

router.get('/projects/:id',auth, async(req,res)=>{
    const _id=req.params._id
    const project= await Project.findOne({_id:req.params.id,owner:req.user._id})
    const Name= project.Name
    const Description= project.Description
    res.render("projects/edit",{Name,Description,project})
})

router.post('/projects/create', auth,async(req,res)=>{
    const {Name,Description,Status}= req.body
    if(!Name){
        let errors= []
        errors.push({msg: "Please enter some title of project"})
        res.render('projects/create',{ errors});
    }
    else if(!Description){
        let errors= []
        errors.push({msg: "Please enter some description of project"})
        res.render('projects/create',{ errors});
    }
    else {
        const project= new Project({Name,Description,Status,owner:req.user._id})
        await project.save()
        res.redirect("/projects")
    }
})

router.post('/projects/:id', auth, async(req,res)=>{
    const project= await Project.findOne({_id:req.params.id,owner:req.user._id})
    project.Description= req.body.Description;
    project.Status= req.body.Status;
    await project.save();
    res.redirect('/projects')
})

module.exports= router
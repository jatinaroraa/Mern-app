const jwt = require('jsonwebtoken');
const express = require('express');
const user = require('../data/userdata');
const router = express.Router();

require('../db/config')
const User = require('../data/userdata')

router.get('/', (req,res)=>{
    res.send('hello from backend auth home');
})

router.post('/singup', async (req,res)=>{
    const { name, email, mobile,password,cpassword}=req.body;
    if(! name||! email||! mobile||!password||!cpassword)
    {
        return res.status(422).json({error:"plz fill properly all feilds"})
    }
    if(password!=cpassword)
    {
        return res.status(422).json({sucess:"pls fill password properly"})
        
    }
    try{

       const userexist= await User.findOne({email:email})
        if(userexist){
            return res.status(422).json({mess:"user already exsist"});
        }
        const user = new User({name, email, mobile,password,cpassword})
       const usersave= await user.save();
       if(usersave){
           return res.status(200).json({mess:"sucessfully registerd"})
        }
        else{
            res.json({mess:"something went wrong"})}
     }catch(err){
        console.log(err)}
    }
 // User.findOne({email:email})
    // .then((userexist)=>{
    //     if(userexist){
    //     return res.status(421).json({mess:"user already exsist"});
    // }
    // const user = new User({name, email, mobile,password,cpassword})
    // user.save().then(()=>{
    //     res.status(200).json({mess:"sucessfully registerd"})
    // }).catch((err)=>{
    //     res.json({mess:"something went wrong"})})
    // }).catch((err)=>{console.log(err)})

   
    // console.log(req.body);
    // res.json({messege: req.body});

)
router.post('/singin',async (req,res)=>{
    try{
        const {email,password}=req.body;
        const userlogin = await user.findOne({email:email})
        if(!email|| !password)
        {
            return res.status(400).json({mess:"pls fill properly"})
        }

        if(!userlogin)
        {
            return res.status(400).json({mess:"please fill your details properly it doesnt match"})
        } 
        else if(userlogin.password!==password)
        {
           return res.status(400).json({error:"password doesnt match"})
        }
        else{
            res.status(200).json({mess:"login sucess"})
            const token = await userlogin.generatetoken();
             console.log(token);
             res.cookie("token",token)
             

        }
        
       


    }catch(err){
        console.log(err);
    }
    
})




module.exports = router;
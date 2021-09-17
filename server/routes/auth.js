const express= require('express')
const router =  express.Router();
const mongoose= require('mongoose');
const User= mongoose.model("User");
const brcypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
const { JWT_SECRET} =require('../keys');
const requireLogin=require('../middleware/requireLogin');



router.get('/',(req,res)=>{
    res.send("hello")
});

router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello User")
})

router.get('/profilepost',(req,res)=>{
    User.find()
    .then(user=>{
        res.json({user})
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/signup',(req,res)=>{
    const { firstname,lastname,email,password,phone,birth,stream,gender,hometown,school,college,profession,photo} = req.body;
    if(!firstname ||!lastname || !email || !password || !phone || !birth || !stream || !gender  || !hometown  ||!school  ||!college ||!profession ||!photo){
        res.status(422).json({error:"please submit all the details carefully"})
    }
    User.findOne({email:email}).then((userExit)=>{
        if(userExit){
      return res.status(422).json({error:"User alraedy exit with this email"})
        }
        brcypt.hash(password,12)
        .then(hashedpassword=>{
            const user=new User({
                email,
                password:hashedpassword,
                firstname,
                lastname,
                profession,
                phone,
                birth,
                stream,
                gender,
                hometown,
                school,
                college,
                photo
            })
    
            user.save().then(user=>{
                res.json({message:"saved sucessfully"})
            })
            .catch(err=>{
                console.log(err);
            })
        })
        
    })
    .catch(err=>{
        console.log(err);
    })
})


router.post('/signin',(req,res)=>{
    const { email, password} = req.body
    if(!email || !password){
        res.status(422).json({error:"Please add email or password"})
    }
    User.findOne({email:email}).then(userExit=>{
        if(!userExit){
          return   res.status(422).json({error:"Invalid Email address or password"})
        }
        brcypt.compare(password,userExit.password).then(doMatch=>{
            if(doMatch){
                // res.json({message:"sucessfully signing."})
                const token= jwt.sign({_id:userExit._id},JWT_SECRET)
                res.json({token})
            }
            else{
                return  res.status(422).json({error:"Invalid Email address or password"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})

module.exports=router;
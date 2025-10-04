const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Models/RegisterSchema');
const jwt = require('jsonwebtoken');
const jwtsecret='1234'

router.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const existingUser =await User.findOne({
            email:email
        })
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }

        const hashedpassword=await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            email,
            password:hashedpassword,
        })

        await newUser.save();
        res.status(201).json({message:'User registered successfully'});

    }catch(err){
           console.log('Error:', err);
    res.status(500).json({ message: 'Server error' });
    }
})

//login route

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const loginuser=await User.findOne({email})
        if(!loginuser){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const ismatch=await bcrypt.compare(password,loginuser.password);
        if(!ismatch){
            return res.status(400).json({message:'Invalid credentials'});
        }
         // ✅ Create JWT Token
    const payload = {
      id: loginuser._id,
      email: loginuser.email,
      name: loginuser.name
    };

        const token = jwt.sign(payload,jwtsecret, { expiresIn: '7d' });

 // ✅ Send token + success message
    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        name: loginuser.name,
        email: loginuser.email
      }
    });
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports=router;
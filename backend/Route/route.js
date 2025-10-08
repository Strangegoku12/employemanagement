const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Models/RegisterSchema');
const jwt = require('jsonwebtoken');
const employees = require('../Models/EmployementSchema');
const jwtsecret='1234'

// register route
router.post('/register',async (req,res)=>{
    const { name, email, password } = req.body.register; //  this line changed

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
    const {email,password}=req.body.login;
    try{
        const loginuser=await User.findOne({email})
        if(!loginuser){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const ismatch=await bcrypt.compare(password,loginuser.password);
        if(!ismatch){
            return res.status(400).json({message:'Invalid credentials'});
        }
         //  Create JWT Token
    const payload = {
      id: loginuser._id,
      email: loginuser.email,
      name: loginuser.name,
      role: loginuser.role
    };

        const token = jwt.sign(payload,jwtsecret, { expiresIn: '7d' });

 //  Send token + success message
    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        name: loginuser.name,
        email: loginuser.email,
        role: loginuser.role
      }
    });
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
})

// Employee Management routes (CRUD operations) can be added here
router.get('/getemployees', async (req, res) => {
    try {
        const employee = await employees.find();
        res.status(200).json({ employees: employee }); // ✅ employees array wrap kiya
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


// employess creation post
router.post('/postemployees', async (req, res) => {

    const alreademployee= await employees.findOne({employeid:req.body.employeid});
    if(alreademployee){
        return res.status(400).json({message:'Employee ID already exists'});
    }
    try {
        const {
            name,
            email,
            employeid,
            date_of_birth,
            gender,
            marital_status,
            designation,
            department,
            salary,
            password
        } = req.body.employement;

        // check for missing fields
        if (
            !name || !email || !employeid || !date_of_birth || !gender ||
            !marital_status || !designation || !department || !salary || !password
        ) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        // hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = new employees({
            name,
            email,
            employeid,
            date_of_birth,
            gender,
            marital_status,
            designation,
            department,
            salary,
            password: hashedPassword
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// delete employee
router.delete('/deleteemployee/:id', async (req, res) => {
    try {
        const employee = await employees.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// update employee
router.put('/updateemployee/:id', async (req, res) => {
    try {
        const updatedEmployee = await employees.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports=router;
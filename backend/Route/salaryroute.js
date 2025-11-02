const app=require('express');
const router=app.Router();

const SalarySchema=require('../Models/SalarySchema');
const authMiddleware = require('../Authmiddleware/auth');
const EmployementSchema=require('../Models/EmployementSchema');

// Add salary record
// Add salary record
router.post('/addsalary', authMiddleware, async (req, res) => {
  const { name, salary, allowance, deduction, total, paydate } = req.body.salary;

  try {
    let employeIdToSave;

    // If admin is adding salary, find employee by name
    if (req.user.role === 'admin') {
      const employee = await EmployementSchema.findOne({ name: name.trim() });

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found with that name' });
      }

      employeIdToSave = employee._id;
    } else {
      // If normal employee adds their own record (unlikely)
      employeIdToSave = req.user.id;
    }

    const newSalary = new SalarySchema({
      employeid: employeIdToSave,
      name,
      salary,
      allowance,
      deduction,
      total,
      paydate
    });

    await newSalary.save();
    res.status(201).json({ message: 'Salary record added successfully' });
  } catch (err) {
    console.error('Error adding salary:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get Salary records for a specific employee
router.get('/mysalaries',authMiddleware,async(req,res)=>{
    try{
        if(req.user.role === 'admin'){
            const allsalaries=await SalarySchema.find();
            res.json(allsalaries);
            return;
        }
        else
        {
            const salarys=await SalarySchema.find({employeid:req.user.id});
            res.json(salarys);
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Error fetching salaries'});
    }
});

module.exports=router;
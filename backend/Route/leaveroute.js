const app=require('express');
const router=app.Router();
const LeaveSchema=require('../Models/LeaveSchema');
const authMiddleware = require('../Authmiddleware/auth');
// Apply for leave
router.post('/applyleave', authMiddleware, async (req, res) => {
  console.log("User ID:", req.user.id);

  const { name, from_date, to_date, reason } = req.body.leave;
  try {
    const newLeave = new LeaveSchema({
      employeid: req.user.id,  // from JWT
      name,
      from_date,
      to_date,
      reason
    });
    await newLeave.save();
    res.status(201).json({ message: 'Leave application submitted successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leave applications for a specific employee
router.get('/myleaves', authMiddleware, async (req, res) => {
        console.log("shpw the he role",req.user)

  try {
    if (req.user.role === 'admin') {
        const allLeaves = await LeaveSchema.find();
            res.json(allLeaves);
        return;
    }
    else{
const leaves = await LeaveSchema.find({ employeid: req.user.id });
    res.json(leaves);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching leaves' });
  }
});

// delete leave application
router.delete('/deleteleave/:id', authMiddleware, async (req, res) => {
  try {
    const leave = await LeaveSchema.findById(req.params.id);
    if (!leave) {
        return res.status(404).json({ message: 'Leave application not found' });
    }
    await LeaveSchema.findByIdAndDelete(req.params.id);
    res.json({ message: 'Leave application deleted successfully' });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
});

// Approve leave application
router.put('/approveleave/:id', authMiddleware, async (req, res) =>{
    try {
        const leave = await LeaveSchema.findById(req.params.id);
        if (!leave) {
            return res.status(404).json({ message: 'Leave application not found' });
        }
        leave.status = 'approved';
        await leave.save();
        res.json({ message: 'Leave application approved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });

    }
})


router.put('/rejectleave/:id', authMiddleware, async (req, res) =>{
    try {
        const leave = await LeaveSchema.findById(req.params.id);
        if (!leave) {
            return res.status(404).json({ message: 'Leave application not found' });
        }
        leave.status = 'rejected';
        await leave.save();
        res.json({ message: 'Leave application reject successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });

    }
})

module.exports=router;

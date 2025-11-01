const mongoose=require('mongoose');


const LeaveSchema = new mongoose.Schema({
  employeid: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to Employment document
    ref: 'Employment',
  },
  name:{
    type:String,
    required:true,
  },
  from_date: {
    type: Date,
    required: true
  },
  to_date: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});


module.exports=mongoose.model('LeaveSchema',LeaveSchema);
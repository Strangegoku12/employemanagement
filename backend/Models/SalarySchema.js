const mongoose = require('mongoose');
const SalarySchema=new mongoose.Schema({
    employeid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'EmployementSchema',
    },
    name:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    allowance:{
        type:Number,
        required:true,
    },
    deduction:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        required:true,
    },
    paydate:{
        type:Date,
        required:true,

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('SalarySchema',SalarySchema);
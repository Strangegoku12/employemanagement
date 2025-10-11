const mongoose = require('mongoose');

const EmployementSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    employeid:{
        type:String,
        required:true,
    },
    date_of_birth:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    marital_status:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
    type: String,
    enum: ['employee', 'admin'],
    default: 'employee'
  },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model('EmployementSchema',EmployementSchema);
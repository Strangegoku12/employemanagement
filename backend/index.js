const express=require('express');
const app=express();
const connectDB=require('./DB/connect')
const router=require('./Route/route');
const authMiddleware = require('./Authmiddleware/auth');
const cors = require('cors');
const leaveroute=require('./Route/leaveroute');
const salaryroute=require('./Route/salaryroute');
app.use(cors());
app.use(express.json());


connectDB();

app.use('/api',router);
app.use('/api/employees',router);
app.use('/api',authMiddleware,leaveroute);
app.use('/api',authMiddleware,salaryroute);


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

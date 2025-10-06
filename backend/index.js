const express=require('express');
const app=express();
const connectDB=require('./DB/connect')
const router=require('./Route/route');
const authMiddleware = require('./Authmiddleware/auth');
const cors = require('cors');
app.use(cors());
app.use(express.json());


connectDB();

app.use('/api',router);
app.use('/api/employees',router);

app.get('/api/employees',authMiddleware,(req,res)=>{
    res.send('Hello World');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

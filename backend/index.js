const express=require('express');
const app=express();
const connectDB=require('./DB/connect')
const router=require('./Route/route')


connectDB();
app.use(express.json());

app.use('/api',router);
app.use('/api',router);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

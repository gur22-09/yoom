const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors')
//connect to MongoDB
connectDB();


//init Middlewares
app.use(express.json({extended:false}));
app.use(cors());


const PORT = process.env.PORT || 4000;


//Routes
app.use('/api/usersLogin',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));






app.get('/',(req,res)=>res.send(`API working`));

app.listen(PORT,()=>console.log(`server up on ${PORT}`));
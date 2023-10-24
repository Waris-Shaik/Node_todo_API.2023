const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const {errorMiddleware} = require('./middlewares/error');
const cors = require('cors');

dotenv.config({
    path:'./dataBase/config.env'
})


// using middleWares to accept data 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

// making cors active
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))



// routes
app.use('/api/v1/users',userRouter.router); 
app.use('/api/v1/tasks',taskRouter.router);


// error middleware
app.use(errorMiddleware);


module.exports = app;
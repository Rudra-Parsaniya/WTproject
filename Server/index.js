const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./Routes/auth');
const cookieParser = require('cookie-parser');
const bookRouter = require('./Routes/bookr');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use('/auth', userRouter);
app.use('/book', bookRouter);

mongoose.connect('mongodb+srv://RudraParsaniya18:Rudra1836@cluster0.e0yvz.mongodb.net/')


app.listen(3001, () => {
    console.log('Server Started')
})
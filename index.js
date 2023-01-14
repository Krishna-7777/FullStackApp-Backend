const express = require('express');
var cors = require('cors')
require("dotenv").config();

const { connection } = require('./config/db');
const { userRouter } = require('./routes/user');
const { noteRouter }= require('./routes/note');
const { authenticate } = require('./middlewares/auth');

const app = express();

app.use(cors());

app.use(express.json())

app.use('/user', userRouter);
app.use(authenticate)
app.use('/notes', noteRouter);

app.get('/about', (req, res) => {
    res.send('About ApI')
})

app.listen(process.env.port, async () => {
    try {
        connection
        console.log(`Connected to the DB & server is runnning at ${process.env.port}...`)
    } catch (error) {
        console.log('Error --->',error.message)
    }
})

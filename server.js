const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')

//import routes
const authRouter = require('./routes/auth')

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log("Success, connected to DB"))

//middleware
app.use(express.json());

//route middleware
app.use('/api/user', authRouter);

app.listen(8000, () => console.log('Connected to port 8000'));
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const {errorHandler} = require('./controller');
const bodyParser = require('body-parser');
const router = require('./routes/index.js');
dotenv.config();
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use('/', router);
app.use(errorHandler);

const DB_URL = process.env.DB_SERVER;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("DB connected");
    } catch (err) {
        console.log(err);
    }
}

  
// start the server
const start = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT);
    } catch (error) {
        console.log(error);
    }
}
  
start();
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const {Swaggiffy} = require("swaggiffy");
new Swaggiffy().setupExpress(app).swaggiffy();

app.use(cors());
app.use(express.json())

const env = process.env.NODE_ENV || "development";

const DB_URL =  env === "container" ? process.env.DB_URL_CONTAINER : process.env.DB_URL_DEV



// Connect to MongoDB
mongoose.connect(DB_URL)
.then( () => console.log ("Connected to DB" )) 
.catch( (err) => console.error("Could not connect to MongoDB"))

// User Routes
app.use('/api/user', userRoutes);

// Candidate Routes
app.use('/api/candidate', candidateRoutes);

// Welcome Route
app.get('/', (req,res) => {
    res.send('VOTING SYSTEM ࡙࡙࡙࡙࡙');
})

app.listen(3032, () => {
    console.log('Server Listening on Port 3032');
})
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


const userController = require("./controllers/user.controller");
const caseController = require("./controllers/case.controller");
const diseaseController = require("./controllers/disease.controller");
const locationController = require("./controllers/location.controller");

// Connect to MongoDB
mongoose.connect(DB_URL)
.then( () => console.log ("Connected to DB" )) 
.catch( (err) => console.error("Could not connect to MongoDB"))

// User Routes
app.use('/api/user', userController);

// Case Routes
app.use('/api/cases', caseController);


// Diseases Routes
app.use('/api/diseases', diseaseController);


// Diseases Routes
app.use('/api/locations', locationController);


// Welcome Route
app.get('/', (req,res) => {
    res.send('CASE MANAGEMENT SYSTEM ࡙࡙࡙࡙࡙');
})

app.listen(5008, () => {
    console.log('Server Listening on Port 5008');
})
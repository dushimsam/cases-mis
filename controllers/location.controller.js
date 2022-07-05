const express = require("express");
const {
    Location,
    validateLocation
} = require("../models/location.model");
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const {
            error
        } = validateLocation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const location = await Location.findOne({
            name: req.body.name
        });
        if (location) return res.status(400).send("Location already registered");

        const newLocation = new Location({
            name: req.body.name,
        });
        const result = await newLocation.save();
        res.status(201).send(result);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
})

router.get("/", async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).send(locations);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) return res.status(404).send("Location not found");

        res.status(200).send(location);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
})

router.update("/:id",async(req,res)=>{
    try{
        const {error} = validateLocation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const location = await Location.findByIdAndUpdate(req.params.id,{
            name: req.body.name
        })
        if(!location) return res.status(404).send("Location not found");
        res.status(200).send(location);
        
        return res.status(200).send(location);
    }catch(ex) {
        res.status(500).send(ex.message);
    }
})


module.exports = router;
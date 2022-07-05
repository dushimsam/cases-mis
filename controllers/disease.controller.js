const express = require("express");
const {validateDisease,Disease } = require("../models/disease.model");
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const { error } = validateDisease(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const disease = await findOne({
            name:req.body.name
        })
        if(disease)
            return res.status(400).send("Disease already registered");

        const newDisease = new Disease({
            name: req.body.name,
        });
        const result = await newDisease.save();
        res.status(201).send(result);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
})

router.get("/", async (req, res) => {
    try {
        const diseases = await Disease.find();
        res.status(200).send(diseases);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const disease = await Disease.findById(req.params.id);
        if (!disease) return res.status(404).send("Disease not found");

        res.status(200).send(disease);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
})


module.exports = router;

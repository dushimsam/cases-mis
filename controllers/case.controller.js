const express = require("express");
const {validateCase , Case} = require("../models/case.model");
const router = express.Router();
const {registerDefinition} = require("swaggiffy")

router.post("/", async (req, res) => {

    try {
        const {error} = validateCase(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const case_ = await Case.findOne({
            location_id: req.body.location_id,
            disease_id: req.body.disease_id
        });
        if(case_) return res.status(400).send("Case already registered");

        const newCase = new Case({
            location_id: req.body.location_id,
            disease_id: req.body.disease_id,
            count: req.body.count
        });
        const result = await newCase.save();
        res.status(201).send(result);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
})


router.get('/diseases/:id', async (req, res) => {
    try {
        const cases = await Case.find({
            disease_id: req.params.id
        });
        if (!cases) return res.status(404).send("Case not found");

        res.status(200).send(cases);
    } catch (ex) {  //ex.message
        res.status(500).send(ex.message);
    }
})


registerDefinition(router,{basePath:'/api/cases',tags:'Case' ,Schema: 'Case'});

module.exports = router;
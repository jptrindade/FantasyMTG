const express = require('express')
const router = express.Router()
const Filter = require('../models/Filter')

//Returns all filters
router.get('/', async (req,res) => {
    try{
        const filters = await Filter.find()
        res.json(filters)
    }catch(err){
        res.json({message:err})
    }
})


//Creates filter
router.post('/', async (req, res) => {
    const filter = new Filter({
        name: req.body.name,
        to_include: req.body.to_include
    })

    try{
        const savedFilter = await filter.save()
        res.json(savedFilter)
    }catch(err){
        res.json({message: err})
    }
    
})

module.exports = router;
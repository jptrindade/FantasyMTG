const express = require('express')
const router = express.Router()
const Stats = require('../models/Stats')



//Returns all stats
router.get('/', async (req,res) => {
    try{
        const stats = await Stats.find()
        res.json(stats)
    }catch(err){
        res.json({message:err})
    }
})

//Creates stats
router.post('/', async (req, res) => {
    const stats = new Stats({
        name: 'stats',
        stats: []
    })

    try{
        const savedStats = await stats.save()
        res.json(savedStats)
    }catch(err){
        res.json({message: err})
    }
    
})
module.exports = router;
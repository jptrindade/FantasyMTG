const express = require('express')
const router = express.Router()
const Player = require('../models/Player')

//Returns all players
router.get('/', async (req,res) => {
    try{
        const players = await Player.find()
        res.json(players)
    }catch(err){
        res.json({message:err})
    }
})

//Creates a player
router.post('/', async (req, res) => {
    const player = new Player({
        name: req.body.name,
        picks: req.body.picks
    })

    try{
        const savedPlayer = await player.save()
        res.json(savedPlayer)
    }catch(err){
        res.json({message: err})
    }
    
})

module.exports = router;
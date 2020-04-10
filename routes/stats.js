const express = require('express')
const router = express.Router()
const Stats = require('../models/Stats')
const Player = require('../models/Player')


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

//Get points of player
router.get('/:playerName', (req, response) => {
    var playerPoints = 0
    Player.findOne({ name: req.params.playerName}).then(res =>{
        var player = res
        Stats.findOne({ name: 'stats'}).then( res =>{
            var statsObj = res
            player.picks.forEach(pick => {
                var index =statsObj.stats.findIndex(el => el.card == pick)
                if (index > -1){
                    playerPoints += statsObj.stats[index].points
                }
            })
            response.json({points: playerPoints})
        }).catch(err => {
            res.json({message:err})
            return
        })
    }).catch(err => {
        res.json({message:err})
        return
    })
    
})

module.exports = router;
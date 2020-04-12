const express = require('express')
const router = express.Router()
const Stats = require('../models/Stats')
const Player = require('../models/Player')
const Filter = require('../models/Filter')

//Returns all stats
router.get('/', async (req,res) => {
    try{
        const statsObj = await Stats.find()
        res.json(statsObj[0].stats)
    }catch(err){
        res.json({message:err})
    }
})

//Returns top filtered stats
router.get('/filter/:filterName', async (req,response) => {
    Stats.findOne({ name: 'stats'}).then( res =>{
        var stats = res.stats
        Filter.findOne({ name: req.params.filterName }).then( res => {
            if(res == null){
                response.json(stats)
                return
            } 
            var filter = res.to_include
            
            var newStats = stats.filter(item => filter.includes(item.card))
            response.json(newStats)
        })
    })
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
    Player.findOne({ name: req.params.playerName}).then(res =>{
        var player = res
        Stats.findOne({ name: 'stats'}).then( res =>{
            var statsObj = res
            var myResponse = {}
            myResponse['points'] = 0
            player.picks.forEach(pick => {
                var index = statsObj.stats.findIndex(el => el.card == pick)
                if (index > -1){
                    myResponse['points'] += statsObj.stats[index].points
                    myResponse[pick] = statsObj.stats[index].points
                }
                else myResponse[pick] = 0
            })
            response.json(myResponse)
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
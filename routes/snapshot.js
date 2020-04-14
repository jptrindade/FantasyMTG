const express = require('express')
const router = express.Router()
const Player = require('../models/Player')
const Stats = require('../models/Stats')
const Snapshot = require('../models/Snapshot')

//Returns all Snapshots
router.get('/', async (req,res) => {
    try{
        const snapshotObj = await Snapshot.find()
        res.json(snapshotObj)
    }catch(err){
        res.json({message:err})
    }
})

router.post('/', async (req, response) => {
    Stats.findOne({ name: 'stats'}).then( res =>{
        var snapshotArr = []
        var statsObj = res
        Player.find().then( players => {
            players.forEach( player =>{
                playerObj = {player: player.name, points: 0}
                player.picks.forEach( pick => {
                    var index = statsObj.stats.findIndex(el => el.card == pick)
                    if (index > -1){
                        playerObj.points += statsObj.stats[index].points
                    }
                })

                snapshotArr.push(playerObj)
            })
            new Snapshot({date: Date.now(), points: snapshotArr}).save().then(res => response.json(res))
        }).catch(err => {
            response.json({message:err})
            return
        })
    }).catch(err => {
        response.json({message:err})
        return
    })
    
})

module.exports = router;
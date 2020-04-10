const express = require('express')
const cheerio = require('cheerio');
const request = require('request');
const router = express.Router()
const Event = require('../models/Event')
const Stats = require('../models/Stats')

//Updates the point database with a link
router.post('/', (req, res) => {
    
    Event.exists({url: req.body.url}).then(exists => {
        if (!exists){
            try{
                Stats.findOne({name: 'stats'}).then(res => {
                    var statsObj = res
                    try{
                        request({
                            method: 'GET',
                            url: req.body.url,
                        }, (err, res, body) => {
                        
                            if (err) return console.error(err)
                            let $ = cheerio.load(body)
                            $('div.sorted-by-color-container').remove()
                            $('div.sorted-by-cost-container').remove()
                            $('div.sorted-by-rarity-container').remove()
                            let cardCount = []
                            let cardName = []
                            let countDict = {}
                        
                            $('span.card-count').each((i,ele) => {
                                cardCount.push(ele.children[0].data)
                            });
                        
                            $('span.card-name > a').each((i,ele) => {
                                var name = ele.children[0].data
                                cardName.push(name)
                                if (!(name in countDict)){
                                    countDict[name] = 0
                                }
                            });
                        
                            for(card in cardCount){
                               countDict[cardName[card]] += parseInt(cardCount[card])
                            }
            
                            for (var cardKey of Object.keys(countDict)){
                                objIndex = statsObj.stats.findIndex((obj => obj.card == cardKey));
                                if (objIndex > -1){
                                    statsObj.stats[objIndex].points += countDict[cardKey]
                                } else {
                                    statsObj.stats.push({
                                        card: cardKey,
                                        points: countDict[cardKey]
                                    })
                                }
                            }
                            statsObj.save()
            
                        });
            
                        Stats.findOneAndUpdate({name: 'stats'},statsObj, {useFindAndModify: false}).catch( err => {
                            console.log(err)
                            res.json({message:err})
                            return
                        })
        
                        
                    }catch(err){
                        res.json({message:err})
                        return
                    }
                })
                
                
            }catch(err){
                res.json({message: err})
                return
            }
            const event = new Event({
                url: req.body.url
            })
            event.save().then( doc =>  res.json({message: doc}))
            .catch(err => res.json({message: err}))

        } else {
            res.json({message: "URL already processed"})
        }
    })
})

module.exports = router;
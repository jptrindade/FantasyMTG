const mongoose = require('mongoose')

const StatsSchema = mongoose.Schema({
    name: String,
    stats:[
        {
            card: String,
            points: Number
        }
    ]
})

module.exports = mongoose.model('Stats', StatsSchema)
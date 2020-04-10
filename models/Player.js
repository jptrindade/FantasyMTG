const mongoose = require('mongoose')

const PlayerSchema = mongoose.Schema({
    name: String,
    picks: Array
})

module.exports = mongoose.model('Players', PlayerSchema)
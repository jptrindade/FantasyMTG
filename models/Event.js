const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
    url: String
})

module.exports = mongoose.model('Events', EventSchema)
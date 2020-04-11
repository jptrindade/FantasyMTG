const mongoose = require('mongoose')

const FilterSchema = mongoose.Schema({
    name: String,
    to_include: [String]
})

module.exports = mongoose.model('Filters', FilterSchema)
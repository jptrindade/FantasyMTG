const mongoose = require('mongoose')

const SnapshotSchema = mongoose.Schema({
    date: Date,
    points: [{
        player: String,
        points: Number
    }]
})

module.exports = mongoose.model('Snapshots', SnapshotSchema)
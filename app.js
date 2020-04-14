const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv/config')

//Middleware
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//Import Routes
const statsRoute = require('./routes/stats');
const playersRoute = require('./routes/players');
const updateRoute = require('./routes/update');
const filtersRoute = require('./routes/filters');
const snapshotsRoute = require('./routes/snapshot');


app.use('/stats', statsRoute)
app.use('/players', playersRoute)
app.use('/update', updateRoute)
app.use('/filters', filtersRoute)
app.use('/snapshot', snapshotsRoute)

// Routes
app.get('/', (req,res) => {
    res.send('home')
})

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true } ,
     () => console.log('connected to MongoDB Atlas and on port '+ process.env.PORT))

app.listen(process.env.PORT);

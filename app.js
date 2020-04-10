const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv/config')

//Middleware
app.use(bodyParser.json())

//Import Routes
const statsRoute = require('./routes/stats');
const playersRoute = require('./routes/players');
const updateRoute = require('./routes/update');

app.use('/stats', statsRoute)
app.use('/players', playersRoute)
app.use('/update', updateRoute)

// Routes
app.get('/', (req,res) => {
    res.send('home')
})

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true } ,
     () => console.log('connected to MongoDB Atlas'))

app.listen(3000);

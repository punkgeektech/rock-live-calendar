const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 3001
const cors = require('cors')
const apiRoutes = require("./api-routes")

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

// mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/rocklivecalendar')
var db = mongoose.connection

// Cross-origin resource sharing
app.use(cors())

app.get('/', (req, res) => res.send('我想想这个页面放啥'))
app.use('/api', apiRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

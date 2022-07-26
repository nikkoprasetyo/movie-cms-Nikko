require('dotenv').config()

const express = require('express')
const port = 3000
const app = express()
const router = require('./routings/index')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cors())
app.use('/', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
//jhjhjhjhjhj
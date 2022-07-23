require('dotenv').config()

const express = require('express')
const port = 3000
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
    res.send("HELLLLLLLLLLOOOOOOO") //Testing for Api
})

app.use(cors())

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
//jhjhjhjhjhj
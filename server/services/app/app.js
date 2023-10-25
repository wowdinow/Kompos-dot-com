const express = require('express')
const router = require('./routers')
const cors = require("cors")
const app = express()
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    }
const port = process.env.PORT || 4002

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const cors = require('cors')
const { mongoConnection } = require('./config/mongoConnection')
const router = require('./router')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

mongoConnection().then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
})
.catch((err) => {console.log(err);})

app.use('/users', router)

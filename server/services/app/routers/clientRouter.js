const express = require('express')
const ControllerClient = require('../controllers/controllerClient')
const routerClient = express.Router()

routerClient.get('/', (req, res) => {
    res.send("Hello Client!!!!!!")
})

routerClient.get('/posts', ControllerClient.getPosts)
routerClient.get('/posts/:id', ControllerClient.getPostById)

module.exports = routerClient
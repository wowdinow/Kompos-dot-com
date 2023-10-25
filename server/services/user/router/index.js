const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.getUser)
router.post('/', Controller.addUser)
router.get('/:id', Controller.getUserById)
router.delete("/:id", Controller.deleteUser)

module.exports = router
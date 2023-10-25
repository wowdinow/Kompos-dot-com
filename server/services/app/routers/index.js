const express = require('express')
const routerClient = require('./clientRouter')
const routerAdmin = require('./adminRouter')
const errorHandler = require('../middlewares/errorHandler')
const router = express.Router()


router.use('/admin', routerAdmin)
router.use('/', routerClient)
router.use(errorHandler)

module.exports = router
const express = require('express')
const ControllerAdmin = require('../controllers/controllerAdmin')
const routerAdmin = express.Router()
const {authentication, authorization} = require('../middlewares/auth')

routerAdmin.get('/', (req, res) => {
    res.send("Helloooo Admiiinnn!!!")
})
routerAdmin.post('/login', ControllerAdmin.login)

routerAdmin.post('/register', ControllerAdmin.register)
routerAdmin.get('/posts', ControllerAdmin.getPosts)
routerAdmin.get('/posts/:id', ControllerAdmin.findPostByPk)
routerAdmin.put('/posts/:id', ControllerAdmin.editPost)
routerAdmin.post('/posts', ControllerAdmin.addPost)
routerAdmin.delete('/posts/:id', ControllerAdmin.deletePosts)

routerAdmin.get('/categories', ControllerAdmin.getCategories)
routerAdmin.get('/categories/:id', ControllerAdmin.getCategoryByPk)
routerAdmin.post('/categories', ControllerAdmin.addCategory)
routerAdmin.patch('/categories/:id', ControllerAdmin.editCategory)
routerAdmin.delete('/categories/:id', ControllerAdmin.deleteCategory)



module.exports = routerAdmin
const express = require('express')
const cors = require('cors')
const Redis = require('ioredis')
const UserController = require('./controllers/userController')
const PostController = require('./controllers/postController')
const app = express()
const port = 4000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const redis = new Redis()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// USERS
app.get("/users", UserController.getData)
app.post("/users", UserController.addUser)
app.delete("/users/:id", UserController.deleteUser)

// MAIN ENTITY
app.get("/posts", PostController.getAllPost)
app.get("/posts/:id/", PostController.getPostById)
app.patch("/posts/:id", PostController.updatePost)
app.post("/posts", PostController.addPost)
app.delete("/posts/:id", PostController.deletePost)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
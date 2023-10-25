const axios = require('axios')

class PostController {
    static async getAllPost(req, res){
        try {
            const redisPost = await redis.get("app:posts")
            if(!redisPost){
                const {data} = await axios({
                url: "http://localhost:4002/posts"
                })
                await redis.set("app:posts", JSON.stringify(data))
                res.status(200).json(data)
            } else {
                res.status(200).json(JSON.parse(redisPost))
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    static async getPostById(req, res){
        try {
            const {data} = await axios({
                url: 'http://localhost:4002/posts/' + req.params.id,
                method: "GET"
            })
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    static async updatePost(req, res){
        try {
            await axios({
                url: "http://localhost:4002/admin/posts/" + req.params.id,
                method: "PUT",
                data: req.body
            })
            res.status(200).json({message: "Success"})
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    static async addPost(req, res){
        try {
            await axios({
                url: 'http://localhost:4002/admin/posts',
                method: "POST",
                data: req.body
            })
            res.status(201).json({message: "Success"})
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Intenal Server Error"})
        }
    }

    static async deletePost(req, res){
        try {
            await axios({
                url: "http://localhost:4002/admin/posts/" + req.params.id,
                method: "DELETE"
            })
            res.status(200).json({message: "Success"})
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}

module.exports = PostController
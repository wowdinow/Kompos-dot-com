const { Post, Tag } = require('../models')

class ControllerClient {

    static async getPosts(req, res, next) {
        try {
            const data = await Post.findAll()
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async getPostById(req, res, next){
        try {
            const id = +req.params.id

            const data = await Post.findByPk(id, {include: Tag})

            if(!data){
                throw {name: "NotFound"}
            }
            console.log(data);
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = ControllerClient
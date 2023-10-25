const { comparePass } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const {User, Post, Category, Tag, sequelize} = require('../models')

class ControllerAdmin {
    static async login(req, res, next){
        try {
            const {email, password} = req.body

            if(!email || !password){
                throw {name: "Email/Password is required"}
            }

            const user = await User.findOne({where: {email: email}})

            if(!user || !comparePass(password, user.password)){
                throw {name: "Unathorized"}
            }

            let access_token = createToken({id: user.id, role: user.role})

            res.status(200).json({access_token})
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async register(req, res, next){
        try {
            await User.create(req.body)
            res.status(201).json({message: "Successfully create an account"})
        } catch (err) {
            next(err)
        }
    }

    static async getPosts(req, res, next){
        try {
            const data = await Post.findAll(
                {include: {model: Category}}
                )            
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async addPost(req, res, next){
        const transaction = await sequelize.transaction()
        try {
            console.log(req.body);
            const data = await Post.create(
                {...req.body}, {transaction})
            const tag = await Tag.bulkCreate({...req.body.tags, postId: data.id}, {transaction})
            await transaction.commit()
            res.status(201).json({message: "Success"})
        } catch (err) {
            console.log(err);
            await transaction.rollback()
            next(err)
        }
    }

    static async findPostByPk(req, res, next){
        try {
            const id = +req.params.id
            const data = await Post.findByPk(id, {include: Category})
            res.status(200).json(data)
        } catch (err) {
            
        }
    }

    static async editPost(req, res, next){
        try {
            await Post.update(req.body, {where: {id: +req.params.id}})
            res.status(200).json({message: "Success update post"})
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async deletePosts(req, res, next){
        // const transaction = sequelize.transaction()
        try {
            const post = await Post.findByPk(+req.params.id)
            if(!post){
                throw {name: "NotFound"}
            }

            await Tag.destroy({where: {postId: post.id}})
            await Post.destroy({where: {id: +req.params.id}})
            
            res.status(200).json({message: `Detele post with title ${post.title} success`})
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async getCategories(req, res, next){
        try {
            const data = await Category.findAll()
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async getCategoryByPk(req, res, next){
        try {
            const data = await Category.findByPk(+req.params.id)
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async addCategory(req, res, next){
        try {
            const data = await Category.create({...req.body})
            console.log(data);
            res.status(201).json({message: "Category created successfully"})
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async editCategory(req, res, next){
        try {
            const category = await Category.findByPk(+req.params.id)

            if(!category){
                throw {name: "NotFound"}
            }

            await Category.update({...req.body}, {where: {id: +req.params.id}})
            res.status(200).json({message: "Update success"})
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async deleteCategory(req, res, next){
        try {
            const category = await Category.findByPk(+req.params.id)

            if(!category){
                throw {name: "NotFound"}
            }

            await Category.destroy({where: {id: +req.params.id}})
            res.status(200).json({message: "Delete success"})
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = ControllerAdmin
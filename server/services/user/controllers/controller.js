const User = require("../models/User")

class Controller {

    static async getUser(req, res){
        try {
            const user = await User.findAll()
            res.status(200).json(user)
        } catch (err) {
            console.log(err);
        }
    }

    static async addUser(req, res){
        try {
            console.log(req.body, "ini di controller");
            await User.create(req.body)
            res.status(201).json({message: "Success"})
        } catch (err) {
            console.log(err);
        }
    }

    static async getUserById(req, res){
        try {
            const {id} = req.params
            const data = await User.findByPk(id)
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteUser(req, res){
        try {
            const {id} = req.params
            await User.destroy(id)
            res.status(200).json({message: "Success"})
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = Controller
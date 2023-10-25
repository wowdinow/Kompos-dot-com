const axios = require('axios')

class UserController {
    static async getData(req, res) {
        try {
            const {data} = await axios({
                url: "http://localhost:4001/users"
            })
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    static async addUser(req, res){
        try {
            await axios({
                url: "http://localhost:4001/users",
                method: "POST",
                data: req.body
            })
            res.status(201).json({message: "Success"})
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    static async deleteUser(req, res){
        try {
            await axios({
                url: 'http://localhost:4001/users/' + req.params.id,
                method: "DELETE"
            })
            res.status(200).json({message: "Success"})
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}

module.exports = UserController
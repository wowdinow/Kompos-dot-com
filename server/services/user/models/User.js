const { ObjectId } = require("mongodb")
const { getDb } = require("../config/mongoConnection")
const { hashPass } = require("../helpers/bcrypt")


class User{
    
    static async findAll(){
        try {
            const db = getDb()
            const user = db.collection("c")
            const data = await user.find().toArray()
            return data
        } catch (err) {
            console.log(err);
        }
    }

    static async create({username, email, password, phoneNumber, address}){
        try {
            const db = getDb()
            const user = db.collection('c')
            const hashedPass = hashPass(password)
            await user.insertOne({username, email, password: hashedPass, role: 'admin', phoneNumber, address})
        } catch (err) {
            console.log(err);
        }
    }

    static async findByPk(id){
        try {
            const db = getDb()
            const user = db.collection('c')
            const data = await user.findOne({ _id: new ObjectId(id) })
            return data
        } catch (err) {
            console.log(err);
        }
    }

    static async destroy(id){
        try {
            const db = getDb()
            const user = db.collection('c')
            await user.deleteOne({ _id: new ObjectId(id) })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = User
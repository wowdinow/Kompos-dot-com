'use strict';

const { hashPass } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const user = require('../db.json').users.map((el) => {
    delete el.id
    el.password = hashPass(el.password)
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
   })

   const category = require('../db.json').categories.map((el) => {
    delete el.id
    el.createdAt = new Date()
    el.updatedAt = new Date()
    
    return el
   })

   const post = require('../db.json').posts.map((el) => {
    delete el.id
    el.slug = el.title.toLowerCase().split(" ").join("-")
    el.createdAt = new Date()
    el.updatedAt = new Date()
    el.userMongoId = "652e43c693c2f2603608ada3"
    return el
   })

   const tag = require('../db.json').tags.map((el) => {
    delete el.id
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
   })

   await queryInterface.bulkInsert("Users", user, {})
   await queryInterface.bulkInsert("Categories", category, {})
   await queryInterface.bulkInsert("Posts", post, {})
   await queryInterface.bulkInsert("Tags", tag, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
    await queryInterface.bulkDelete("Tags", null, {})
    await queryInterface.bulkDelete("Posts", null, {})
    await queryInterface.bulkDelete("Categories", null, {})
    await queryInterface.bulkDelete("Users", null, {})
  }
};

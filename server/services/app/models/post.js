'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category, {foreignKey: "categoryId"})
      Post.hasMany(models.Tag, {foreignKey: "postId"})
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Title is required"},
        notEmpty: {msg: "Title is required"}
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {msg: "Content is required"},
        notEmpty: {msg: "Content is required"}
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
    
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Categories"
        }
      },
      key: "id"
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Users"
        },
        key: "id"
      }
    },
    userMongoId: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeValidate: (post) => {
        post.slug = post.title.toLowerCase().split(" ").join("-")
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
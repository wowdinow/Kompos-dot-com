"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {msg: "Email must be unique"},
        validate: {
          notNull: {msg: "Email is required"},
          notEmpty: {msg: "Email is required"},
          isEmail: {msg: "Please input email format"}
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: "Password is required"},
          notEmpty: {msg: "Password is required"},
          len: {
            args: [5],
            msg: "Password minimal 5 characters"
          }
        }
      },
      role: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPass(user.password);
          user.role = "admin"
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

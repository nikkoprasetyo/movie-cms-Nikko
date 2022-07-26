"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Username cannot be empty"
          },
          notNull: {
            args: true,
            msg: "Username can not be null"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: "Format email is invalid"
          },
          notEmpty: {
            args: true,
            msg: "Email cannot be empty"
          },
          notNull: {
            args: true,
            msg: "Email can not be null"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password cannot be empty"
          },
          notNull: {
            args: true,
            msg: "Password can not be null"
          }
        }
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          user.password = hashingPassword(user.password)
        }
      }
    }
  );
  return User;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: "UserId" })
      Movie.hasMany(models.History, { foreignKey: "MovieId" })
      Movie.belongsToMany(models.Genre, {
        through: "MovieGenres",
        foreignKey: "MovieId"
      })
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    trailerUrl: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
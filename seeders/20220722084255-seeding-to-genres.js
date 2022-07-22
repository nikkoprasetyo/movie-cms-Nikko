'use strict';

let genresJson = require('../jsonForSeeding/genres.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Genres', genresJson.map(genre => {
      genre.createdAt = new Date()
      genre.updatedAt = new Date()
      return genre
    }), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};

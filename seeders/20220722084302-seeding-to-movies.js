'use strict';

let movieJson = require('../jsonForSeeding/movies.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Movies', movieJson.map(movie => {
      movie.createdAt = new Date()
      movie.updatedAt = new Date()
      return movie
    }), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};

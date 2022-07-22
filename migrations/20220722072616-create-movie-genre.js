'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MovieGenres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GenreId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Genres",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      MovieId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Movies",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MovieGenres');
  }
};
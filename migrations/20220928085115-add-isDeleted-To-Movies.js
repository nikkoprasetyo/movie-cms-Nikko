'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addColumn('Movies', "isDeleted", {
       type: Sequelize.DataTypes.BOOLEAN, 
       defaultValue: false,
       allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.removeColumn('Movies', 'isDeleted', {});
  }
};

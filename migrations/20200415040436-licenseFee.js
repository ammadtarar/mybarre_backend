'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    // */
    // return Promise.all([
    //   queryInterface.addColumn(
    //     'memberships',
    //     'license_fee',
    //     Sequelize.FLOAT
    //   )
    // ]);
  },

  down: (queryInterface, Sequelize) => {
    /*zss
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

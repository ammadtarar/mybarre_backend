'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    // return Promise.all([
    //   queryInterface.addColumn(
    //     'user_bundles',
    //     'out_trade_no',
    //     Sequelize.STRING
    //   ),
    //   queryInterface.addColumn(
    //     'user_bundles',
    //     'price',
    //     Sequelize.INTEGER
    //   )
    // ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

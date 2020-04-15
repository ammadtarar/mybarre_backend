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
    //   queryInterface.createTable('configs', {
    //     video_emails_notifications_days_in_advance: {
    //       type: Sequelize.INTEGER,
    //       allowNull: true,
    //       defaultValue: 30
    //     },
    //     video_emails_notifications_frequency_days: {
    //       type: Sequelize.INTEGER,
    //       allowNull: true,
    //       defaultValue: 5
    //     }
    //   })
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

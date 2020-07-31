'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable(
                'license_renewals', {
                    id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    createdAt: {
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DATE
                    },
                    userId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {
                            model: 'users',
                            key: 'id'
                        },
                        onUpdate: 'cascade',
                        onDelete: 'cascade'
                    },
                    courseId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {
                            model: 'courses',
                            key: 'id'
                        },
                        onUpdate: 'cascade',
                        onDelete: 'cascade'
                    },
                    membershipId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {
                            model: 'memberships',
                            key: 'id'
                        },
                        onUpdate: 'cascade',
                        onDelete: 'cascade'
                    },
                    amount: {
                        type: Sequelize.FLOAT,
                        allowNull: false
                    },
                    out_trade_no: {
                        type: Sequelize.STRING,
                        allowNull: true
                    },
                    start: {
                        type: Sequelize.DATE,
                        allowNull: true
                    },
                    end: {
                        type: Sequelize.DATE,
                        allowNull: true
                    },
                }, {
                    comment: 'Record of all the license renewals'
                }
            )
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([]);
    }
};
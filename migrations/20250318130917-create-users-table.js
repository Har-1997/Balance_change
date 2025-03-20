'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async () => {
    const queryInterface = sequelize.getQueryInterface();

    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    // add user with a balance of 10000
    await queryInterface.bulkInsert('Users', [{
      name: 'user',
      balance: 10000,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};

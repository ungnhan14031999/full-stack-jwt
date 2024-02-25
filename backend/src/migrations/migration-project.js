'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {

    // : DataTypes.STRING,
    // : DataTypes.STRING,
    // : DataTypes.STRING,
    // : DataTypes.INTEGER,
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Project', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      passworde: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Project');
  }
};
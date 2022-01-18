'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Users', [
      {
        username: 'user1',
        password:'$2b$10$9zwmF4fmwwBJw5s4d4us2ui9r0H1uMMnFFw87UeG0qbIokx0yrJMO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user2',
        password:'$2b$10$9zwmF4fmwwBJw5s4d4us2ui9r0H1uMMnFFw87UeG0qbIokx0yrJMO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ], {});
    },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

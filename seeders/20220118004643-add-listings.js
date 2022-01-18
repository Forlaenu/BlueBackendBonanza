'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Listings', [
      {
        own: true,
        condition: 5,
        frontUrl: "",
        backUrl: "",
        spineUrl: "",
        BookId: 3,
        UserId: 1,
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

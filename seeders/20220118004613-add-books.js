'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Beloved',
        author: 'Toni Morrison',
        isbn: 9781400033416,
        apiId: 'bm-KDQAAQBAJ',
        imgUrl: 'http://books.google.com/books/content?id=bm-KDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        blurb: "Sethe, an escaped slave living in post-Civil War Ohio with her daughter and mother-in-law, is haunted persistently by the ghost of the dead baby girl whom she sacrificed, in a new edition of the Nobel Laureate's Pulitzer Prize-winning novel ...",
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

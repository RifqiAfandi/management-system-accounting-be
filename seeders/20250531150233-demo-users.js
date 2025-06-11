'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPasswords = await Promise.all([
      bcrypt.hash('admin123', 10)
    ]);
    
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        username: 'admin',
        password: hashedPasswords[0],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

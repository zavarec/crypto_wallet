const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Хеширование пароля
    const hashedPassword = await bcrypt.hash('1234', 10); // Замените 'ваш_пароль' на желаемый пароль

    // Создание пользователя
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'admin',
          email: 'admin@gmail.com',
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    // Создание рынка ByBit
    await queryInterface.bulkInsert(
      'Markets',
      [
        {
          name: 'ByBit',
          img: 'https://www.svgrepo.com/show/331331/bybit.svg', // Замените на путь к изображению логотипа ByBit
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    // Здесь вы можете добавить ключи API, если это необходимо
    // Пример:
    await queryInterface.bulkInsert(
      'ApiKeys',
      [
        {
          name: 'Sasha',
          user_id: 1,
          market_id: 1,
          api_key: 'grcX95pZ9HY8ZdQDjt',
          api_secret: 'wMdj3RoJdTdCyT9VJyq92I0h7uGQVKtQQbVY',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    // Удаление данных
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Markets', null, {});
    // Если вы добавили ApiKeys, убедитесь, что также удаляете и их
    await queryInterface.bulkDelete('ApiKeys', null, {});
  },
};

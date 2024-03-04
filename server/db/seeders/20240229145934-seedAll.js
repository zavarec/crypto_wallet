/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Markets',
      [
        {
          name: 'Binance',
          img: 'https://static.coinstats.app/portfolio_images/binance_dark.png',
        },
        {
          name: 'MetaMask',
          img: 'https://static.coinstats.app/portfolio_images/metamask_dark.png',
        },
        {
          name: 'Coinbase',
          img: 'https://static.coinstats.app/portfolio_images/coinbase_dark.png',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Markets', null, {});
  },
};

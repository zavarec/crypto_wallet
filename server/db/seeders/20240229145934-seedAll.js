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
        {
          name: 'Other',
          img: 'https://coinstats.app/_next/static/images/connect-…er-portfolio-b28d2ed65a4aca0d27acea0dbc5d0a66.svg',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Markets', null, {});
  },
};

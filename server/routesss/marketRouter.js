const express = require('express');
const axios = require('axios');
const { Favorite } = require('../db/models');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');
// const { get } = require('./stockRouter');

const marketRouter = express.Router();

marketRouter.post('/:id', verifyRefreshToken, async (req, res) => {
  const { id } = req.params;
  const userId = res.locals.user.id;
  const favorite = await Favorite.findOrCreate({ where: { ticket_name: id, user_id: userId } });
  console.log(favorite[0]);
  res.json(favorite[0]);
});

marketRouter.delete('/:id', verifyRefreshToken, async (req, res) => {
  const { id } = req.params;
  const userId = res.locals.user.id;
  const resor = await Favorite.findOne({ where: { ticket_name: id, user_id: userId } });
  await Favorite.destroy({ where: { ticket_name: id, user_id: userId } });
  console.log(resor);
  res.json(resor);
});

// marketRouter.delete('/:id', verifyRefreshToken, async (req, res) => {
//   const { id } = req.params;
//   const userId = res.locals.user.id;
//   await Favorite.destroy({ where: { ticket_name: id, user_id: userId } });
//   res.json({ message: 'Deleted' });
// });

const getCoins = async () => {
  const options = {
    withCredentials: false,
    headers: {
      'x-access-token': 'coinrankingf2feec4806319864613f9ab90a808cafc0538eb1d42c5cb8',
    },
  };
  const response = await axios.get('https://api.coinranking.com/v2/coins', options);

  return response;
};

// getCoins().then((res) => console.log(res));

// getCoins().catch((err) => {
//   const { response } = err;
//   console.log(response.data, response.status, response.headers);
// });

marketRouter.get('/', verifyRefreshToken, async (req, res) => {
  const userId = res.locals.user.id;
  const favorites = await Favorite.findAll({ where: { user_id: userId } });
  const { data } = await getCoins();
  //   console.log(data);

  const result = {
    coins: data.data.coins.filter(
      (coin) => !favorites.find((fav) => fav.ticket_name === coin.uuid),
    ),
    favorites: data.data.coins.filter((coin) =>
      favorites.find((fav) => fav.ticket_name === coin.uuid),
    ),
  };

  res.json(result);
});

marketRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  // Далее обработка запроса, например, загрузка данных по указанному идентификатору
  res.send(`Requesting data for market with ID: ${id}`);
});

module.exports = marketRouter;

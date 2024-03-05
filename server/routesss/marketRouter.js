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
  res.json(favorite);
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
      'x-access-token': 'coinrankingbbebd95a3b3f78ba54057c7b78c54a6c30f60ea74b6a6f0e',
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
    favorites: data.data.coins.filter((coin) => {
      favorites.find((fav) => fav.ticket_name === coin.uuid);
    }),
  };
console.log(result);
  res.json(result);
});

module.exports = marketRouter;

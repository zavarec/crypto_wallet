const express = require('express');
const { ApiKey } = require('../db/models');

const apiKeysRouter = express.Router();

// apiKeysRouter.route('/market/:id').get(async (req, res) => {
//   const { id } = req.params;
//   if (Number.isNaN(id)) {
//     res.status(401).json({ message: 'wrong market id' });
//   }
//   try {
//     const apis = await ApiKey.findAll({
//       where: {
//         market_id: id,
//       },
//     });

//     res.json(apis);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

apiKeysRouter.route('/').post(async (req, res) => {
  const { name, api_key, api_secret, market_id, user_id } = req.body;
  console.log(req.body);
  if (!name || !api_key || !api_secret || !user_id || !market_id) {
    res.status(401).json({ message: 'wrong api data' });
    return;
  }

  try {
    const newApi = await ApiKey.create({
      name,
      api_key,
      api_secret,
      market_id,
      user_id,
    });

    res.status(200).json(newApi);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = apiKeysRouter;

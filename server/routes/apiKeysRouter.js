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
  // console.log(req.body);
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

apiKeysRouter.route('/all').get(async (req, res) => {
  const apis = await ApiKey.findAll();
  res.json(apis);
});

apiKeysRouter.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { name, api_key, api_secret } = req.body;
  if (Number.isNaN(id)) {
    res.status(401).json({ message: 'wrong api id' });
  }
  if (!name || !api_key || !api_secret) {
    res.status(401).json({ message: 'wrong api data' });
    return;
  }

  try {
    const api = await ApiKey.findOne({
      where: {
        id,
      },
    });

    if (!api) {
      res.status(404).json({ message: 'api not found' });
      return;
    }

    api.name = name;
    api.api_key = api_key;
    api.api_secret = api_secret;

    await api.save();

    res.json(api);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

apiKeysRouter.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(id)) {
    res.status(401).json({ message: 'wrong api id' });
  }
  try {
    await ApiKey.destroy({
      where: {
        id,
      },
    });

    res.json(id);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = apiKeysRouter;

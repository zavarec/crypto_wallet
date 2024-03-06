const express = require('express');
const { ApiKey } = require('../db/models');
const { httpRequest } = require('../utils/exchangeConnection');

const bybitRouter = express.Router();

// Маршрут для получения баланса
bybitRouter.get('/', async (req, res) => {
  try {
    // Получаем данные пользователя из middleware или используем ID пользователя 1 для разработки
    const userId = res.locals.user ? res.locals.user.id : 1;

    const userApiKeys = await ApiKey.findOne({ where: { user_id: userId } });

    if (!userApiKeys) {
      return res.status(404).json({ message: 'API ключ не найден' });
    }

    const { apiKey, apiSecret } = userApiKeys; // Деструктуризация для получения ключей

    const endpoint = '/v5/account/wallet-balance';
    const params = { accountType: 'UNIFIED' };
    const response = await httpRequest(endpoint, 'GET', params, 'Wallet Balance', apiKey, apiSecret);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = bybitRouter;

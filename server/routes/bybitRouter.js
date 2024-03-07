const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const { ApiKey } = require('../db/models');
const { http_request } = require('../utils/exchangeConnection');

const bybitRouter = express.Router();

// Маршрут для получения баланса
bybitRouter.get('/balance', async (req, res) => {
  try {
    // Получаем данные пользователя из middleware или используем ID пользователя 1 для разработки
    const userId = res.locals.user ? res.locals.user.id : 1;

    const userApiKeys = await ApiKey.findOne({ where: { user_id: userId } });

    if (!userApiKeys) {
      return res.status(404).json({ message: 'API ключ не найден' });
    }

    const { api_key, api_secret } = userApiKeys; // Деструктуризация для получения ключей

    const endpoint = '/v5/account/wallet-balance';
    const params = { accountType: 'UNIFIED' };
    const response = await http_request(
      endpoint,
      'GET',
      params,
      'Wallet Balance',
      api_key,
      api_secret,
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = bybitRouter;

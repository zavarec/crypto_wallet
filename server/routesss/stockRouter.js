const express = require('express');
const { Market } = require('../db/models');

const stockRouter = express.Router();

stockRouter.get('/', async (req, res) => {
  const stocks = await Market.findAll();
  res.json(stocks);
});

module.exports = stockRouter;

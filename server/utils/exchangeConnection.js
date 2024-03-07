const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const url = process.env.BYBIT_EXCHANGE_BASE_URL;
const recvWindow = 5000;

function getSignature(parameters, apiKey, secret) {
  const queryString = Object.entries(parameters)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto
    .createHmac('sha256', secret)
    .update(`${parameters.timestamp}${apiKey}${recvWindow}${queryString}`)
    .digest('hex');
}

async function http_request(endpoint, method, params, Info, apiKey, secret) {
  const timestamp = Date.now().toString();
  const data = {
    ...params,
    timestamp,
  };

  const sign = getSignature(data, apiKey, secret);
  let fullendpoint = url + endpoint;

  if (method === 'GET') {
    fullendpoint += `?${new URLSearchParams(data).toString()}`;
  }

  const headers = {
    'X-BAPI-SIGN-TYPE': '2',
    'X-BAPI-SIGN': sign,
    'X-BAPI-API-KEY': apiKey,
    'X-BAPI-TIMESTAMP': timestamp,
    'X-BAPI-RECV-WINDOW': recvWindow.toString(),
  };

  if (method === 'POST') {
    headers['Content-Type'] = 'application/json; charset=utf-8';
  }

  const config = {
    method,
    url: fullendpoint,
    headers,
  };

  if (method === 'POST') {
    config.data = JSON.stringify(data);
  }

  console.log(`${Info} Calling....`);
  return axios(config);
}

module.exports = { http_request };

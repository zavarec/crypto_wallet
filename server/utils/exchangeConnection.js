const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const url = process.env.BYBIT_EXCHANGE_BASE_URL;
const recvWindow = 5000;

function getSignature(parameters, secret) {
  const timestamp = Date.now().toString();
  const queryString = Object.entries(parameters).map(([key, value]) => `${key}=${value}`).join('&');
  return crypto.createHmac('sha256', secret).update(`${timestamp}${parameters.api_key}${recvWindow}${queryString}`).digest('hex');
}

async function http_request(endpoint, method, params, Info, apiKey, secret) {
  const timestamp = Date.now().toString();
  const data = {
    ...params,
    api_key: apiKey,
    timestamp,
    recv_window: recvWindow,
  };
  const sign = getSignature(data, secret);
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

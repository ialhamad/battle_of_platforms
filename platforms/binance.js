const axios = require("axios");
const _ = require('lodash');

function get() {
  return axios.get("https://api.binance.com/api/v1/ticker/24hr")
    .then(response => response.data)
    .then(data => _binanceFilter(data))
    .then(result => result).catch(e => {
      console.error(e)
    });
}

function _binanceFilter(data) {
  let modifiedData = [];
  data.filter(coin => {
    return coin.symbol.endsWith('BTC');
  })
    .map(coin => {
      coin.symbol = coin.symbol;
      coin.ask = coin.askPrice;
      coin.bid = coin.bidPrice;
      coin.vol = coin.volume;
      coin.pf = 'binance';
      modifiedData.push(_.pick(coin, ['pf', 'symbol', 'ask', 'bid', 'vol']));
    });
  return modifiedData;
}

module.exports = {
  binance: {
    get: get
  }
}
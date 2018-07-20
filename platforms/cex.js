const axios = require("axios");
const _ = require('lodash');

function get() {
  return axios.get("https://cex.io/api/tickers/BTC")
    .then(response => response.data)
    .then(data => _cexFilter(data.data))
    .then(result => result).catch(e => {
      console.error(e)
    });
}

function _cexFilter(data) {
  let modifiedData = [];
  data.map(coin => {
    coin.symbol = coin.pair.replace(':', '');
    coin.ask = coin.ask;
    coin.bid = coin.bid;
    coin.vol = coin.volume;
    coin.pf = 'cex';
    modifiedData.push(_.pick(coin, ['pf', 'symbol', 'ask', 'bid', 'vol']));
  });
  return modifiedData;
}

module.exports = {
  cex: {
    get: get
  }
}
const axios = require("axios");
const _ = require('lodash');

function get() {
  return axios.get("https://api.hitbtc.com/api/2/public/ticker")
    .then(response => response.data)
    .then(data => _hitbtcFilter(data))
    .then(result => result).catch(e => {
      console.error(e)
    });
}

function _hitbtcFilter(data) {
  let modifiedData = [];
  data.filter(coin => {
    return coin.symbol.endsWith('BTC');
  })
    .map(coin => {
      coin.symbol = coin.symbol;
      coin.ask = coin.ask;
      coin.bid = coin.bid;
      coin.vol = coin.volume;
      coin.pf = 'hitbtc';
      modifiedData.push(_.pick(coin, ['pf', 'symbol', 'ask', 'bid', 'vol']));
    });
  return modifiedData;
}

module.exports = {
  hitbtc: {
    get: get
  }
}
const axios = require("axios");
const _ = require('lodash');

function get() {
  return axios.get("https://api.kucoin.com/v1/market/open/symbols")
    .then(response => response.data)
    .then(data => _kucoinFilter(data.data))
    .then(result => result).catch(e => {
      console.error(e)
    });
}

function _kucoinFilter(data) {
  let modifiedData = [];
  data.filter(coin => {
    return coin.symbol.endsWith('BTC');
  })
    .map(coin => {
      coin.symbol = coin.symbol.replace("-", "");
      coin.ask = coin.sell;
      coin.bid = coin.buy;
      coin.vol = coin.vol;
      coin.pf = 'kucoin';
      modifiedData.push(_.pick(coin, ['pf', 'symbol', 'ask', 'bid', 'vol']));
    });
  return modifiedData;
}

module.exports = {
  kucoin: {
    get: get
  }
}
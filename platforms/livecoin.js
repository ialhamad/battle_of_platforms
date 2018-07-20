const axios = require("axios");
const _ = require('lodash');

function get() {
  return axios.get("https://api.livecoin.net/exchange/ticker")
    .then(response => response.data)
    .then(data => _livecoinFilter(data))
    .then(result => result).catch(e => {
      console.error(e)
    });
}

function _livecoinFilter(data) {
  let modifiedData = [];
  const filteredData = data.filter(coin => {
    return coin.symbol.endsWith('BTC');
  })
    .map(coin => {
      coin.symbol = coin.symbol.replace("/", "");
      coin.ask = coin.min_ask;
      coin.bid = coin.max_bid;
      coin.vol = coin.volume;
      coin.pf = 'livecoin';
      modifiedData.push(_.pick(coin, ['pf', 'symbol', 'ask', 'bid', 'vol']));
    });
  return modifiedData;
}

module.exports = {
  livecoin: {
    get: get
  }
}
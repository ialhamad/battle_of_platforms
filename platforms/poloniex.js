const axios = require("axios");
const _ = require('lodash');

function get() {
  return axios.get("https://poloniex.com/public?command=returnTicker")
    .then(response => response.data)
    .then(data => _poloniexFilter(data))
    .then(result => result).catch(e => {
      console.error(e)
    });
}

function _poloniexFilter(data) {
  let modifiedData = [];
  const filteredData = _.filter(data, (coin, text) => {
    if (text.startsWith('BTC')) {
      coin.symbol = text.replace('_', '').replace('BTC', '') + 'BTC';
      return coin;

    }
  });
  _.map(filteredData, (coin, text) => {
    coin.ask = coin.lowestAsk;
    coin.bid = coin.highestBid;
    coin.vol = coin.baseVolume;
    coin.pf = 'poloniex';
    modifiedData.push(_.pick(coin, ['pf', 'symbol', 'ask', 'bid', 'vol']));
  });
  return modifiedData;
}

module.exports = {
  poloniex: {
    get: get
  }
}
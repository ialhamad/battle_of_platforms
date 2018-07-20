const axios = require("axios");
const _ = require('lodash');

function get() {
  return axios.get("https://bittrex.com/api/v1.1/public/getmarketsummaries")
    .then(response => response.data)
    .then(data => _bitTrexFilter(data.result))
    .then(result => result).catch(e => {
      console.error(e)
    });
}

function _bitTrexFilter(data) {
  let modifiedData = [];
  const filteredData = data.filter(coin => {
    return coin.MarketName.startsWith('BTC');
  })
    .map(coin => {
      coin.symbol = coin.MarketName.replace('-', '').replace('BTC', '') + 'BTC';
      coin.ask = coin.Ask;
      coin.bid = coin.Bid;
      coin.vol = coin.Volume;
      coin.pf = 'bittrex';
      modifiedData.push(_.pick(coin, ['pf', 'symbol', 'ask', 'bid', 'vol']));
    });
  return modifiedData;
}

module.exports = {
  bitTrex: {
    get: get
  }
}
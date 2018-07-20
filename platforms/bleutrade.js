const axios = require("axios");
const _ = require('lodash');

function get() {
  return axios.get("https://bleutrade.com/api/v2/public/getmarketsummaries")
    .then(response => response.data)
    .then(data => _bleutradeFilter(data.result))
    .then(result => result).catch(e => {
      console.error(e)
    });
}

function _bleutradeFilter(data) {
  let modifiedData = [];
  data.filter(coin => {
    return coin.MarketName.endsWith('BTC');
  })
    .map(coin => {
      coin.symbol = coin.MarketName.replace("_", "");
      coin.ask = coin.Ask;
      coin.bid = coin.Bid;
      coin.vol = coin.Volume;
      coin.pf = 'bleutrade';
      modifiedData.push(_.pick(coin, ['pf', 'symbol', 'ask', 'bid', 'vol']));
    });
  return modifiedData;
}

module.exports = {
  bleutrade: {
    get: get
  }
}
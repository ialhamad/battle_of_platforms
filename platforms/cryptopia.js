const axios = require("axios");
const _ = require('lodash');

function get() {
  return axios.get("https://www.cryptopia.co.nz/api/GetMarkets")
    .then(response => response.data)
    .then(data => _cryptopiaFilter(data.Data))
    .then(result => result).catch(e => {
      console.error(e)
    });
}


function _cryptopiaFilter(data) {
  let modifiedData = [];
  const filteredData = data.filter(coin => {
    return coin.Label.endsWith('BTC');
  })
    .map(coin => {
      coin.symbol = coin.Label.replace("/", "");
      coin.ask = coin.AskPrice;
      coin.bid = coin.BidPrice;
      coin.vol = coin.Volume;
      coin.pf = 'cryptopia';
      modifiedData.push(_.pick(coin, ['pf', 'symbol', 'ask', 'bid', 'vol']));
    });
  return modifiedData;
}

module.exports = {
  cryptopia: {
    get: get
  }
}
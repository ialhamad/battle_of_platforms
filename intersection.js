const _ = require('lodash');

const { livecoin } = require('./platforms/livecoin');
const { cryptopia } = require('./platforms/cryptopia');
const { bitTrex } = require('./platforms/bittrex');
const { poloniex } = require('./platforms/poloniex');
const { kucoin } = require('./platforms/kucoin');
const { binance } = require('./platforms/binance');
const { bleutrade } = require('./platforms/bleutrade');
const { hitbtc } = require('./platforms/hitbtc');
const { cex } = require('./platforms/cex');

module.exports.findIntersections = async (platform1, platform2, diffPerc = 0) => {
  let firstPlatform = await getPlatform(platform1);
  let secondPlatform = await getPlatform(platform2);

  let coinsIntersection = _.intersectionBy(firstPlatform, secondPlatform, _.property(['symbol']));
  const comparableInters = _.map(coinsIntersection, coin => {
    return _.pick(coin, ['symbol']);
  });

  let matchedData = [];
  _.forEach(comparableInters, item => {
    const platform1 = _.find(firstPlatform, _.matchesProperty('symbol', item.symbol));
    const platform2 = _.find(secondPlatform, _.matchesProperty('symbol', item.symbol));

    const firstToSecond = (100 - ((platform1.ask / platform2.bid) * 100));
    const secondToFirst = (100 - ((platform2.ask / platform1.bid) * 100));

    if (firstToSecond >= diffPerc) {
      matchedData.push({
        which: '1<2',
        coin: item.symbol,
        platform1,
        platform2,
        diff: Math.round(firstToSecond)
      })
    }

    else if (secondToFirst >= diffPerc) {
      matchedData.push({
        which: '2<1',
        coin: item.symbol,
        platform1,
        platform2,
        diff: Math.round(secondToFirst)
      })
    }
  });
  return matchedData
}

async function getPlatform(name) {
  switch (name) {
    case 'cryptopia':
      let cryptopiaResults = await cryptopia.get();
      return _.sortBy(cryptopiaResults, _.property('symbol'));
    case 'livecoin':
      let livecoinResults = await livecoin.get();
      return _.sortBy(livecoinResults, _.property('symbol'));
    case 'bittrex':
      let bitTrexResults = await bitTrex.get();
      return _.sortBy(bitTrexResults, _.property('symbol'));
    case 'poloniex':
      let poloniexResults = await poloniex.get();
      return _.sortBy(poloniexResults, _.property('symbol'));
    case 'kucoin':
      let kucoinResults = await kucoin.get();
      return _.sortBy(kucoinResults, _.property('symbol'));
    case 'binance':
      let binanceResults = await binance.get();
      return _.sortBy(binanceResults, _.property('symbol'));
    case 'bleutrade':
      let bleutradeResults = await bleutrade.get();
      return _.sortBy(bleutradeResults, _.property('symbol'));
    case 'hitbtc':
      let hitbtcResults = await hitbtc.get();
      return _.sortBy(hitbtcResults, _.property('symbol'));
    case 'cex':
      let cexResults = await cex.get();
      return _.sortBy(cexResults, _.property('symbol'));
    default:
      return null;
  }
}

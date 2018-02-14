import cc from 'cryptocompare';
import _ from 'lodash';

export const allCoins = async () => {
  const { Data } = await cc.coinList();
  return _.orderBy(Data, ['Symbol']);
};

export const priceHistory = async (symbol) => {
  const data = await cc.histoDay(symbol, 'USD', { limit: 'none' });
  console.log(data);
};

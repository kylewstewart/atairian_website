import _ from 'lodash';
import { coinList, histoDay } from '../Adaptors';

export const allCoins = async () => {
  const { Data } = await coinList();
  return _.orderBy(Data, ['Symbol']);
};

export const priceHistory = async (symbol) => {
  const data = await histoDay(symbol, 'USD', { limit: 'none' });
  return data;
};

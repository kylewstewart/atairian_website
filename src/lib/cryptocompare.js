import cc from 'cryptocompare';
import _ from 'lodash';

const allCoins = async () => {
  const { Data } = await cc.coinList();
  return _.orderBy(Data, ['Symbol']);
};

export default allCoins;

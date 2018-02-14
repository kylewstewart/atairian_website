const baseUrl = 'https://min-api.cryptocompare.com/data/';

const fetchJSON = url => (
  fetch(url)
    .then(res => res.json())
    .then((body) => {
      if (body.Response === 'Error') throw body.Message;
      return body;
    })
);

const dateToTimestamp = (date) => {
  if (!(date instanceof Date)) throw new Error('timestamp must be an instance of Date.');
  return Math.floor(date.getTime() / 1000);
};


export const coinList = () => {
  const url = `${baseUrl}all/coinlist`;
  return fetchJSON(url);
};

export const exchangeList = () => {
  const url = `${baseUrl}all/exchanges`;
  return fetchJSON(url);
};

export const price = (fsym, tsyms, options = {}) => {
  let url = `${baseUrl}price?fsym=${fsym}&tsyms=${tsyms}`;
  if (options.exchanges) url += `&e=${options.exchanges}`;
  if (options.tryConversion === false) url += '&tryConversion=false';
  return fetchJSON(url);
};

export const priceMulti = (fsyms, tsyms, options = {}) => {
  let url = `${baseUrl}pricemulti?fsyms=${fsyms}&tsyms=${tsyms}`;
  if (options.exchanges) url += `&e=${options.exchanges}`;
  if (options.tryConversion === false) url += '&tryConversion=false';
  return fetchJSON(url);
};

export const priceFull = (fsyms, tsyms, options = {}) => {
  let url = `${baseUrl}pricemultifull?fsyms=${fsyms}&tsyms=${tsyms}`;
  if (options.exchanges) url += `&e=${options.exchanges}`;
  if (options.tryConversion === false) url += '&tryConversion=false';
  // We want the RAW data, not the DISPLAY data:
  return fetchJSON(url).then(result => result.RAW);
};

export const priceHistorical = (fsym, tsyms, time, options = {}) => {
  const timestamp = dateToTimestamp(time);
  let url = `${baseUrl}pricehistorical?fsym=${fsym}&tsyms=${tsyms}&ts=${timestamp}`;
  if (options.exchanges) url += `&e=${options.exchanges}`;
  if (options.tryConversion === false) url += '&tryConversion=false';
  // The API returns json with an extra layer of nesting, so remove it
  return fetchJSON(url).then(result => result[fsym]);
};

export const generateAvg = (fsym, tsym, e, tryConversion) => {
  let url = `${baseUrl}generateAvg?fsym=${fsym}&tsym=${tsym}&e=${e}`;
  if (tryConversion === false) url += '&tryConversion=false';
  return fetchJSON(url).then(result => result.RAW);
};

export const topPairs = (fsym, limit) => {
  let url = `${baseUrl}top/pairs?fsym=${fsym}`;
  if (limit) url += `&limit=${limit}`;
  return fetchJSON(url).then(result => result.Data);
};

export const topExchanges = (fsym, tsym, limit) => {
  let url = `${baseUrl}top/exchanges?fsym=${fsym}&tsym=${tsym}`;
  if (limit) url += `&limit=${limit}`;
  return fetchJSON(url).then(result => result.Data);
};

export const histoDay = (fsym, tsym, options = {}) => {
  let url = `${baseUrl}histoday?fsym=${fsym}&tsym=${tsym}`;
  if (options.exchange) url += `&e=${options.exchange}`;
  if (options.limit === 'none') url += '&allData=true';
  else if (options.limit) url += `&limit=${options.limit}`;
  if (options.tryConversion === false) url += '&tryConversion=false';
  if (options.aggregate) url += `&aggregate=${options.aggregate}`;
  if (options.timestamp) url += `&toTs=${dateToTimestamp(options.timestamp)}`;
  return fetchJSON(url).then(result => result.Data);
};

export const histoHour = (fsym, tsym, options = {}) => {
  let url = `${baseUrl}histohour?fsym=${fsym}&tsym=${tsym}`;
  if (options.exchange) url += `&e=${options.exchange}`;
  if (options.limit) url += `&limit=${options.limit}`;
  if (options.tryConversion === false) url += '&tryConversion=false';
  if (options.aggregate) url += `&aggregate=${options.aggregate}`;
  if (options.timestamp) url += `&toTs=${dateToTimestamp(options.timestamp)}`;
  return fetchJSON(url).then(result => result.Data);
};

export const histoMinute = (fsym, tsym, options = {}) => {
  let url = `${baseUrl}histominute?fsym=${fsym}&tsym=${tsym}`;
  if (options.exchange) url += `&e=${options.exchange}`;
  if (options.limit) url += `&limit=${options.limit}`;
  if (options.tryConversion === false) url += '&tryConversion=false';
  if (options.aggregate) url += `&aggregate=${options.aggregate}`;
  if (options.timestamp) url += `&toTs=${dateToTimestamp(options.timestamp)}`;
  return fetchJSON(url).then(result => result.Data);
};

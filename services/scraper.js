const fetch = require('node-fetch');
const { extractRates } = require('../utils/utils');
const xRatesURL = 'https://www.x-rates.com/table/?from=LKR&amount=1';

/**
 * Fetch exchange rates from XRates Site
 *
 * @returns exchangeRateList
 */
async function fetchData() {
  //Fetching exchangeRates from xRates site
  const response = await fetch(xRatesURL);
  const text = await response.text();
  const ratesList = extractRates(text);
  return ratesList;
}

async function fetchDataByCurrency(currency) {
  //Fetching exchangeRates from xRates site
  const response = await fetch(xRatesURL);
  const text = await response.text();
  const ratesList = extractRates(text);
  const filteredList = ratesList.filter((rate) => {
    return rate.currency === currency;
  });
  return filteredList;
}

module.exports = { fetchData, fetchDataByCurrency };

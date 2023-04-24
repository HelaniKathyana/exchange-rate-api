/**
 * Extract exchage rates from given raw text
 * @param {*} text - scraped raw text
 */
function extractRates(text) {
  let ratesList = [
    {
      currency: 'LKR',
      fromLkr: 1,
      toLkr: 1,
      lastUpdated: new Date().toISOString(),
    },
  ];

  //Reg-expresions for extracting rates from raw test
  let expUSD = /(from=LKR&amp;to=USD.*<\/a>|from=USD&amp;to=LKR.*<\/a>)/g;
  let expAUD = /(from=LKR&amp;to=AUD.*<\/a>|from=AUD&amp;to=LKR.*<\/a>)/g;
  let expEUR = /(from=LKR&amp;to=EUR.*<\/a>|from=EUR&amp;to=LKR.*<\/a>)/g;
  let expGBP = /(from=LKR&amp;to=GBP.*<\/a>|from=GBP&amp;to=LKR.*<\/a>)/g;

  //Extracting rates from scraped results
  let usdRates = _extractCurrency('USD', expUSD, text);
  let audRates = _extractCurrency('AUD', expAUD, text);
  let eurRates = _extractCurrency('EUR', expEUR, text);
  let gbpRates = _extractCurrency('GBP', expGBP, text);

  //Adding fetched rates to rates array
  ratesList.push(usdRates);
  ratesList.push(audRates);
  ratesList.push(eurRates);
  ratesList.push(gbpRates);

  return ratesList;
}

/**
 * Extract exchage rates from given raw text
 *
 * @param {*} currency - currency type
 * @param {*} currencyRegex - regex to extract given currency
 * @param {*} text - scraped raw text
 * @returns exchange rate object
 */
function _extractCurrency(currency, currencyRegex, text) {
  let scraped = text.match(currencyRegex);
  let regexFloat = /[+-]?\d+(\.\d+)?/g;
  let obj = {
    currency: currency,
    fromLkr: parseFloat(scraped[0].match(regexFloat)[0]),
    toLkr: parseFloat(scraped[1].match(regexFloat)[0]),
    lastUpdated: new Date().toISOString(),
  };
  return obj;
}

module.exports = { extractRates };

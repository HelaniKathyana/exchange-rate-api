const express = require('express');
const router = express.Router();
const { fetchData, fetchDataByCurrency } = require('./services/scraper');

/**
 * @swagger
 * /api/get-rates:
 *   get:
 *     summary: Retrieve all exchange rates
 *     description: Retrieve all exchange rates
 *     responses:
 *       200:
 *         description: A list of exchange rates
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateList'
 *       500:
 *         description: Server error
 */
router.get('/get-rates', async (req, res) => {
  try {
    const rateList = await fetchData();
    res.json({ status: 200, message: rateList });
  } catch (error) {
    return res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/get-rates/{currency}:
 *   get:
 *     summary: Retrieve exchange rates by currency
 *     description: Retrieve exchange rates by currency
 *     parameters:
 *       - in: path
 *         name: currency
 *         description: Currency code (e.g. USD, EUR)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of exchange rates for the given currency
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateList'
 *       500:
 *         description: Server error
 */
router.get('/get-rates/:currency', async (req, res) => {
  try {
    const currency = req.params.currency;
    const rateList = await fetchDataByCurrency(currency);
    res.json({ status: 200, message: rateList });
  } catch (error) {
    return res.status(500).send('Server error');
  }
});

module.exports = router;

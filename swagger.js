const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const router = express.Router();

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Exchange Rates API',
    version: '1.0.0',
    description: 'API for retrieving exchange rates',
  },
  components: {
    schemas: {
      RateList: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            currency: {
              type: 'string',
            },
            fromLkr: {
              type: 'number',
            },
            toLkr: {
              type: 'number',
            },
            lastUpdated: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./api.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Serve swagger docs
router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Serve swagger UI
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;

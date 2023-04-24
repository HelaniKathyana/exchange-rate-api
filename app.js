const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;

// Import the API routes from api.js
const apiRoutes = require('./api');
const swaggerUi = require('./swagger');

app.use(cors());

// Mount the API routes at the /api endpoint
app.use('/api', apiRoutes);
app.use('/api-docs', swaggerUi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

require('dotenv').config();
const express = require('express');
const { authMiddleware } = require('../utils/auth');
const db = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(authMiddleware);
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server is live on PORT ${PORT}`);
  });
});
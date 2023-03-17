require('dotenv').config();
const express = require('express');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3002;

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server is live on PORT ${PORT}`);
  });
});
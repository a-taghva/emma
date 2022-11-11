require('dotenv').config();
const express = require('express');
const db = require('./config/connection');

const PORT = process.env.PORT;
const app = express();

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
  })
})
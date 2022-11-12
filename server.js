require('dotenv').config();
const express = require('express');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(authMiddleware);

app.use(require('./routes'));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
  })
})
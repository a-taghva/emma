const router = require('express').Router();
const { Admin } = require('../models');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  let admin;
  try {
    admin = await Admin.create({ username, password });
  } catch(error) {
    return res.send({ 'message': 'failed to create user', error });
  }

  res.status(201).json(admin);
});

router.get('/login', async(req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({username});
  if (!admin) {
    return res.status(401).json({ "message": "user is not authenticated" });
  }

  const CorrectPW = await admin.isCorrectPassword(password);
  if (!CorrectPW) {
    return res.status(401).json({ "message": "user is not authenticated" });
  };

  return res.status(200).json(admin);
});

module.exports = router;
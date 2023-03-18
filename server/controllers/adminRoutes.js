const router = require('express').Router();
const { signToken } = require('../../utils/auth');
const { Admin } = require('../models');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  let admin;
  try {
    admin = await Admin.create({ username, password });
  } catch(error) {
    return res.send({ 'message': 'failed to create user', error });
  }

  const token = signToken(admin._id, admin.username);

  res.status(201).json({ token });
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

  const token = signToken(admin._id, admin.username);

  return res.status(200).json({ token });
});

module.exports = router;
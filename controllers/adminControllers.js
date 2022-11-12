const { Admin } = require('../models');
const { signToken } = require('../utils/auth');
require('dotenv').config();

const adminControllers = {
  addAdmin({ body }, res) {
    Admin.create(body)  
      .then(dbAdminData => {
        res.json(signToken(dbAdminData));
      })
      .catch(err => res.json(err.message));
  },

  // login by ** username **
  // ****** NEED TO CHANGE LATER ******
  adminLogin(req, res) {

    // need to redirect user to another router LATER
    if (req.user) {
      res.json(req.user);
    }

    Admin.findOne({username: req.body.username})
    .select('-__v')
    .then(dbAdminData => {
      if (!dbAdminData) {
        return res.status(400).send('Incorrect credentials!');
      }

      const correctPW = dbAdminData.isCorrectPassword(req.body.password);
      if (!correctPW) {
        return res.status(400).send('Incorrect credentials!');
      }

      // ** NEEDS TO CHANGE ** MAYBE!!!
      // dbAdminData includes hashed password
      const accessToken = signToken(dbAdminData);

      res.json(accessToken);
    })
  }
    
}

module.exports = adminControllers;
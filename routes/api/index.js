const router = require('express').Router();
const adminRoutes = require('./admin-routes');
const employeeRoutes = require('./employee-routes');

router.use('/admin', adminRoutes);
router.use('/employee', employeeRoutes);

module.exports = router;
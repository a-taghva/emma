const router = require('express').Router();
const adminRouter = require('./adminRoutes');
const employeeRouter = require('./adminRoutes');

router.use('/admin', adminRouter);
router.use('/employee', employeeRouter);

module.exports = router;
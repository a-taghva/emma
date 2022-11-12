const router = require('express').Router();
const { addAdmin, adminLogin } = require('../../controllers/adminControllers');

router.route('/').post(addAdmin);
router.route('/login').post(adminLogin);

module.exports = router;
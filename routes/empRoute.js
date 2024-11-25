const router = require('express').Router();
const empControllers = require('../controllers/empLoginControllers.js');

router.post('/', empControllers.CreateUser);
router.get('/', empControllers.GetAllUsers);
router.get('/login', empControllers.GetUserValidation);

module.exports = router
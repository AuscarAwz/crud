const router = require('express').Router();
const empControllers = require('../controllers/empLoginControllers.js');

router.post('/', empControllers.CreateUser);
router.get('/', empControllers.GetAllUsers);
router.get('/login', empControllers.GetUserValidation);
router.get('/:_id', empControllers.GetUsersById);
//router.put('/:_id', empControllers.UpdateLoginUserById);

module.exports = router
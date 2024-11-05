const Router = require('hyper-express').Router;
const { register, login } = require('../controllers/authController');

const router = new Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;

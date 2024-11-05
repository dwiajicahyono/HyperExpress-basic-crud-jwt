const Router = require('hyper-express').Router;
const { addBook, listBooks, updateBook, deleteBook } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.post('/add', authMiddleware, addBook);
router.get('/list', authMiddleware, listBooks);
router.put('/update/:id', authMiddleware, updateBook);
router.delete('/delete/:id', authMiddleware, deleteBook);

module.exports = router;

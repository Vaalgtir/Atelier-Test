const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const clientCTL = require('../controlers/clients')

router.post('/', auth, clientCTL.createArticle);
router.get('/', auth, clientCTL.showAll);
router.delete('/:id', auth, clientCTL.deleteArticle)

module.exports = router;
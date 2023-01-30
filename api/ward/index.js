'use strict';

const express = require('express');
const ward = require('./ward.controller');

const router = express.Router();

router.get('/', ward.index);
router.post('/', ward.create);
router.get('/:id', ward.show);
router.put('/:id', ward.update);
router.delete('/:id', ward.remove);

module.exports = router;
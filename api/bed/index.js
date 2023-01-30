'use strict';

const express = require('express');
const bed = require('./bed.controller');

const router = express.Router();

router.get('/', bed.index);
router.post('/', bed.create);
router.get('/:id', bed.show);
router.put('/:id', bed.update);
router.delete('/:id', bed.remove);

module.exports = router;
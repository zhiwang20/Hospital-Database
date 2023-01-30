'use strict';

const express = require('express');
const operation = require('./operation.controller');

const router = express.Router();

router.get('/', operation.index);
router.post('/', operation.create);
router.get('/:id', operation.show);
router.put('/:id', operation.update);
router.delete('/:id', operation.remove);

module.exports = router;
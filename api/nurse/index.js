'use strict';

const express = require('express');
const nurse = require('./nurse.controller');

const router = express.Router();

router.get('/', nurse.index);
router.post('/', nurse.create);
router.get('/:id', nurse.show);
router.put('/:id', nurse.update);
router.delete('/:id', nurse.remove);

module.exports = router;
'use strict';

const express = require('express');
const department = require('./department.controller');

const router = express.Router();

router.get('/', department.index);
router.post('/', department.create);
router.get('/:id', department.show);
router.put('/:id', department.update);
router.delete('/:id', department.remove);

module.exports = router;
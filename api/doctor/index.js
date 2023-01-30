'use strict';

const express = require('express');
const doctor = require('./doctor.controller');

const router = express.Router();

router.get('/', doctor.index);
router.post('/', doctor.create);
router.get('/:id', doctor.show);
router.put('/:id', doctor.update);
router.delete('/:id', doctor.remove);

module.exports = router;
'use strict';

const express = require('express');
const patient = require('./patient.controller');

const router = express.Router();

router.get('/', patient.index);
router.post('/', patient.create);
router.get('/:id', patient.show);
router.put('/:id', patient.update);
router.delete('/:id', patient.remove);

module.exports = router;
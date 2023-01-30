'use strict';

const express = require('express');
const appoinment = require('./appoinment.controller');

const router = express.Router();

router.get('/', appoinment.index);
router.post('/', appoinment.create);
router.get('/:id', appoinment.show);
router.put('/:id', appoinment.update);
router.delete('/:id', appoinment.remove);

module.exports = router;
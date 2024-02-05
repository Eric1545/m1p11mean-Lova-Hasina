// src/routes/exampleRoutes.js
const express = require('express');
const ExampleController = require('../controllers/ExampleController');
// const exampleController = require('../controllers/exampleController');

const router = express.Router();

router.get('/', ExampleController.getExample);
router.post('/', ExampleController.postExample);

module.exports = router;

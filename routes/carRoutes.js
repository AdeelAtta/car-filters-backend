// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const { searchCars } = require('../controllers/carControllers');

router.get('/search', searchCars);

module.exports = router;
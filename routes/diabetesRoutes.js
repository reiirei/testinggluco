const express = require('express');
const router = express.Router();
const diabetesController = require('../controllers/diabetesController');

// Routing endpoint POST /predict
router.post('/predict', diabetesController.predictDiabetes);

module.exports = router;

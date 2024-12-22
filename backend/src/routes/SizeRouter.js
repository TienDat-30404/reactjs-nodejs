const express = require('express')
const router = express.Router()
const SizeController = require('../controller/SizeController')
router.get('/add-size', SizeController.addSize)
module.exports = router
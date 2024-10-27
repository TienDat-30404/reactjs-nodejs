const express = require('express')
const router = express.Router()
const MessageController = require('../controller/MessageController')
router.post('/add-message', MessageController.addMessage)
router.get('/get-detail-message', MessageController.GetDetailMessage)
module.exports = router

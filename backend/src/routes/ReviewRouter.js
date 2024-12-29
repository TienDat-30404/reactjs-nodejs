const express = require('express')
const router = express.Router()
const ReviewController = require('../controller/ReviewController')
router.get('/review/:_id', ReviewController.reviewProduct)
router.post('/add-review', ReviewController.addReview)
router.post('/reply-review', ReviewController.replyReview)
module.exports = router
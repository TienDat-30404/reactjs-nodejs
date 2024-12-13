const express = require('express')
const router = express.Router()
const RoleController = require('../controller/RoleController')
router.post('/add-role', RoleController.addRole)
router.get('/get-all-role', RoleController.getAllRole)
router.get('/detail-role/:_id', RoleController.detailRole )
module.exports = router

const express = require('express')
const router = express.Router()
const RoleController = require('../controller/RoleController')
router.post('/add-role', RoleController.addRole)
router.get('/get-all-role', RoleController.getAllRole)
module.exports = router

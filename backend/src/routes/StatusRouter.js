import express from 'express'
import StatusController from '../controller/StatusController.js'
const router = express.Router()
router.get('/get-all-status', StatusController.getAllStatus)
router.post('/add-status', StatusController.addStatus)
export default router
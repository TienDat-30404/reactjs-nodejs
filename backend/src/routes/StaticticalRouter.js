import express from 'express'
import StatisticalControoler from '../controller/StatisticalController.js'
const router = express.Router()
router.get('/get-sale-revenue', StatisticalControoler.getSalesRevenue)
router.get('/get-top-selling-products', StatisticalControoler.getTopSellingProducts)
router.get('/get-top-buyers', StatisticalControoler.getTopBuyers)
export default router
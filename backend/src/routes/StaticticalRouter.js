import express from 'express'
import StatisticalControoler from '../controller/StatisticalController.js'
import { authencationMiddleWare } from '../middlewares/authencationMiddleWare.js'
const router = express.Router()
router.get('/get-sale-revenue', authencationMiddleWare,  StatisticalControoler.getSalesRevenue)
router.get('/get-top-selling-products', authencationMiddleWare, StatisticalControoler.getTopSellingProducts)
router.get('/get-top-buyers', authencationMiddleWare, StatisticalControoler.getTopBuyers)
export default router
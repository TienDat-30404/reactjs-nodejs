import express from 'express'
import { SupplierController } from '../controller/SupplierController.js'
import { middlewareAddSupplier } from '../middlewares/SupplierMiddleWare.js'
const router = express.Router()
router.get('/get-all-supplier', SupplierController.getAllSupplier)
router.post('/add-supplier', middlewareAddSupplier, SupplierController.addSupplier)
router.put('/update-supplier/:idSupplier', middlewareAddSupplier, SupplierController.updateSupplier)
router.delete('/delete-supplier/:idSupplier', SupplierController.deleteSupplier)

export default router
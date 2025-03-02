import express from 'express'
import { SupplierController } from '../controller/SupplierController.js'
import { middlewareAddSupplier } from '../middlewares/SupplierMiddleWare.js'
import { authencationMiddleWare, checkPermissionRoleMiddleware } from '../middlewares/authencationMiddleWare.js';

const router = express.Router()
router.get('/get-all-supplier', authencationMiddleWare, 
checkPermissionRoleMiddleware("supplier_search"), SupplierController.getAllSupplier)

router.post('/add-supplier', authencationMiddleWare, checkPermissionRoleMiddleware("supplier_add"),
middlewareAddSupplier, SupplierController.addSupplier)

router.put('/update-supplier/:idSupplier', authencationMiddleWare, 
checkPermissionRoleMiddleware("supplier_edit"), middlewareAddSupplier, SupplierController.updateSupplier)

router.delete('/delete-supplier/:idSupplier', authencationMiddleWare, 
checkPermissionRoleMiddleware("supplier_delete"), SupplierController.deleteSupplier)

router.delete('/delete-product-of-supplier', authencationMiddleWare, SupplierController.deleteProductOfSupplier)
export default router
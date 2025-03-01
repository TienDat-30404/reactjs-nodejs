import express from 'express';
import SizeController from '../controller/SizeController.js';
import { addSizeMiddleWare } from '../middlewares/SizeMiddleWare.js';
import { authencationMiddleWare, checkPermissionRoleMiddleware } from '../middlewares/authencationMiddleWare.js';
const router = express.Router();

router.post('/add-size', authencationMiddleWare, checkPermissionRoleMiddleware("attribute_add"), addSizeMiddleWare, SizeController.addSize)
router.get('/sizes',authencationMiddleWare, checkPermissionRoleMiddleware("attribute_search"), SizeController.getAllSize)
router.put('/update-size/:id', authencationMiddleWare, checkPermissionRoleMiddleware("attribute_edit"), SizeController.updateSize)
router.delete('/delete-size/:id', authencationMiddleWare, checkPermissionRoleMiddleware("attribute_delete"), SizeController.deleteSize)
export default router
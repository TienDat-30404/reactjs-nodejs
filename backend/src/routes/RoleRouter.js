import express from 'express';
import RoleController from '../controller/RoleController.js';
import { deleteRoleMiddleWare, validateAddRoleMiddleWare, validateUpdateRoleMiddleWare } from '../middlewares/RoleMiddleWare.js';
import Role from '../model/RoleModel.js';

const router = express.Router();

router.get('/get-all-role', RoleController.getAllRole)
router.post('/add-role', validateAddRoleMiddleWare, RoleController.addRole)
router.put('/update-role/:idRole', validateUpdateRoleMiddleWare, RoleController.updateRole)
router.delete('/delete-role/:idRole', deleteRoleMiddleWare, RoleController.deleteRole)
router.get('/permissions/:idRole', RoleController.detailRole)
export default router
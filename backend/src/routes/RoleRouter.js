import express from 'express';
import RoleController from '../controller/RoleController.js';
import { deleteRoleMiddleWare, validateAddRoleMiddleWare, validateUpdateRoleMiddleWare } from '../middlewares/RoleMiddleWare.js';

const router = express.Router();

router.get('/get-all-role', RoleController.getAllRole)
router.post('/add-role', validateAddRoleMiddleWare, RoleController.addRole)
router.put('/update-role/:idRole', validateUpdateRoleMiddleWare, RoleController.updateRole)
router.delete('/delete-role/:idRole', deleteRoleMiddleWare, RoleController.deleteRole)
export default router
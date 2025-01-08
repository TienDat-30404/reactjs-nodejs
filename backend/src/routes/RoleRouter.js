import express from 'express';
import RoleController from '../controller/RoleController.js';

const router = express.Router();

router.post('/add-role', RoleController.addRole)
router.get('/get-all-role', RoleController.getAllRole)
router.get('/detail-role/:_id', RoleController.detailRole )
export default router
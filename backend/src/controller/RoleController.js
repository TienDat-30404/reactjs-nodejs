// const Role = require('../model/RoleModel')
import Role from '../model/RoleModel.js'
export default class RoleController {

    static async addRole(req, res, next)  {
        try {
            const { name } = req.body;
            const newRole = new Role({ name });
            await newRole.save();
            res.status(200).json(newRole);
        } catch (error) {
            next(error);
        }   
    }
    
    static async getAllRole(req, res, next)  {
        try 
        {
            const roles = await Role.find({})
            return res.status(200).json({roles, status : 200})
        }
        catch (error)
        {
            next(error)
        }
    }
    
    static async detailRole(req, res, next)  {
        try {
            const idRole = req.params.idRole
            const detailRole = await Role.findOne({ _id: idRole })
            if (detailRole == null) {
                return res.status(400).json({
                    message: "Fail Detail Role"
                })
            }
            return res.status(200).json({
                detailRole
            })
        }
        catch (error) {
            next(error)
        }
    }
}

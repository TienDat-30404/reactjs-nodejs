const Role = require('../model/RoleModel')
const addRole = async(req, res, next) => {
    try {
        const { name } = req.body;
        const newRole = new Role({ name });
        await newRole.save();
        res.status(200).json(newRole);
    } catch (error) {
        next(error);
    }   
}

const getAllRole = async(req, res, next) => {
    try 
    {
        const roles = await Role.find({})
        return res.status(200).json({roles})
    }
    catch (error)
    {
        next(error)
    }
}

const detailRole = async (req, res, next) => {
    try {
        const idRole = req.params.idRole
        const detailRole = await Role.findOne({ idRole: idRole })
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
module.exports = {addRole, getAllRole, detailRole}
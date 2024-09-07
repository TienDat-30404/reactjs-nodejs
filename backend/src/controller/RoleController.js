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
module.exports = {addRole, getAllRole}
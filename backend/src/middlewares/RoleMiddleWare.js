import Account from "../model/AccountModel.js"
import Role from "../model/RoleModel.js"

const validateAddRoleMiddleWare = async(req, res, next) => {
    const {name} = req.body
    const errors = {}
    name === "" ? errors.name = "Tên không được để trống" : null
    return Object.keys(errors).length > 0 ? res.status(200).json({errors}) : next()
}

const validateUpdateRoleMiddleWare = async(req, res, next) => {
    const {name} = req.body
    const { idRole } = req.params
    const isNameExist = await Role.findOne({ name, _id: { $ne: idRole } }); 
    const errors = {}
    name === "" ? errors.name = "Tên không được để trống"   
        : isNameExist ? errors.name = "Tên quyền đã tồn tại" : null
    return Object.keys(errors).length > 0 ? res.status(200).json({errors}) : next()
}

const deleteRoleMiddleWare = async(req, res, next) => {
    const {idRole} = req.params 
    const countAccountofRole = await Account.countDocuments({idRole})
    console.log(countAccountofRole)
    if(countAccountofRole > 0)
    {
        return res.status(200).json({
            status : 400,
            message : "Không thể xóa role khi vẫn còn tồn tại tài khoản thuộc role này"
        })
    }
    else 
    {
        next()
    }
}
export {validateAddRoleMiddleWare, validateUpdateRoleMiddleWare, deleteRoleMiddleWare}
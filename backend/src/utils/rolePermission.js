import RoleDetail from '../model/RoleDetail.js'
const getRolePermissions = async(idRole) => {
    try 
    {
        const permissions = await RoleDetail.find({idRole})
        return permissions.reduce((acc, item) => {
            acc[item.action] = item.allow
            return acc
        }, {})
    }
    catch(error)
    {
        console.log(`Fail when get permissions of role : ${error}`)
    }
}

export {getRolePermissions}
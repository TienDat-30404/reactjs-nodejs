// const Role = require('../model/RoleModel')
import mongoose from 'mongoose';
import Role from '../model/RoleModel.js'
import Account from '../model/AccountModel.js'
import RoleDetail from '../model/RoleDetail.js';
export default class RoleController {

    static async addRole(req, res, next) {
        try {
            const { name } = req.body;

            const role = new Role({ name });
            await role.save();
            res.status(201).json({
                role,
                status: 201,
                message: 'Crete role successfully'
            });
        } catch (error) {
            return res.status(500).json({
                message: `Fail when create role : ${error}`
            })
        }
    }

    static async getAllRole(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
            const startPage = (page - 1) * limit
            const objectFilter = { deletedAt: null }
            if (req.query.idRole) {
                if (mongoose.Types.ObjectId.isValid(req.query.idRole)) {
                    objectFilter._id = req.query.idRole
                }
                else {
                    return res.status(200).json({
                        status: 200,
                        page: '',
                        limit: '',
                        totalPage: 1,
                        totalRole: 0,
                        roles: []
                    })
                }
            }
            if (req.query.name) {
                objectFilter.name = { $regex: req.query.name, $options: 'i' }
            }

            const [roles, totalRole] = await Promise.all([
                Role.find(objectFilter)
                    .skip(startPage)
                    .limit(limit)
                ,
                Role.countDocuments(objectFilter)
            ])
            const totalPage = Math.ceil(totalRole / limit)

            return res.status(200).json({
                status: 200,
                page,
                totalPage,
                totalRole,
                roles,
                limit
            })
        }
        catch (error) {
            next(error)
        }
    }

    static async updateRole(req, res, next) {
        try {

            const { idRole } = req.params
            const { name, permissions } = req.body
            const role = await Role.findByIdAndUpdate({ _id: idRole },
                { name },
                { new: true }
            )
            if(Array.isArray(permissions) && permissions?.length > 0)
            {
                permissions?.map((async(permission) => {
                    await RoleDetail.findByIdAndUpdate(permission?._id,
                        {allow : permission?.allow}
                    )
                }))
            }
            return res.status(200).json({
                role,
                status: 200
            })
        }
        catch (err) {
            return res.status(500).json({
                message: `Fail when update role : ${err}`
            })
        }
    }

    static async deleteRole(req, res, next) {
        try {
            const { idRole } = req.params
            const response = await Role.updateOne({ _id: idRole }, {
                deletedAt: new Date()
            })
            if (response.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    message: 'Delete role successfully'
                })
            }
        }
        catch(err)
        {
            return res.status(500).json({
                message : `Fail when delete role : ${err}`
            })
        }
    }

    static async getListPermissionsOfRole(req, res, next) {
        try 
        {
            const {idRole} = req.params
            const permissions = await RoleDetail.find({idRole}, 'action allow')
            return res.status(200).json({
                status : 200,
                message : 'List permission role',
                permissions
            })
        }
        catch(err)
        {
            return res.status(500).json({
                message : `Fail when get list permissions`
            })
        }
    }

    static async getDetailRole(req, res, next) {
        try 
        {
            const {idRole} = req.params
            const role = await Role.findOne({_id : idRole})
            return res.status(200).json({
                message : 'Detail Role',
                status : 200,
                role
            })
        }
        catch(err)
        {
            return res.status(500).json({
                message : `Fail when get detail role : ${err}`
            })
        }
    }


}

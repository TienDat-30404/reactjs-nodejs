import mongoose from "mongoose";
import Role from "./RoleModel.js";
const Schema = mongoose.Schema
const RoleDetailSchema = new Schema(
    {
        idRole: { type: Schema.Types.ObjectId, ref: 'Role' },
        action: { type: String },
        allow: { type: Boolean },
        deletedAt: { type: Date, default: null }
    },
    {
        timestamps: true
    }
)
const RoleDetail = mongoose.model('RoleDetail', RoleDetailSchema)


const createDefaultRoleDetail = async () => {
    try {
        const roleDetailCount = await RoleDetail.countDocuments()

        const roles = await Role.find({name : {$in : ["Admin", "Customer", "Staff", "Manager"]}})
        const roleMap = roles.reduce((item, role) => {
            item[role.name] = role._id
            return item
        }, {})
        
        const adminRoleId = roleMap['Admin']
        
        const customerRoleId = roleMap['Customer']
        const staffRoleId = roleMap['Staff']
        const managerRoleId = roleMap['Manager']

        const roleDetails = [
            // admin
            {idRole : adminRoleId, action : 'overview_statistic', allow : true},
            {idRole : adminRoleId, action : 'user_add', allow : true},
            {idRole : adminRoleId, action : 'user_edit', allow : true},
            {idRole : adminRoleId, action : 'user_search', allow : true},
            {idRole : adminRoleId, action : 'user_delete', allow : true},
            {idRole : adminRoleId, action : 'user_changePassword', allow : true},
            {idRole : adminRoleId, action : 'product_add', allow : true},
            {idRole : adminRoleId, action : 'product_edit', allow : true},
            {idRole : adminRoleId, action : 'product_delete', allow : true},
            {idRole : adminRoleId, action : 'product_search', allow : true},
            {idRole : adminRoleId, action : 'attribute_add', allow : true},
            {idRole : adminRoleId, action : 'attribute_edit', allow : true},
            {idRole : adminRoleId, action : 'attribute_delete', allow : true},
            {idRole : adminRoleId, action : 'attribute_search', allow : true},
            {idRole : adminRoleId, action : 'category_add', allow : true},
            {idRole : adminRoleId, action : 'category_edit', allow : true},
            {idRole : adminRoleId, action : 'category_delete', allow : true},
            {idRole : adminRoleId, action : 'category_search', allow : true},
            {idRole : adminRoleId, action : 'order_confirm', allow : true},
            {idRole : adminRoleId, action : 'order_search', allow : true},
            {idRole : adminRoleId, action : 'supplier_add', allow : true},
            {idRole : adminRoleId, action : 'supplier_edit', allow : true},
            {idRole : adminRoleId, action : 'supplier_delete', allow : true},
            {idRole : adminRoleId, action : 'supplier_search', allow : true},
            {idRole : adminRoleId, action : 'receipt_add', allow : true},
            {idRole : adminRoleId, action : 'receipt_edit', allow : true},
            {idRole : adminRoleId, action : 'receipt_delete', allow : true},
            {idRole : adminRoleId, action : 'receipt_search', allow : true},
            {idRole : adminRoleId, action : 'discount_add', allow : true},
            {idRole : adminRoleId, action : 'discount_edit', allow : true},
            {idRole : adminRoleId, action : 'discount_delete', allow : true},
            {idRole : adminRoleId, action : 'discount_search', allow : true},
            {idRole : adminRoleId, action : 'voucher_add', allow : true},
            {idRole : adminRoleId, action : 'voucher_edit', allow : true},
            {idRole : adminRoleId, action : 'voucher_delete', allow : true},
            {idRole : adminRoleId, action : 'voucher_search', allow : true},
            {idRole : adminRoleId, action : 'notification_add', allow : true},
            {idRole : adminRoleId, action : 'notification_edit', allow : true},
            {idRole : adminRoleId, action : 'notification_delete', allow : true},
            {idRole : adminRoleId, action : 'notification_search', allow : true},
            {idRole : adminRoleId, action : 'review_search', allow : true},
            {idRole : adminRoleId, action : 'review_reply', allow : true},
            {idRole : adminRoleId, action : 'review_delete', allow : true},
            {idRole : adminRoleId, action : 'role_add', allow : true},
            {idRole : adminRoleId, action : 'role_edit', allow : true},
            {idRole : adminRoleId, action : 'role_delete', allow : true},
            {idRole : adminRoleId, action : 'role_search', allow : true},

            // staff 
            {idRole : staffRoleId, action : 'overview_statistic', allow : false},
            {idRole : staffRoleId, action : 'user_add', allow : false},
            {idRole : staffRoleId, action : 'user_edit', allow : false},
            {idRole : staffRoleId, action : 'user_search', allow : false},
            {idRole : staffRoleId, action : 'user_delete', allow : false},
            {idRole : staffRoleId, action : 'user_changePassword', allow : false},
            {idRole : staffRoleId, action : 'product_add', allow : false},
            {idRole : staffRoleId, action : 'product_edit', allow : false},
            {idRole : staffRoleId, action : 'product_delete', allow : false},
            {idRole : staffRoleId, action : 'product_search', allow : true},
            {idRole : staffRoleId, action : 'attribute_add', allow : false},
            {idRole : staffRoleId, action : 'attribute_edit', allow : false},
            {idRole : staffRoleId, action : 'attribute_delete', allow : false},
            {idRole : staffRoleId, action : 'attribute_search', allow : false},
            {idRole : staffRoleId, action : 'category_add', allow : false},
            {idRole : staffRoleId, action : 'category_edit', allow : false},
            {idRole : staffRoleId, action : 'category_delete', allow : false},
            {idRole : staffRoleId, action : 'category_search', allow : false},
            {idRole : staffRoleId, action : 'order_confirm', allow : true},
            {idRole : staffRoleId, action : 'order_search', allow : true},
            {idRole : staffRoleId, action : 'supplier_add', allow : false},
            {idRole : staffRoleId, action : 'supplier_edit', allow : false},
            {idRole : staffRoleId, action : 'supplier_delete', allow : false},
            {idRole : staffRoleId, action : 'supplier_search', allow : false},
            {idRole : staffRoleId, action : 'receipt_add', allow : false},
            {idRole : staffRoleId, action : 'receipt_edit', allow : false},
            {idRole : staffRoleId, action : 'receipt_delete', allow : false},
            {idRole : staffRoleId, action : 'receipt_search', allow : false},
            {idRole : staffRoleId, action : 'discount_add', allow : false},
            {idRole : staffRoleId, action : 'discount_edit', allow : false},
            {idRole : staffRoleId, action : 'discount_delete', allow : false},
            {idRole : staffRoleId, action : 'discount_search', allow : false},
            {idRole : staffRoleId, action : 'voucher_add', allow : false},
            {idRole : staffRoleId, action : 'voucher_edit', allow : false},
            {idRole : staffRoleId, action : 'voucher_delete', allow : false},
            {idRole : staffRoleId, action : 'voucher_search', allow : false},
            {idRole : staffRoleId, action : 'notification_add', allow : false},
            {idRole : staffRoleId, action : 'notification_edit', allow : false},
            {idRole : staffRoleId, action : 'notification_delete', allow : false},
            {idRole : staffRoleId, action : 'notification_search', allow : false},
            {idRole : staffRoleId, action : 'review_search', allow : true},
            {idRole : staffRoleId, action : 'review_reply', allow : true},
            {idRole : staffRoleId, action : 'review_delete', allow : false},
            {idRole : staffRoleId, action : 'role_add', allow : false},
            {idRole : staffRoleId, action : 'role_edit', allow : false},
            {idRole : staffRoleId, action : 'role_delete', allow : false},
            {idRole : staffRoleId, action : 'role_search', allow : false},

            // customer 
            {idRole : customerRoleId, action : 'overview_statistic', allow : false},
            {idRole : customerRoleId, action : 'user_add', allow : false},
            {idRole : customerRoleId, action : 'user_edit', allow : false},
            {idRole : customerRoleId, action : 'user_search', allow : false},
            {idRole : customerRoleId, action : 'user_delete', allow : false},
            {idRole : customerRoleId, action : 'user_changePassword', allow : false},
            {idRole : customerRoleId, action : 'product_add', allow : false},
            {idRole : customerRoleId, action : 'product_edit', allow : false},
            {idRole : customerRoleId, action : 'product_delete', allow : false},
            {idRole : customerRoleId, action : 'product_search', allow : true},
            {idRole : customerRoleId, action : 'attribute_add', allow : false},
            {idRole : customerRoleId, action : 'attribute_edit', allow : false},
            {idRole : customerRoleId, action : 'attribute_delete', allow : false},
            {idRole : customerRoleId, action : 'attribute_search', allow : false},
            {idRole : customerRoleId, action : 'category_add', allow : false},
            {idRole : customerRoleId, action : 'category_edit', allow : false},
            {idRole : customerRoleId, action : 'category_delete', allow : false},
            {idRole : customerRoleId, action : 'category_search', allow : false},
            {idRole : customerRoleId, action : 'order_confirm', allow : false},
            {idRole : customerRoleId, action : 'order_search', allow : false},
            {idRole : customerRoleId, action : 'supplier_add', allow : false},
            {idRole : customerRoleId, action : 'supplier_edit', allow : false},
            {idRole : customerRoleId, action : 'supplier_delete', allow : false},
            {idRole : customerRoleId, action : 'supplier_search', allow : false},
            {idRole : customerRoleId, action : 'receipt_add', allow : false},
            {idRole : customerRoleId, action : 'receipt_edit', allow : false},
            {idRole : customerRoleId, action : 'receipt_delete', allow : false},
            {idRole : customerRoleId, action : 'receipt_search', allow : false},
            {idRole : customerRoleId, action : 'discount_add', allow : false},
            {idRole : customerRoleId, action : 'discount_edit', allow : false},
            {idRole : customerRoleId, action : 'discount_delete', allow : false},
            {idRole : customerRoleId, action : 'discount_search', allow : false},
            {idRole : customerRoleId, action : 'voucher_add', allow : false},
            {idRole : customerRoleId, action : 'voucher_edit', allow : false},
            {idRole : customerRoleId, action : 'voucher_delete', allow : false},
            {idRole : customerRoleId, action : 'voucher_search', allow : false},
            {idRole : customerRoleId, action : 'notification_add', allow : false},
            {idRole : customerRoleId, action : 'notification_edit', allow : false},
            {idRole : customerRoleId, action : 'notification_delete', allow : false},
            {idRole : customerRoleId, action : 'notification_search', allow : false},
            {idRole : customerRoleId, action : 'review_search', allow : false},
            {idRole : customerRoleId, action : 'review_reply', allow : false},
            {idRole : customerRoleId, action : 'review_delete', allow : false},
            {idRole : customerRoleId, action : 'role_add', allow : false},
            {idRole : customerRoleId, action : 'role_edit', allow : false},
            {idRole : customerRoleId, action : 'role_delete', allow : false},
            {idRole : customerRoleId, action : 'role_search', allow : false},
            

            // manager 
            {idRole : managerRoleId, action : 'overview_statistic', allow : true},
            {idRole : managerRoleId, action : 'user_add', allow : true},
            {idRole : managerRoleId, action : 'user_edit', allow : true},
            {idRole : managerRoleId, action : 'user_search', allow : true},
            {idRole : managerRoleId, action : 'user_delete', allow : false},
            {idRole : managerRoleId, action : 'user_changePassword', allow : false},
            {idRole : managerRoleId, action : 'product_add', allow : true},
            {idRole : managerRoleId, action : 'product_edit', allow : true},
            {idRole : managerRoleId, action : 'product_delete', allow : true},
            {idRole : managerRoleId, action : 'product_search', allow : true},
            {idRole : managerRoleId, action : 'attribute_add', allow : true},
            {idRole : managerRoleId, action : 'attribute_edit', allow : true},
            {idRole : managerRoleId, action : 'attribute_delete', allow : true},
            {idRole : managerRoleId, action : 'attribute_search', allow : true},
            {idRole : managerRoleId, action : 'category_add', allow : true},
            {idRole : managerRoleId, action : 'category_edit', allow : true},
            {idRole : managerRoleId, action : 'category_delete', allow : true},
            {idRole : managerRoleId, action : 'category_search', allow : true},
            {idRole : managerRoleId, action : 'order_confirm', allow : true},
            {idRole : managerRoleId, action : 'order_search', allow : true},
            {idRole : managerRoleId, action : 'supplier_add', allow : true},
            {idRole : managerRoleId, action : 'supplier_edit', allow : true},
            {idRole : managerRoleId, action : 'supplier_delete', allow : true},
            {idRole : managerRoleId, action : 'supplier_search', allow : true},
            {idRole : managerRoleId, action : 'receipt_add', allow : true},
            {idRole : managerRoleId, action : 'receipt_edit', allow : true},
            {idRole : managerRoleId, action : 'receipt_delete', allow : true},
            {idRole : managerRoleId, action : 'receipt_search', allow : true},
            {idRole : managerRoleId, action : 'discount_add', allow : true},
            {idRole : managerRoleId, action : 'discount_edit', allow : true},
            {idRole : managerRoleId, action : 'discount_delete', allow : true},
            {idRole : managerRoleId, action : 'discount_search', allow : true},
            {idRole : managerRoleId, action : 'voucher_add', allow : true},
            {idRole : managerRoleId, action : 'voucher_edit', allow : true},
            {idRole : managerRoleId, action : 'voucher_delete', allow : true},
            {idRole : managerRoleId, action : 'voucher_search', allow : true},
            {idRole : managerRoleId, action : 'notification_add', allow : true},
            {idRole : managerRoleId, action : 'notification_edit', allow : true},
            {idRole : managerRoleId, action : 'notification_delete', allow : true},
            {idRole : managerRoleId, action : 'notification_search', allow : true},
            {idRole : managerRoleId, action : 'review_search', allow : true},
            {idRole : managerRoleId, action : 'review_reply', allow : true},
            {idRole : managerRoleId, action : 'review_delete', allow : true},
            {idRole : managerRoleId, action : 'role_add', allow : false},
            {idRole : managerRoleId, action : 'role_edit', allow : false},
            {idRole : managerRoleId, action : 'role_delete', allow : false},
            {idRole : managerRoleId, action : 'role_search', allow : false},


        ]
        if (roleDetailCount === 0) {
            await RoleDetail.insertMany(roleDetails)
        }

    } catch (error) {
        console.error('Error creating default detailRole:', error);
    }
};

createDefaultRoleDetail();
export default RoleDetail
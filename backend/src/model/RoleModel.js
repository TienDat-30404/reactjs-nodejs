const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const RoleSchema = new Schema(
    {
        name : {type : String, required : true},
    },
    { timestamps: true });


// Thêm plugin AutoIncrement để tự động tăng giá trị của 'id'
RoleSchema.plugin(AutoIncrement, { inc_field: 'idRole' });

const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;

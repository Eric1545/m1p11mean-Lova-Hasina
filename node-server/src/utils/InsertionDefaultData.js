const RoleModel = require("../models/RoleModel")

async function insertDefaultRole(){
    let cout = await RoleModel.estimatedDocumentCount()
    if(cout === 0){
        let role = new RoleModel({role: "client"})
        await role.save()
        role = new RoleModel({role: "employe"})
        await role.save()
        role = new RoleModel({role: "manager"})
        await role.save()
    }
}
module.exports = {
    insertDefaultRole
}
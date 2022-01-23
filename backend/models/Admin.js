const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    eMail: {
        type: String,
        required: true,
    },
})

const Admin = mongoose.model("admin",AdminSchema)
module.exports = Admin
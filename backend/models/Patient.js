const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
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
    age: {
        type: Number,
        required: true,
    },
})

const Patient = mongoose.model("patient",PatientSchema)
module.exports = Patient
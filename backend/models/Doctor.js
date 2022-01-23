const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
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
    room: {
        type: Number,
        required: true,
    },
    times: {
        type: [],
    },
})

const Doctor = mongoose.model("doctor",DoctorSchema)
module.exports = Doctor
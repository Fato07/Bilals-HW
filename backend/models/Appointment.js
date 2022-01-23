const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
    PatientName: {
        type: String,
    },
    DoctorName: {
        type: String,
    },
    RoomNumber: {
        type: Number,
    }
})

const Appointment = mongoose.model("appointment",AppointmentSchema)
module.exports = Appointment
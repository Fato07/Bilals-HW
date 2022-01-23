const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 3500
app.use(express.json())
app.use(cors())

// importing models.
const PatientModel = require('./models/Patient')
const AdminModel = require('./models/Admin')
const DoctorModel = require('./models/Doctor')
const AppointmentModel = require('./models/Appointment')

// making sure server is up.
app.get('/', (req, res) => {
    res.send('server is up!')
  })
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

// database connection.
mongoose.connect(
    'mongodb+srv://HOMER:2021HOMAS@homas-cluster.cwqgt.mongodb.net/Homas?retryWrites=true&w=majority'
    ).then(() => {
        console.log("database connected");
    }).catch(err => {
        console.log("database not connected: " + err);
    });

//admin-routes.
app.post('/addAdmin', async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.eMail

    const Admin = new AdminModel({
        firstName : firstName,
        lastName : lastName,
        eMail : email,
    })

    try {
        await Admin.save()
    } catch (error) {
        console.log("oops! - " + error);
    }

});
app.get('/readAdmins', async (req, res) => {
    AdminModel.find({}, (err,result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
})
app.delete('/deleteAdmin/:id', async (req, res) => {
    const id = req.params.id;
    await AdminModel.findByIdAndRemove(id).exec()
    res.send('deleted')
})

//patient-routes.
app.post('/addPatient', async (req, res) => {
    
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.eMail
    const age = req.body.age

    const Patient = new PatientModel({
        firstName : firstName,
        lastName : lastName,
        eMail : email,
        age : age,
    })
    try {
        await Patient.save()
        
    } catch (error) {
        console.log("oops! - " + error);
    }
});
app.get('/readPatients', async (req, res) => {
    PatientModel.find({}, (err,result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
})
app.delete('/deletePatient/:id', async (req, res) => {
    const id = req.params.id;
    await PatientModel.findByIdAndRemove(id).exec()
    res.send('deleted')
})

//doctor-routes.
app.post('/addDoctor', async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.eMail
    const room = req.body.room

    const Doctor = new DoctorModel({
        firstName : firstName,
        lastName : lastName,
        eMail : email,
        room : room,
    })
    try {
        await Doctor.save()
    } catch (error) {
        console.log("oops! - " + error);
    }
});
app.get('/readDoctors', async (req, res) => {
    DoctorModel.find({}, (err,result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
})
app.get('/read1Doc/:id', async (req, res) => {
    const id = req.params.id;
    DoctorModel.findById(id, (err,result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
})
app.delete('/deleteDoctor/:id', async (req, res) => {
    const id = req.params.id;
    await DoctorModel.findByIdAndRemove(id).exec()
    res.send('deleted')
})

//appointment-routes-
app.post('/addAppointment', async (req, res) => {
    
    const PatientName = req.body.PatientName
    const DoctorName = req.body.DoctorName
    const RoomNumber = req.body.RoomNumber

    const Appointment = new AppointmentModel({
        PatientName: PatientName,
        DoctorName: DoctorName,
        RoomNumber: RoomNumber,
    })

    try {
        await Appointment.save()
    } catch (error) {
        console.log("oops! - " + error);
    }
});
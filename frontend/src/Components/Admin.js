import React from 'react'
import { Tab, Tabs } from "react-bootstrap"
import { useEffect, useState } from 'react';
import Axios from 'axios';

const Admin = () => {

    // for admin.
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [eMail, setEmail] = useState("")
    const addAdmin = () => {
        Axios.post("http://localhost:3500/addAdmin", {
            firstName: firstName,
            lastName: lastName,
            eMail: eMail,
        })
        console.log(firstName + " " + lastName + " added.");
        window.location.reload(true);
    };

    const [AdminList, setAdminList] = useState([])
    useEffect(() => {
        Axios.get('http://localhost:3500/readAdmins').then((response) => {
            setAdminList(response.data)
        })
    }, []
    );
    const deleteAdmin = (id) => {
        Axios.delete(`http://localhost:3500/deleteAdmin/${id}`)
        window.location.reload(true);
    };

    // for doctor.
    const [DoctorList, setDoctorList] = useState([])
    useEffect(() => {
        Axios.get('http://localhost:3500/readDoctors').then((response) => {
            setDoctorList(response.data)
        })
    }, []
    );
    const deleteDoctor = (id) => {
        Axios.delete(`http://localhost:3500/deleteDoctor/${id}`)
        window.location.reload(true);
    };

    // for patient.
    const [patientList, setPatientList] = useState([])
    useEffect(() => {
        Axios.get('http://localhost:3500/readPatients').then((response) => {
            setPatientList(response.data)
        })
    }, []
    );
    const deletePatient = (id) => {
        Axios.delete(`http://localhost:3500/deletePatient/${id}`)
        window.location.reload(true);
    };

    return (
        <div>
            <Tabs defaultActiveKey="add-admin" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="add-admin" title="Add Admin">
                    <label>First Name</label>
                    <input type="text" onChange={(event) => { setFirstName(event.target.value) }} />
                    <label>Last Name</label>
                    <input type="text" onChange={(event) => { setLastName(event.target.value) }} />
                    <label>Email</label>
                    <input type="text" onChange={(event) => { setEmail(event.target.value) }} />
                    <button onClick={addAdmin}>Submit.</button>
                </Tab>
                <Tab eventKey="veiw-admins" title="Veiw admins">
                    {AdminList.map((val, key) => {
                        return <div key={key}>
                            <h6> {val.firstName} {val.lastName} <button onClick={() => deleteAdmin(val._id)}>delete</button></h6>
                        </div>
                    })}
                </Tab>
                <Tab eventKey="veiw-doctors" title="Veiw Doctors">
                    {DoctorList.map((val, key) => {
                        return <div key={key}>
                            <h6> {val.firstName} {val.lastName} <button onClick={() => deleteDoctor(val._id)}>delete</button></h6>
                        </div>
                    })}
                </Tab>
                <Tab eventKey="view-patients" title="Veiw Patients">
                    <div>
                        {patientList.map((val, key) => {
                            return <div key={key}>
                                <h6> {val.firstName} {val.lastName} <button onClick={() => deletePatient(val._id)}>delete</button></h6>
                            </div>
                        })}
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Admin

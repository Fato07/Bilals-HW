import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from "react-bootstrap"
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Patient = () => {

    // adding patient.
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [eMail, setEmail] = useState("")
    const [age, setAge] = useState(0)

    //React Router hook to navigate to a different page
    const navigate = useNavigate()

    const addPatient = () => {
        Axios.post("http://localhost:3500/addPatient", {
            firstName: firstName,
            lastName: lastName,
            eMail: eMail,
            age: age
        })
        console.log(firstName + " " + lastName + " added.");
        window.location.reload(true);
    };

    // appointment
    // patients.
    const [patientList, setPatientList] = useState([])
    const [patientid, setPatientid] = useState(1)

    useEffect(() => {
        //good practice is to define your functionalities in the useEffect hook with a method
        //definition of the fucntion
        const fetchPatients = () => {
            Axios.get('http://localhost:3500/readPatients')
            .then((res) => {
                //if the server responds with 200, then set the patientList (this is a safer approach and more secure)
                //Try to implement the code block for all your other methods (readDoctors, addAppointment etc) 
                if (res.status === 200 && res.statusText === "OK") {
                    setPatientList(res.data)
                }
            }).catch(res => console.log(res))
        }
        
        //calling of the function
        fetchPatients()
    }, []);

    // doctors.
    const [doctorList, setDoctorList] = useState([])
    const [doctorid, setDoctorid] = useState('')
    //const [doctorName, setDoctorName] = useState('')
    useEffect(() => {
        Axios.get('http://localhost:3500/readDoctors')
            .then(res => setDoctorList(res.data))
            .catch(res => console.log(res))
    }, []
    );

    const handlePatientSelect = (e) => {
        setPatientid(e.target.value)
    }
    const handleDoctorSelect = (e) => {
        setDoctorid(e.target.value)
    }

    const addAppointment = () => {
        console.log(onedoctor);
        Axios.post("http://localhost:3500/addAppointment", {
            PatientName: patientid,
            DoctorName: doctorid,
            RoomNumber: onedoctor.room
        })
        console.log(patientid + " " + doctorid + " ");
    };

    // get one doctor
    const [onedoctor, setOneDoctor] = useState({})

    useEffect(() => {
        Axios.get(`http://localhost:3500/read1Doc/${doctorid}`)
            .then(res => setOneDoctor(res.data))
            .catch(res => console.log(res))
    }, [doctorid]
    );

    const goToPatientDetails = (id) => {
        console.log("current patient Id", id)
        navigate(`${id}`)
    }

    return (
        <div>
            <div>
                <Tabs defaultActiveKey="new" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="new" title="Add Patient">
                        <div>
                            <label>First Name</label>
                            <input type="text" onChange={(event) => { setFirstName(event.target.value) }} />
                            <label>Last Name</label>
                            <input type="text" onChange={(event) => { setLastName(event.target.value) }} />
                            <label>Email</label>
                            <input type="text" onChange={(event) => { setEmail(event.target.value) }} />
                            <label>Age</label>
                            <input type="number" onChange={(event) => { setAge(event.target.value) }} />
                            <button onClick={addPatient}>Submit.</button>
                        </div>
                    </Tab>
                    <Tab eventKey="new-appointment" title="Create Appointment">
                        {/* 
                            If you want to render your patients as a list
                            Then i suggest you do not use the <select></select> and <option></option> elements.
                            You can create a List instead e.g: https://www.robinwieruch.de/react-list-component/ 
                            make sure you imoplement the same for doctors
                        */}
                        <select onChange={handlePatientSelect}>
                            <option value=""> patient </option>
                            {patientList.map((patient, key) => {
                                return (<option key={key} value={patient._id}>{patient.firstName}</option>)
                            })}
                        </select>
                        <span onClick={() => goToPatientDetails(patientid)}>
                            {patientid}
                        </span>
                        <br />
                        <select onChange={handleDoctorSelect}>
                            <option value=""> doctor </option>
                            {doctorList.map((doctor, key) => {
                                return <option key={key} value={doctor._id}>{doctor.firstName}</option>
                            })}
                        </select>
                        <span>
                            {doctorid}
                        </span>
                        <br />
                        <button onClick={addAppointment}>Submit.</button>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default Patient
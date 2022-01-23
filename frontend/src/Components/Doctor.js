import React from 'react'
import { Tab, Tabs } from "react-bootstrap"
import { useState } from 'react';
import Axios from 'axios';

const Doctor = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [eMail, setEmail] = useState("")
    const [room, setRoom] = useState(0)

    const addDoctor = () => {
        Axios.post("http://localhost:3500/addDoctor", {
            firstName: firstName,
            lastName: lastName,
            eMail: eMail,
            room: room
        })
        console.log(firstName + " " + lastName + " added.");
        window.location.reload(true);
    };

    return (
        <div>
            <Tabs defaultActiveKey="add-doc" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="add-doc" title="Add Doctor">
                    <label>First Name</label>
                    <input type="text" onChange={(event) => { setFirstName(event.target.value) }} />
                    <label>Last Name</label>
                    <input type="text" onChange={(event) => { setLastName(event.target.value) }} />
                    <label>Email</label>
                    <input type="text" onChange={(event) => { setEmail(event.target.value) }} />
                    <label>Room</label>
                    <input type="text" onChange={(event) => { setRoom(event.target.value) }} />
                    <button onClick={addDoctor}>Submit.</button>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Doctor
import React, { Component } from "react";
import {Navbar, Nav, Container} from "react-bootstrap"
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Admin from './Admin'
import Doctor from './Doctor'
import Patient from './Patient'
import Welcome from './Welcome'
import PatientDetails from './PatientDetails';

export default class NavBarComp extends Component {
    render() {
        return (
            <Router>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Nav className="me-auto">
                            <Navbar.Brand as = {Link} to={"/"}> <h3>HOMAS</h3> </Navbar.Brand>
                            <Nav.Link as = {Link} to={"/Admin"}> Admin </Nav.Link>
                            <Nav.Link as = {Link} to={"/Patient"}>Patient</Nav.Link>
                            <Nav.Link as = {Link} to={"/Doctor"}>Doctor</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <Routes>
                <Route path='/' element={<Welcome/>} /> 
                <Route path='/Admin' element={<Admin/>} />
                <Route path='/Patient' element={<Patient/>} />
                 {/* See documentation for more info on route params 
                https://reactrouterdotcom.fly.dev/docs/en/v6/getting-started/overview#reading-url-parameters */}
                <Route path='/Patient/:id' element={<PatientDetails/>} /> 
                <Route path='/Doctor' element={<Doctor/>} />     
            </Routes>
            </Router>
        )
    }
}